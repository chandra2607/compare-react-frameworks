const fs = require("fs");
const path = require("path");

const BASE_DIR = path.resolve("performance-reports");
const OUTPUT_MD = path.resolve("performance-comparison.md");

const frameworks = [
  "nextjs-mobile",
  "astro-mobile",
  "remix-mobile",
];

// Metric configuration
const METRICS = {
  performanceScore: { label: "Performance Score", better: "higher", unit: "" },
  firstContentfulPaint: { label: "FCP (ms)", better: "lower", unit: "ms" },
  largestContentfulPaint: { label: "LCP (ms)", better: "lower", unit: "ms" },
  speedIndex: { label: "Speed Index", better: "lower", unit: "" },
  totalBlockingTime: { label: "TBT (ms)", better: "lower", unit: "ms" },
  cumulativeLayoutShift: { label: "CLS", better: "lower", unit: "" },
};

function readJSON(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function extractMetrics(report) {
  const audits = report.audits;

  return {
    performanceScore: report.categories.performance.score * 100,
    firstContentfulPaint: audits["first-contentful-paint"].numericValue,
    largestContentfulPaint: audits["largest-contentful-paint"].numericValue,
    speedIndex: audits["speed-index"].numericValue,
    totalBlockingTime: audits["total-blocking-time"].numericValue,
    cumulativeLayoutShift: audits["cumulative-layout-shift"].numericValue,
  };
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

const round = v => Number(v.toFixed(2));

/* -------------------------------------------------- */

let markdown = `# 📊 Lighthouse Mobile Performance Comparison

**Runs per framework:** 5  
**Aggregation:** Median (Lighthouse best practice)  
**Throttling:** Simulated Mobile CPU (4× slowdown)

Legend:  
🟢 **Best**  🔴 *Worst*

---

`;

const mediansByFramework = {};
const rawByFramework = {};

/* ---------- Per-framework tables ---------- */

for (const framework of frameworks) {
  const dir = path.join(BASE_DIR, framework);
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".json"));

  const runs = files.map(file =>
    extractMetrics(readJSON(path.join(dir, file)))
  );

  rawByFramework[framework] = runs;

  markdown += `## ${framework}\n\n`;
  markdown += `| Run | ${Object.values(METRICS).map(m => m.label).join(" | ")} |\n`;
  markdown += `|-----|${Object.values(METRICS).map(() => "------").join("|")}|\n`;

  runs.forEach((run, i) => {
    markdown += `| ${i + 1} | ${Object.keys(METRICS)
      .map(k => round(run[k]))
      .join(" | ")} |\n`;
  });

  const medians = {};
  Object.keys(METRICS).forEach(k => {
    medians[k] = round(median(runs.map(r => r[k])));
  });

  mediansByFramework[framework] = medians;

  markdown += `\n**Median:**\n\n`;
  markdown += `| ${Object.values(METRICS).map(m => m.label).join(" | ")} |\n`;
  markdown += `|${Object.values(METRICS).map(() => "------").join("|")}|\n`;
  markdown += `| ${Object.keys(METRICS).map(k => medians[k]).join(" | ")} |\n\n`;
}

/* ---------- Best / Worst detection ---------- */

const extremes = {};
Object.keys(METRICS).forEach(metric => {
  const values = frameworks.map(f => mediansByFramework[f][metric]);
  extremes[metric] = {
    best: METRICS[metric].better === "lower"
      ? Math.min(...values)
      : Math.max(...values),
    worst: METRICS[metric].better === "lower"
      ? Math.max(...values)
      : Math.min(...values),
  };
});

/* ---------- Comparison table ---------- */

markdown += `---\n\n# 🏆 Median Comparison\n\n`;
markdown += `| Framework | ${Object.values(METRICS).map(m => m.label).join(" | ")} |\n`;
markdown += `|-----------|${Object.values(METRICS).map(() => "------").join("|")}|\n`;

for (const framework of frameworks) {
  const row = Object.keys(METRICS).map(metric => {
    const val = mediansByFramework[framework][metric];
    if (val === extremes[metric].best) return `🟢 **${val}**`;
    if (val === extremes[metric].worst) return `🔴 *${val}*`;
    return val;
  });

  markdown += `| ${framework} | ${row.join(" | ")} |\n`;
}

/* ---------- Auto-ranking ---------- */

markdown += `\n---\n\n# 🥇 Auto Ranking (Per Metric)\n\n`;

const overallScore = {};
frameworks.forEach(f => (overallScore[f] = 0));

Object.keys(METRICS).forEach(metric => {
  const sorted = [...frameworks].sort((a, b) => {
    const va = mediansByFramework[a][metric];
    const vb = mediansByFramework[b][metric];
    return METRICS[metric].better === "lower" ? va - vb : vb - va;
  });

  markdown += `### ${METRICS[metric].label}\n\n`;
  sorted.forEach((fw, i) => {
    overallScore[fw] += (frameworks.length - i);
    markdown += `${i + 1}. **${fw}** – ${mediansByFramework[fw][metric]}\n`;
  });
  markdown += "\n";
});

/* ---------- Overall winner ---------- */

markdown += `---\n\n# 🏆 Overall Ranking\n\n`;

const finalRanking = Object.entries(overallScore)
  .sort((a, b) => b[1] - a[1]);

finalRanking.forEach(([fw, score], i) => {
  markdown += `${i + 1}. **${fw}** (score: ${score})\n`;
});

/* ---------- Markdown-friendly charts ---------- */

markdown += `\n---\n\n# 📈 Visual Comparison (Median)\n\n`;

function bar(value, max, width = 20) {
  const len = Math.round((value / max) * width);
  return "█".repeat(len) + "░".repeat(width - len);
}

Object.keys(METRICS).forEach(metric => {
  markdown += `### ${METRICS[metric].label}\n\n`;

  const values = frameworks.map(f => mediansByFramework[f][metric]);
  const max = Math.max(...values);

  frameworks.forEach(fw => {
    const v = mediansByFramework[fw][metric];
    markdown += `\`${fw.padEnd(14)}\` ${bar(v, max)} ${v}\n`;
  });

  markdown += "\n";
});

fs.writeFileSync(OUTPUT_MD, markdown);
console.log("✅ performance-comparison.md generated (median + ranking + charts)");
