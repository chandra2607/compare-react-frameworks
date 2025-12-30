# Framework Performance Research - Quick Reference Guide

This quick reference guide distills the most important concepts. Use this to quickly recall key differences, optimal use cases, and performance considerations.

---

## Framework Selection Decision Tree

```
START: Choosing between Next.js, Remix, Astro
│
├─ Is content mostly static (blogs, docs, marketing)?
│  ├─ YES → Consider Astro (smallest JS, best performance)
│  └─ NO → Continue...
│
├─ Is SEO critical?
│  ├─ YES → Next.js or Astro (both excellent)
│  └─ NO → Continue...
│
├─ Are you building a complex interactive application?
│  ├─ YES → Next.js (best ecosystem + tools)
│  └─ NO → Continue...
│
├─ Do you need form handling and progressive enhancement?
│  ├─ YES → Remix (best form patterns)
│  └─ NO → Continue...
│
├─ Is your team experienced with React Router?
│  ├─ YES → Remix (natural progression)
│  └─ NO → Next.js (more popular)
│
└─ DEFAULT CHOICE: Next.js App Router (safe choice for most)
```

---

## Core Concepts Quick Reference

### Rendering Strategies at a Glance

| Strategy | When Generated | Regeneration | Best For |
|----------|----------------|--------------|----------|
| **SSG** | Build time | Never (unless rebuild) | Blogs, docs, static content |
| **SSR** | Every request | Always fresh | Real-time, user-specific content |
| **ISR** | Build + on-demand | Time-based or webhook | E-commerce, news sites |
| **CSR** | Client-side | Dynamic | SPAs, dashboards, interactive apps |

### Hydration Comparison

| Approach | What Ships | Performance | Complexity |
|----------|-----------|-------------|-----------|
| **Full Hydration** | Full React app | Slower (needs JS) | Simple |
| **Partial Hydration** | Only interactive JS | Faster | Medium |
| **Resumability** | Pause points, minimal JS | Fastest | Complex |
| **RSC + Streaming** | HTML chunks + RSC payload | Fast | Medium |

---

## Performance Metrics Quick Reference

### Core Web Vitals (Google's 3 Key Metrics)

```
LCP (Largest Contentful Paint) - Load Speed
├─ Good:    ≤ 2.5 seconds
├─ Needs:   2.5-4.0 seconds
└─ Poor:    > 4.0 seconds
   └─ Fix: Optimize images, reduce server response time

INP (Interaction to Next Paint) - Responsiveness
├─ Good:    ≤ 200 milliseconds
├─ Needs:   200-500 milliseconds
└─ Poor:    > 500 milliseconds
   └─ Fix: Break long tasks, optimize event handlers

CLS (Cumulative Layout Shift) - Visual Stability
├─ Good:    ≤ 0.1
├─ Needs:   0.1-0.25
└─ Poor:    > 0.25
   └─ Fix: Set image dimensions, avoid dynamic content injection
```

### Secondary Metrics

- **TTFB** (Time to First Byte) - Server response time, goal < 600ms
- **FCP** (First Contentful Paint) - First element renders, goal < 1.8s
- **Speed Index** - Visual completeness, goal < 3.4s
- **TTI** (Time to Interactive) - Page fully interactive, goal < 3.8s

---

## Bundle Size Impact Reference

### Typical JavaScript Payloads (Uncompressed)

| Framework | Base | With Routing | Add Charts | Add Forms |
|-----------|------|--------------|-----------|-----------|
| **Next.js** | ~60KB | ~120KB | ~180KB | ~200KB |
| **Remix** | ~35KB | ~80KB | ~140KB | ~150KB |
| **Astro** | ~0KB | ~5KB | ~50KB | ~60KB |

*Note: Astro starts near zero because it ships no JS by default. These are typical interactive page sizes.*

### JavaScript Load Impact

```
Typical user impact per 100KB JavaScript:
├─ Parse/compile time: 100-200ms
├─ Execution time: 50-100ms
├─ Main thread blocked: 150-300ms
└─ Total potential INP impact: 300-600ms

Optimization benefit:
├─ Reduce by 50KB: 150-300ms faster INP
├─ Reduce by 100KB: 300-600ms faster INP
└─ Reduce by 150KB: 450-900ms faster INP
```

---

## Quick Optimization Checklist

### For Next.js Projects

