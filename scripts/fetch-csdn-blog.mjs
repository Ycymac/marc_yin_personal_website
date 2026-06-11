// Build-time CSDN blog fetcher.
//
// Runs server-side (locally or in GitHub Actions), where there is no CORS
// restriction and a Referer header gets us past CSDN's WAF — neither is
// possible from the static site at runtime. It pulls the article list +
// account stats and bakes them into src/data/blog.json, which the committed
// fallback and BlogPreview.vue both read.
//
// On any failure it leaves the existing blog.json untouched and exits 0, so a
// flaky CSDN response can never break the build.
//
// Run: node scripts/fetch-csdn-blog.mjs
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import { writeFileSync, existsSync } from "node:fs"

const USERNAME = "Ycy06721"
const PROFILE_URL = `https://blog.csdn.net/${USERNAME}`
const PAGE_SIZE = 20

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const outFile = join(root, "src", "data", "blog.json")

const HEADERS = {
  Referer: PROFILE_URL,
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
}

// ---- article list (paginated) ----------------------------------------------
async function fetchArticles() {
  const all = []
  let total = Infinity
  for (let page = 1; all.length < total; page += 1) {
    const url =
      `https://blog.csdn.net/community/home-api/v1/get-business-list` +
      `?page=${page}&size=${PAGE_SIZE}&businessType=blog&username=${USERNAME}`
    const res = await fetch(url, { headers: HEADERS })
    if (!res.ok) throw new Error(`list page ${page} → HTTP ${res.status}`)
    const json = await res.json()
    if (json.code !== 200) throw new Error(`list page ${page} → code ${json.code}`)
    const list = json.data?.list ?? []
    total = json.data?.total ?? all.length + list.length
    all.push(...list)
    if (list.length === 0) break
    if (page > 20) break // hard stop, never loop forever
  }

  return all.map((a) => ({
    id: a.articleId,
    title: a.title,
    description: a.description,
    url: a.url,
    viewCount: a.viewCount ?? 0,
    diggCount: a.diggCount ?? 0,
    collectCount: a.collectCount ?? 0,
    commentCount: a.commentCount ?? 0,
    postTime: a.postTime,
    formatTime: a.formatTime,
    top: Boolean(a.top),
    tags: Array.isArray(a.tags) ? a.tags : [],
    cover: Array.isArray(a.picList) && a.picList.length ? a.picList[0] : null,
  }))
}

// ---- account stats (scraped from profile HTML) ------------------------------
// CSDN's stats JSON endpoints 404; the real numbers live in the profile page as
// paired `user-profile-statistics-num` / `-name` divs. Map the Chinese labels
// onto stable keys so the component can localize them.
const STAT_LABELS = {
  总访问量: "totalViews",
  原创: "originalCount",
  粉丝: "followers",
  关注: "following",
}

async function fetchStats() {
  const res = await fetch(PROFILE_URL, { headers: HEADERS })
  if (!res.ok) throw new Error(`profile → HTTP ${res.status}`)
  const html = await res.text()

  const stats = {}
  const re =
    /user-profile-statistics-num[^>]*>([\d,]+)<\/div>\s*<div class="user-profile-statistics-name[^>]*>([^<]+)/g
  let m
  while ((m = re.exec(html)) !== null) {
    const value = Number(m[1].replace(/,/g, ""))
    const key = STAT_LABELS[m[2].trim()]
    if (key) stats[key] = value
  }
  return stats
}

async function main() {
  try {
    const [articles, stats] = await Promise.all([fetchArticles(), fetchStats()])

    // Pinned posts first, then newest by post time.
    articles.sort((a, b) => {
      if (a.top !== b.top) return a.top ? -1 : 1
      return (b.postTime || "").localeCompare(a.postTime || "")
    })

    const totalDigg = articles.reduce((sum, a) => sum + a.diggCount, 0)

    const payload = {
      profileUrl: PROFILE_URL,
      username: USERNAME,
      fetchedAt: new Date().toISOString(),
      stats: {
        articleCount: stats.originalCount ?? articles.length,
        totalViews: stats.totalViews ?? null,
        totalDigg,
        followers: stats.followers ?? null,
      },
      articles,
    }

    writeFileSync(outFile, JSON.stringify(payload, null, 2) + "\n", "utf8")
    console.log(
      `✓ blog.json updated: ${articles.length} articles, ` +
        `${payload.stats.totalViews ?? "?"} views, ${totalDigg} likes`,
    )
  } catch (err) {
    console.warn(`! CSDN fetch failed (${err.message}).`)
    if (existsSync(outFile)) {
      console.warn("  Keeping existing src/data/blog.json — build continues.")
    } else {
      console.warn("  No existing blog.json; writing empty fallback.")
      const empty = {
        profileUrl: PROFILE_URL,
        username: USERNAME,
        fetchedAt: null,
        stats: { articleCount: 0, totalViews: null, totalDigg: 0, followers: null },
        articles: [],
      }
      writeFileSync(outFile, JSON.stringify(empty, null, 2) + "\n", "utf8")
    }
  }
}

main()
