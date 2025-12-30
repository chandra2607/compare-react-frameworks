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

## todo 
replace API endpoint with consistent one

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
2. LightHouse detected CLS(due to images) for NextJs and Remix/React Router despite explicity providing dimensions and no CLS was detected incase of astro js.
3. Astro JS, Remix build was quicker as compared to nextjs
4. TBT was lower incase of Astro as compared with other frameworks.