- [ ] Using App Router (not Pages Router)
- [ ] Server Components for non-interactive content
- [ ] next/image for all images
- [ ] Dynamic imports for large components
- [ ] ISR for static content that updates
- [ ] Image priority for above-fold images
- [ ] next/font for fonts (prevents FOUT)
- [ ] Response headers cached correctly
- [ ] Code splitting by route (automatic)

### For Remix Projects

- [ ] Loaders for all data (not client fetches)
- [ ] Actions for all mutations
- [ ] Progressive enhancement forms
- [ ] Nested routes for layout optimization
- [ ] Resource routes for API endpoints
- [ ] HTTP caching headers set correctly
- [ ] Prefetch links with prefetch prop
- [ ] Handling errors in loaders/actions
- [ ] Streaming HTML setup

### For Astro Projects

- [ ] Using islands for interactivity only
- [ ] No unnecessary client directives
- [ ] client:visible for below-fold components
- [ ] client:idle for non-critical features
- [ ] Content Collections for content safety
- [ ] Image optimization via astro:assets
- [ ] SSR adapter chosen (if needed)
- [ ] ISR configured (if using Vercel)
- [ ] Framework integration tested

---

## Common Interview Questions & Answers

### Q: "What's the performance difference between SSG and SSR?"

**Answer Structure:**
1. **Delivery Speed:** SSG faster (pre-generated HTML exists)
2. **Freshness:** SSR fresher (generated on request)
3. **Trade-off:** SSG + ISR combines both benefits
4. **Example:** Blog with ISR can be static articles + dynamic comments

### Q: "How do React Server Components improve performance?"

**Answer Structure:**
1. **Concept:** Components that only run on server, never hydrate
2. **Benefits:** Smaller client bundles, less parsing/execution
3. **Example:** Fetch user data on server RSC, pass to client component
4. **Impact:** 30-50% reduction in client JavaScript for many apps

### Q: "Why is Astro faster for content sites?"

**Answer Structure:**
1. **Zero JS Philosophy:** Sends HTML/CSS only by default
2. **Islands Architecture:** Only interactive components get JS
3. **Example:** Blog post = pure HTML, form = interactive island
4. **Result:** 80-90% smaller JS payload than traditional frameworks

### Q: "Explain the hydration process."

**Answer Structure:**
1. **Server sends:** HTML (instant view) + JavaScript bundle
2. **Browser receives:** HTML rendered, then downloads JS
3. **Hydration starts:** React reconstructs virtual DOM
4. **Attaches handlers:** Event listeners, state hooks wired up
5. **Challenge:** Hydration mismatch if server/client render differently

### Q: "What's Incremental Static Regeneration?"

**Answer Structure:**
1. **Concept:** Generate pages on-demand, cache, revalidate periodically
2. **Process:** First visitor triggers generation, next visitors get cached
3. **Example:** Product page cached 60 seconds, regenerates in background
4. **Benefit:** Static speed for 99% of traffic, fresh content for new requests
5. **When:** E-commerce, news, documentation with frequent updates

### Q: "How would you optimize for Core Web Vitals?"

**Answer Structure:**
1. **For LCP:** Optimize images, fast TTFB, preload critical resources
2. **For INP:** Minimize long tasks, optimize event handlers
3. **For CLS:** Set image dimensions, reserve space for dynamic content
4. **Testing:** Use Lighthouse, WebPageTest, monitor real users
5. **Iteration:** Measure, prioritize, fix, re-measure

---

## Framework-Specific Tips

### Next.js Power Moves

```javascript
// 1. Use Image component
import Image from 'next/image';
<Image src="/hero.jpg" alt="Hero" width={1200} height={600} priority />

// 2. Server Components by default
export default async function Page() {
  const data = await fetch(/* ... */);
  return <div>{data}</div>;
}

// 3. Dynamic imports for large components
const Editor = dynamic(() => import('@/components/Editor'), {
  loading: () => <Skeleton />
});

// 4. ISR for periodic updates
export const revalidate = 60; // Regenerate every 60 seconds

// 5. Font optimization
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

// 6. Script optimization
<Script strategy="lazyOnload" src="/analytics.js" />
```

### Remix Power Moves

```javascript
// 1. Loader for data
export async function loader({ params }) {
  return json(await getPost(params.id));
}

// 2. Action for mutations
export async function action({ request }) {
  if (request.method === 'POST') {
    await createComment(/* ... */);
    return redirect('.'); // Revalidate all data
  }
}

// 3. Progressive form
<Form method="post">
  <input name="comment" />
  <button type="submit">Post</button>
</Form>

// 4. Prefetching
<Link to="/page" prefetch="intent">Link</Link>

// 5. useFetcher for non-navigating mutations
const fetcher = useFetcher();
<fetcher.Form method="post" action="/api/vote">
  <button type="submit">Vote</button>
</fetcher.Form>
```

