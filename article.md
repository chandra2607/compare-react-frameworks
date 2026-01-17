## Limited Analysis of Frontend Frameworks in Terms of PageSpeed Performance
#### Context
In the last PPA, the smart goal assigned was to explore Astro and compare its performance against Next.js (which we currently use). While researching Astro, I decided to include Remix in the comparison as well, having heard positive feedback regarding its performance. I obtained a basic overview of the core concepts for both Remix and Astro initially, then set up test components ranging from static/dynamic to slow components and client components to evaluate PageSpeed performance.

#### Basic Terminology, Concepts, and Philosophy
##### Astro 
**Philosophy:**
Astro focuses on the principle that unnecessary JavaScript generated during builds should be fully controllable, as large JS bundles cause performance delays. By default, Astro does not render JavaScript for non-interactive content. It only hydrates interactive components (islands). Astro is primarily designed for websites with minimal interactive components and mostly content-focused use cases.

##### Terminology
**Islands Architecture**: Astro uses an island-based architecture where interactive components are isolated "islands" of interactivity on a server-rendered page. These interactive components (client islands) have their JavaScript bundles generated and loaded, while the rest of the page remains static HTML with no JavaScript.

**Client Islands**: These are the interactive components that require JavaScript to function. Similar to Next.js, they are initially rendered on the server for the HTML output. However, their respective JavaScript bundles can be fully controlled based on performance requirements using client directives.

**Client Directives**: These are the core feature of Astro. They enable fine-grained control over when and how JavaScript is loaded. Options include:
- `client:load` - Load JavaScript immediately
- `client:idle` - Load JavaScript when the browser is idle
- `client:visible` - Load JavaScript when the component becomes visible (using Intersection Observer)
- `client:only` - Skip server rendering and render entirely on the client


##### Remix (React Router)
**Philosophy:**
Remix focuses on progressive enhancement, security, and performance. It is primarily designed as a server-side rendering (SSR) framework. However, it can also serve static pages effectively with appropriate caching strategies.

**Terminology:**
Remix has a straightforward structure with simple core concepts:

**Loaders**: Functions that fetch and prepare all the data required for a specific route. They return a single JSON response that the route component consumes. Loaders also support streaming by deferring one or more data points, allowing the page to render while data is still loading.

**Actions**: Remix emphasizes progressive enhancement, meaning websites should function without JavaScript. Actions handle user interactions on the server (such as form submissions) to support this philosophy. For example: `<form action={myAction} method="post"/>`.

**Additional Features Compared to Next.js:**
1. **Data Ownership**: In Remix, each route owns its data. In Next.js, each component fetches its own data.
2. **Nested Route Navigation**: Remix provides deterministic control when navigating nested routes. You can show loading indicators and handle nested route state predictably. Only the required route component renders; parent routes remain intact. In Next.js, the entire tree re-renders during navigation without built-in loading state controls.
3. **Parallel Data Fetching**: Remix supports parallel requests for data fetching within a loader.

##### Next.js
As Next.js is already familiar to us, I'm deferring detailed analysis. Contributions to this section are welcome.

#### Basic Component Setup Across Frameworks
```js
// All pages were dynamically generated
<SectorTable initialSectorRow={sectorData} /> // Client Component with server-provided initial data
<LargeChart />  // Client Component (Chart.js library)  
<ImageGallery /> // Non-interactive component (no JavaScript)
<LongTextContent /> // Non-interactive component (no JavaScript)
<DynamicList /> // Client Component
```

#### Observations
1. **Build Performance**: Both Astro and Remix have significantly faster build times compared to Next.js.

2. **PageSpeed Performance**: 
Overall, based on the experiments above (without optimizing client components), Astro achieved perfect Lighthouse scores of 100 using client directives.

Performance between Next.js and Remix was comparable. I explored Remix thoroughly but found no significant deal-breaker. According to official benchmarks, Remix performs slightly better than Next.js.

For a detailed performance comparison, see [Page Speed Comparison](https://github.com/chandra2607/compare-react-frameworks/blob/main/performance-comparison.md).

You can also refer to the official comparison: [Remix vs Next.js](https://remix.run/blog/remix-vs-next).

**Note:** These observations are based on limited exploration of Astro and Remix. Results may vary depending on specific use cases and optimizations. Please suggest improvements if needed.

#### Conclusion
Overall, Astro delivers highly performant websites with minimal effort. However, community support is smaller compared to Next.js. Recently, [Astro was acquired by Cloudflare](https://astro.build/blog/joining-cloudflare/), which should strengthen community support going forward.

Next.js has proven fantastic so far. It enables building performant websites and is stable with frequent updates. Next.js suits most use cases well.

Remix was a valuable exploration. I may investigate it further. Its use cases differ slightly from Next.js and Astro.

Ultimately, the choice of framework depends on your specific requirements. Each framework has distinct pros and cons, and the best choice depends on your project's needs. 

#### Resources
[Github Repo,I've created for comparision](https://github.com/chandra2607/compare-react-frameworks)
[React Router V7 (earlier remix)](https://reactrouter.com/home)
[Astro](https://docs.astro.build/en/getting-started/)
[NextJS](https://nextjs.org/docs)