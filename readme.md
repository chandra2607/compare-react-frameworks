### Undestanding Remix/React Router Key concepts(Optional)
If you are completely new to remix and want to explore its concepts practically
switch to [feat-experiment-remix](https://github.com/chandra2607/compare-react-frameworks/tree/feat-experiment-remix) branch.there i have created few example routes for understanding key concepts. 
just execute `npm run dev` inside respective framework repository and explore `/` , `/dash` and `/posts` routes.  

## Pre-requsites
1. LightHouse must be installed on global level
`npm install -g lighthouse`
2. install requisite packages inside each repositories `react-router-remix-perf` , `next-perf` , `astro-perf` by running `npm install` inside each repo 
3. run build for each of them and start the servers for each repo 
`npm run build` && `npm run start`

```md
NextJS running at `https://localhost:3000`
Astro running at `https://localhost:4321`
Remix/React Router running at `https://localhost:9921`
```

## Commands
for running lighthouse reports across all frameworks.
`node run-lighthouse.js`
for presenting the reports in markdown view 
`node generate-lighthouse-comparison.js`

## reports
Pagespeed reports would be availble inside `/performance-reports` path. 
and analyzed markdown exists with `performance-comparison.md`
## running build commands on all frameworks
!(build commands)(build-commands-comparision.png)

## Goal 1: Framework Performance Comparison
Compare the performance between various frontend frameworks: NextJS, Remix, and Astro.

## Goal 2: MCP Server Integration with Performance Testing
Combine knowledge from Goal 1 to leverage Playwright + NextJS Dev Tools MCP together.

https://nextjs.org/docs/app/guides/mcp

Then share your findings.

## todo 
- [ ] Replace API endpoint with consistent one
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
