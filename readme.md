## Pre-requsites
1. LightHouse must be installed on global level
`npm install -g lighthouse`
2. install requisite packages inside each repositories `react-router-remix-perf` , `next-perf` , `astro-perf` by running `npm install` inside each repo 
3. run build for each of them and start the servers for each repo 
`npm run build` && `npm run start`

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