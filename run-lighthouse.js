const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const RUNS_PER_APP = 5;
const BASE_DIR = path.resolve("performance-reports");

const apps = [
  { name: "nextjs-mobile", url: "http://localhost:3000" },
  { name: "astro-mobile", url: "http://localhost:4321" },
  { name: "remix-mobile", url: "http://localhost:9921" },
];

function runLighthouse(url, outputPath) {
  return new Promise((resolve, reject) => {
    const args = [
      url,

      // Performance-focused config
      "--preset=perf",
      "--only-categories=performance",
      "--form-factor=mobile",
      "--screenEmulation.mobile=true",

      // Stable throttling
      "--throttling-method=simulate",
      "--throttling.cpuSlowdownMultiplier=4",

      // Reliability
      "--disable-storage-reset",
      "--max-wait-for-load=45000",

      // Chrome
      "--chrome-flags=--headless --no-sandbox",

      // Output
      "--output=json",
      `--output-path="${outputPath.replace(/\\/g, "/")}"`,
    ];

    const lighthouse = spawn("lighthouse", args, {
      stdio: "inherit",
      shell: true, // REQUIRED for Windows
    });

    lighthouse.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Lighthouse exited with code ${code}`));
      }
    });
  });
}

(async function run() {
  console.log("\n📊 Starting Lighthouse mobile performance benchmarks\n");

  fs.mkdirSync(BASE_DIR, { recursive: true });

  for (const app of apps) {
    const appDir = path.join(BASE_DIR, app.name);
    fs.mkdirSync(appDir, { recursive: true });

    console.log(`🚀 ${app.name}`);

    for (let i = 1; i <= RUNS_PER_APP; i++) {
      const outputPath = path.join(appDir, `report-${i}.json`);

      console.log(`  ▶ Run ${i}/${RUNS_PER_APP}`);
      await runLighthouse(app.url, outputPath);
      console.log(`  ✅ Completed run ${i}`);
    }

    console.log("");
  }

  console.log("🎉 All Lighthouse reports generated successfully");
})().catch((err) => {
  console.error("\n❌ Lighthouse run failed:", err.message);
  process.exit(1);
});
