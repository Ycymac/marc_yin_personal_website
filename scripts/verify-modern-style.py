from pathlib import Path
from playwright.sync_api import sync_playwright


OUT = Path(r"C:\Users\32539\.codex\visualizations\2026\07\11\019f5110-3d7d-79e1-a5d1-124113ae55a5")
OUT.mkdir(parents=True, exist_ok=True)


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
    errors = []
    page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)

    page.goto("http://127.0.0.1:5173", wait_until="networkidle")
    page.wait_for_timeout(1200)
    dark_hello_colors = page.locator(".hello-stage__art stop").evaluate_all(
        "nodes => [...new Set(nodes.map(node => getComputedStyle(node).stopColor))]"
    )
    page.screenshot(path=str(OUT / "hello-dark-animation.png"), full_page=False)
    vcr_loaded = page.evaluate("document.fonts.check(`16px 'VCR OSD Mono'`)")
    page.wait_for_timeout(6000)
    dark_ready = page.locator(".ambient-background__wallpaper.is-visible").count() == 1
    dark_wallpaper_filter = page.locator(".ambient-background__wallpaper").evaluate(
        "node => getComputedStyle(node).filter"
    )
    dark_accent = page.evaluate("getComputedStyle(document.documentElement).getPropertyValue('--klein').trim()")
    flowers = page.locator(".rose-decoration").count()
    page.screenshot(path=str(OUT / "modern-dark-hello.png"), full_page=False)

    page.evaluate("scrollTo(0, innerHeight)")
    page.wait_for_timeout(900)
    page.screenshot(path=str(OUT / "modern-dark-home.png"), full_page=False)
    page.locator("#projects").scroll_into_view_if_needed()
    page.wait_for_timeout(1400)
    dark_preview = {
        "background": page.locator(".site-preview").evaluate(
            "node => getComputedStyle(node).backgroundColor"
        ),
        "color": page.locator(".site-preview").evaluate(
            "node => getComputedStyle(node).color"
        ),
    }
    page.locator(".site-preview").screenshot(path=str(OUT / "modern-dark-site-preview.png"))

    page.evaluate("localStorage.setItem('theme', 'light'); scrollTo(0, 0)")
    page.reload(wait_until="networkidle")
    page.evaluate("scrollTo(0, 0)")
    page.wait_for_timeout(1200)
    light_hello_colors = page.locator(".hello-stage__art stop").evaluate_all(
        "nodes => [...new Set(nodes.map(node => getComputedStyle(node).stopColor))]"
    )
    page.screenshot(path=str(OUT / "hello-light-animation.png"), full_page=False)
    page.wait_for_timeout(6000)
    light_ready = page.locator(".ambient-background__wallpaper.is-visible").count() == 1
    light_wallpaper_filter = page.locator(".ambient-background__wallpaper").evaluate(
        "node => getComputedStyle(node).filter"
    )
    page.screenshot(path=str(OUT / "modern-light-wallpaper.png"), full_page=False)
    light_accent = page.evaluate("getComputedStyle(document.documentElement).getPropertyValue('--klein').trim()")
    page.evaluate("scrollTo(0, innerHeight)")
    page.wait_for_timeout(900)
    page.screenshot(path=str(OUT / "modern-light-home.png"), full_page=False)
    page.locator("#about").scroll_into_view_if_needed()
    page.wait_for_timeout(900)
    about_columns = page.locator("#about .bio-copy").evaluate(
        "node => getComputedStyle(node).gridTemplateColumns"
    )
    page.screenshot(path=str(OUT / "modern-light-about.png"), full_page=False)
    page.locator("#projects").scroll_into_view_if_needed()
    page.wait_for_timeout(900)
    metric_colors = page.locator(".javis-metric__value").evaluate_all(
        "nodes => [...new Set(nodes.map(node => getComputedStyle(node).color))]"
    )
    preview = page.locator(".site-preview")
    modern_preview = {
        "count": preview.count(),
        "greeting_visible": page.locator(".site-preview__greeting").is_visible(),
        "module_columns": page.locator(".site-preview__modules").evaluate(
            "node => getComputedStyle(node).gridTemplateColumns"
        ),
        "legacy_image_count": page.locator('img[src*="portfolio"]').count(),
    }
    preview.screenshot(path=str(OUT / "modern-light-site-preview.png"))
    page.screenshot(path=str(OUT / "modern-light-projects.png"), full_page=False)

    page.evaluate("localStorage.setItem('skin', 'literary')")
    page.reload(wait_until="networkidle")
    page.locator("#projects").scroll_into_view_if_needed()
    page.wait_for_timeout(900)
    literary_preview = {
        "count": page.locator(".site-preview").count(),
        "greeting_visible": page.locator(".site-preview__greeting").is_visible(),
        "routes_visible": page.locator(".site-preview__routes").is_visible(),
        "module_columns": page.locator(".site-preview__modules").evaluate(
            "node => getComputedStyle(node).gridTemplateColumns"
        ),
    }
    page.locator(".site-preview").screenshot(path=str(OUT / "literary-light-site-preview.png"))
    page.screenshot(path=str(OUT / "literary-light-projects.png"), full_page=False)

    page.evaluate("localStorage.setItem('skin', 'glass')")
    page.locator("#blog").scroll_into_view_if_needed()
    page.wait_for_timeout(900)
    page.screenshot(path=str(OUT / "modern-light-blog.png"), full_page=False)

    print({
        "dark_wallpaper_ready": dark_ready,
        "light_wallpaper_ready": light_ready,
        "dark_wallpaper_filter": dark_wallpaper_filter,
        "light_wallpaper_filter": light_wallpaper_filter,
        "dark_hello_colors": dark_hello_colors,
        "light_hello_colors": light_hello_colors,
        "vcr_loaded": vcr_loaded,
        "about_columns": about_columns,
        "metric_colors": metric_colors,
        "modern_preview": modern_preview,
        "literary_preview": literary_preview,
        "dark_accent": dark_accent,
        "dark_preview": dark_preview,
        "light_accent": light_accent,
        "flower_nodes": flowers,
        "console_errors": errors,
    })
    browser.close()
