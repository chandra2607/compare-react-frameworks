## Limited Analysis of various frontend framework in terms of pagespeed analysis
#### Context
In the Last PPA, smart goal assigned was to explore Astro and compare its performance as compared to Next.js(which we use).so while doing reaserach around astro , i decided to keep remix(now react-router in v7) into to the tray for comparision as i have been heared quite a lot positive feedback in terms of remix.
so i got a basic overview of the concepts for remix and astro initially.then did bit of basic setup for components ranging from static/dynamic to slow comonent or client compoents to test pagespeed performance.

#### Basic terminologies and concepts and basic philosophy
##### Astro 
philosophy:
Astro focusses on the philosophy that unneccesary js files generated during builds should be fully controllable as large js bundle causes delay.it does not render any js for server components.and just does hydration only for interactive components(client islands).its primaraily designed to be used for websites which have minimal interactive compoents and mostly content focussed. 
##### termiologies
*Server Island* : They Can be considered as the compoentns which get executed on the server, gets streamed later and meanwhile the compoentn is get loaded a fallback can be displayed in the client(interms of nextjs it can be considered as streaming components) 
*Client Island* : They are the components which have some form of interactivity.similar to nextjs they do get executed in the server for initial html.and the best thing about these client components is that their respective js bundles can be fully controlled on the basis of requirement and keeping performance in the mind with the help of client directives.
*Client Directives*: they are basically the heart of the astro.it enables us to control js.with it we can load our js file on browser idle state,on page load,on scrolling(with the help of intersection observer) or load the component fully on client side only.
plese note that: when i mentioned intersection observer for js file it means that your compoennt html is already rendered , the js is just needed for making it interactive and hydration purpose.


##### Remix(React Router) 
Remix focussess on the philosphy that a website should focus on progressive enhancement,security and perofance in the mind.its primarily designed to be ssr only.however , they can be also used to serve static page as well with the help of caching.

terminologies:
remix has quite simple structure and hence simple concepts.
*Loaders*: the function where the whole data for the route are being passed and it returns a single json response which can be consumed by the given route.also,we can also perform streaming by making one or more data points as defer.     
*Actions*: 
as i had already mentioned earlier that remix focusses on progressive enhancement meaning the website should work without js as well.js should be used only for ui/ux.so keeping that in mind , our interactions take place in server via actions.for example for submitting the `<form >` we need to use `<form action={myAction} method="post"/>`. 

additional features when compared with nextjs:
1. in remix,each route owns its data whereas in nextjs,each compoentn owns its data.
2. in remix,it provides determininstic and predictible control while navigating to a nested route based on that we can do some actions(show loading indiactor,behave differently based which component is getting downloaded). and on navigating it just renders the required path component only its parent routes are kept intact.   
whereas in nextjs, there is no inbuilt control over the loading state and when navigating to a nested route.it completely re-reners the whole tree.
3. in remix requests for data fetching can be made in parallel.
NextJS:
as we are already aware of this ignroing this part for now.if need any anyone can contribute to this part.

#### basic component setup across
```js
// All the pages were dynamically generated 
<SectorTable initialSectorRow={sectorData} /> // Client Component but initial data
// being passed via server
<LargeChart />  // Client Component(Chart.js)  
<ImageGallery /> // Server Component 
<LongTextContent /> // Server Component 
<DynamicList />  // Client Component
```

#### Observations
1. The build process in astro and remix took quite very less time as compared to nextjs.
2. Pagespeed performance: 
Overall based on the experiment mentioned above(i haven't optimized client compnents),after using astro  client directives lighthouse scores for astro reached to 100(perfect).
whereas the performance between nextjs and remix were quite comparable with each other.i did tried to look for deal breaker in remix as well.but didn't find any.based on their official statements remix performs slightly better as compared to nextjs over metrics like TTFB,FCP etc.
for detailed performance comparision you can check this one out [remix-vs-next](https://remix.run/blog/remix-vs-next).


its detailed analysis can be viewed here [Page Speed Comparision](https://github.com/chandra2607/compare-react-frameworks/blob/main/performance-comparison.md) 

Note:
Though these observations are based on my limited exploration to Astro,Remix a bit.the above observations might differ a bit.so incase if you feel there is the need of improvement please do suggest it out.

Conclusion:
Overall,with Astro JS we can deliver a highly performant website with minimal effort.though the community support for it is less when compared with nextjs.also recently, [astro has been aquired bu Cloudflare](https://astro.build/blog/joining-cloudflare/).so community supprot might improve a bit.
however NextJS has been fantastic sofar as well.with this we can also build performant websites.its quite stable and frequently evolving as well.nextjs is suited for most of the use cases.
now coming back to remix,it was quite good explore as well.i might explore this further later.its use cases a slighly different as compared with nextjs and astro.
in the end, the choice of the framework depends on the requirements.every framwroks has some pros and cons. 