### Astro Power Moves

```astro
---
// 1. Island with client directive
import InteractiveChart from '../components/Chart.jsx';
---

<h1>Static Content</h1>
<InteractiveChart client:visible />

---

// 2. Content Collections
import { getCollection } from 'astro:content';
const posts = await getCollection('blog');

---

// 3. Image optimization
import { Image } from 'astro:assets';
import heroImg from '../images/hero.jpg';

<Image src={heroImg} alt="Hero" />

---

// 4. View Transitions
<a href="/about" data-astro-reload>About</a>

---

// 5. SSR with adapter
// astro.config.mjs
import vercel from '@astrojs/vercel/serverless';
export default defineConfig({
  output: 'server',
  adapter: vercel(),
});
```

---

## Performance Baseline Numbers

### Realistic Performance Metrics by Framework

#### Typical Blog/Content Site
- **Astro:** LCP 1.2s, INP 80ms, CLS 0.05
- **Next.js (optimized):** LCP 1.8s, INP 150ms, CLS 0.08
- **Remix:** LCP 2.0s, INP 120ms, CLS 0.08

#### E-Commerce Product Page
- **Next.js (with Image):** LCP 2.2s, INP 180ms, CLS 0.1
- **Remix:** LCP 2.4s, INP 200ms, CLS 0.12
- **Astro (with islands):** LCP 1.8s, INP 150ms, CLS 0.06

#### Admin Dashboard
- **Next.js:** LCP 3.5s, INP 250ms, CLS 0.15
- **Remix:** LCP 3.2s, INP 220ms, CLS 0.18
- **Astro:** Not ideal (needs heavy client-side JS)

---

## Study Resources & Next Steps

### Recommended Deep Dives

1. **Next.js App Router**
   - Official docs: nextjs.org/docs/app
   - Focus: Server Components, Data fetching, ISR patterns

2. **Remix Routing**
   - Official docs: remix.run/docs
   - Focus: Loaders, Actions, Nested routes, Progressive enhancement

3. **Astro Islands**
   - Official docs: docs.astro.build
   - Focus: Partial hydration, Content Collections, Framework integration

### Practice Projects

1. **Build same project in all three:**
   - Blog with comments section
   - E-commerce product page
   - Marketing landing page

2. **Performance optimization challenge:**
   - Start with unoptimized version
   - Target Lighthouse 90+
   - Document optimization steps

3. **Bundle analysis comparison:**
   - Run analyzer on same app in each framework
   - Document bundle sizes
   - Identify optimization opportunities

### Tools to Master

- **Lighthouse CLI:** Automated performance testing
- **webpack-bundle-analyzer:** Bundle composition visualization
- **Chrome DevTools:** Real-time profiling
- **WebPageTest:** Detailed waterfall analysis
- **Vercel Analytics:** Real user monitoring

---

## Day-Before-Interview Checklist

- [ ] Review Core Web Vitals thresholds and fixes
- [ ] Understand SSG vs SSR vs ISR trade-offs
- [ ] Can explain React Server Components simply
- [ ] Know advantages of each framework (not which is "best")
- [ ] Understand hydration process end-to-end
- [ ] Have framework examples ready to discuss
- [ ] Can analyze bundle composition
- [ ] Know how to measure performance (Lighthouse, RUM)
- [ ] Understand progressive enhancement concept
- [ ] Ready to discuss real-world trade-offs

---

## Key Talking Points to Memorize

### "The Three Pillars of Web Performance"
1. **Loading Speed** (LCP) - How fast first content appears
2. **Responsiveness** (INP) - How quickly page responds to interaction
3. **Visual Stability** (CLS) - How much things move unexpectedly

### "Framework Trade-offs Summary"
- **Next.js:** Best ecosystem, balanced, most popular
- **Remix:** Best forms/server patterns, smaller learning surface
- **Astro:** Best performance baseline, most content-focused

### "Performance Optimization Hierarchy"
1. Choose right rendering strategy (biggest impact)
2. Optimize images and assets (major impact)
3. Minimize JavaScript bundles (significant impact)
4. Optimize code splitting (moderate impact)
5. Add caching strategies (ongoing benefit)

---