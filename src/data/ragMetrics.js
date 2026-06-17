import {
  Target,
  TrendingUp,
  Trophy,
  ListChecks,
  Crosshair,
  FileCheck2,
  Database,
} from "lucide-vue-next"

// RAG evaluation metrics for the JAVIS project card.
// Each metric: own icon + accent colour (Apple "environment" style); labels black.
export const ragMetrics = [
  { value: "100.0%", color: "#7c5cff", icon: Target, label: "Chunk Hit@5（前5命中率·分块级）", labelEn: "Chunk Hit@5 (top-5, chunk-level)" },
  { value: "96.4%", color: "#ff7a1a", icon: TrendingUp, label: "MRR@10（前10平均倒数排名）", labelEn: "MRR@10 (mean reciprocal rank)" },
  { value: "92.9%", color: "#13b6c9", icon: Trophy, label: "期望块排名第1占比", labelEn: "Expected chunk ranked #1" },
  { value: "100.0%", color: "#2bb673", icon: ListChecks, label: "期望块排名 Top5 占比", labelEn: "Expected chunk in Top 5" },
  { value: "1.0", color: "#e0457b", icon: Crosshair, label: "期望块排名中位（越接近1越好）", labelEn: "Median rank (1 is best)" },
  { value: "100.0%", color: "#3b6cff", icon: FileCheck2, label: "Doc Hit@5（前5命中率·文档级）", labelEn: "Doc Hit@5 (top-5, doc-level)" },
  { value: "14", color: "#8a6d3b", icon: Database, label: "样本数（Samples）", labelEn: "Samples" },
]
