import fs from "fs";
import path from "path";

const resultsDir = "./lhci-results";
const manifestPath = path.join(resultsDir, "manifest.json");

// Load manifest
if (!fs.existsSync(manifestPath)) {
  console.error("manifest.json not found in ./lhci-results");
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

// Group by URL (so you can compare frameworks)
const byUrl = {};
for (const run of manifest) {
  const url = run.url;
  if (!byUrl[url]) byUrl[url] = [];
  byUrl[url].push(run);
}

// Helper to load detailed metrics
function loadMetrics(jsonPath) {
  const report = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  const audits = report.audits;
  const categories = report.categories;

  return {
    performance: (categories.performance.score * 100).toFixed(0),
    LCP: audits["largest-contentful-paint"].numericValue.toFixed(0),
    FCP: audits["first-contentful-paint"].numericValue.toFixed(0),
    TBT: audits["total-blocking-time"].numericValue.toFixed(0),
    SpeedIndex: audits["speed-index"].numericValue.toFixed(0),
    TTI: audits["interactive"].numericValue.toFixed(0),
  };
}

// Summarize each group
for (const [url, runs] of Object.entries(byUrl)) {
  console.log(`\n🔗 ${url}`);
  const metrics = runs.map(r => loadMetrics(r.jsonPath));

  // Compute averages
  const avg = Object.keys(metrics[0]).reduce((acc, key) => {
    const vals = metrics.map(m => Number(m[key]));
    acc[key] = (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(0);
    return acc;
  }, {});

  console.table(metrics);
  console.log("Average:", avg);
}
