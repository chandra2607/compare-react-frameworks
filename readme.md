# Framework Performance Comparison

Compare performance between Next.js, Astro, and Remix/React Router frameworks.

## Quick Start

### Interactive Launcher (Recommended) 🚀

Simply run the interactive script to start all services:

```powershell
.\start-services.ps1
```

**Features:**
- ✅ **Auto-installs dependencies** if `node_modules` is missing
- ✅ **Interactive prompts** for mode, services, and mock server
- ✅ **Opens each service** in a separate terminal window
- ✅ **Default values** for quick start (just press Enter for defaults)

**The script will prompt you for:**

1. **Mode** (default: `dev`)
   - `dev` - Development mode with hot reload
   - `build` - Build all selected services  
   - `start` - Production mode (requires build first)

2. **Services** (default: `all`)
   - `all` - Start all frameworks (Next.js, Astro, Remix)
   - `nextjs` - Next.js only
   - `astro` - Astro only
   - `remix` - Remix/React Router only

3. **Mock Server** (default: `yes`)
   - Starts Fastify mock server on port 3001 with Olympics data

**Service URLs:**
- Mock Server: `http://localhost:3001`
- Next.js: `http://localhost:3000`
- Astro: `http://localhost:4321`
- Remix/React Router: `http://localhost:9921`

---

## Prerequisites

1. **Node.js** installed (v18+ recommended)
2. **Lighthouse** installed globally:
   ```bash
   npm install -g lighthouse
   ```
3. **Dependencies** (auto-installed by `start-services.ps1` or install manually):
   ```bash
   cd next-perf && npm install
   cd ../astro-perf && npm install
   cd ../react-router-remix-perf && npm install
   cd ../fastify-mock-server && npm install
   ```

---

### Understanding Remix/React Router Key Concepts (Optional)

If you are completely new to Remix and want to explore its concepts practically, switch to the [feat-experiment-remix](https://github.com/chandra2607/compare-react-frameworks/tree/feat-experiment-remix) branch. There I have created example routes for understanding key concepts.

Just execute `npm run dev` inside the respective framework repository and explore `/`, `/dash`, and `/posts` routes.

### Manual Commands
For running lighthouse reports across all frameworks:
```bash
node run-lighthouse.js
```

For presenting the reports in markdown view:
```bash
node generate-lighthouse-comparison.js
```

## reports
Pagespeed reports would be availble inside `/performance-reports` path. 
and analyzed markdown exists with `performance-comparison.md`
## running build commands on all frameworks
!(build commands)(build-commands-comparision.png)

## Mock API Server
A Fastify-based mock server is available at `fastify-mock-server/` that provides Olympics athlete data.

Start the server:
```bash
cd fastify-mock-server
npm install
npm start
```

The server runs on port 3001 and provides:
- **Endpoint**: `http://localhost:3001/dummy-table-data`
- **Data**: 1000 Olympics athlete records with fields: athleteId, athleteName, country, sport, event, medalCount, goldMedals, silverMedals, bronzeMedals, totalPoints

## Goal 1: Framework Performance Comparison
Compare the performance between various frontend frameworks: NextJS, Remix, and Astro.

## Goal 2: MCP Server Integration with Performance Testing
Combine knowledge from Goal 1 to leverage Playwright + NextJS Dev Tools MCP together.

https://nextjs.org/docs/app/guides/mcp

Then share your findings.

## todo 
- [x] Replace API endpoint with consistent one ✅
- [ ] Integrate Playwright with MCP Server for automated performance testing
- [ ] Leverage NextJS Dev Tools MCP for deeper insights
- [ ] Document findings from combining Goal 1 performance data with MCP tooling

## Eexperiments
# Experiment 1:
All the pages are server rendered , Component Structure inside all repository looks like this 
```js
    <p>CURRENT TIME: {currentDateTime}</p>
    <SectorTable initialSectorRow={sectorData} /> // Client Component
    <LargeChart />  // Client Component
    <ImageGallery /> // Server Component
    <LongTextContent /> // Server Component 
    <DynamicList />  // Client Component
```
observations:
1. PageSpeed Scores of almost all the repositories didn't exceed beyond 70.Issue could be with Image Gallery Component, which loads lots of images. 
2. LightHouse detected CLS(could be due to images) for NextJs and Remix/React Router despite explicity providing dimensions and no CLS was detected incase of astro js.
3. Astro JS, Remix build was quicker as compared to nextjs
4. TBT was lower incase of Astro as compared with other frameworks.

# Experiment 2:
All the pages are server rendered , Component Structure inside all repository looks like this 
```js
    <p>CURRENT TIME: {currentDateTime}</p>
    <SectorTable initialSectorRow={sectorData} /> // Client Component
    <LargeChart />  // Client Component
    <ImageGallery /> // Server Component
    <LongTextContent /> // Server Component 
    <DynamicList />  // Client Component
```
on close inspection related i found out that CLS issue was being caused by the table component.after fixing that scores got changed drastically.
observations:
1. CLS now got reduced to 0 for all frameworks
2. Astro JS performance got reduced quite a lot as compared to other frameworks.
