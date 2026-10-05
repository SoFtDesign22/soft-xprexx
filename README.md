# Soft Xprexx — Phase 1

Next.js, React, TypeScript, CSS Modules, and GSAP (ScrollTrigger and MotionPathPlugin).

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`. `npm run build` produces the deployable static site in `out/`; `npm run typecheck` checks TypeScript.

The homepage includes navigation, hero, the original animated movement system, tracking bar, and four services. Ship Now opens `/ship/`, which contains three service-selection cards styled in `app/ship/page.module.css`. Get Started selects a card; individual forms are not implemented. About and Contact open accessible information dialogs; contact details are pending rather than invented. The tracker validates input and explicitly reports that live tracking is not connected.


`TrackingBar` accepts an optional `onTrack(trackingNumber)` callback returning a feedback message, ready for a future backend integration.

## Original brand asset

`public/brand/soft-xprexx-original.jpg` is the supplied file copied byte-for-byte. Its SHA-256 is `ca7dff538cd9ced29041a45e49673964e8397025fab567722cedf63a9af6a3ee`. The image keeps its 1280:1088 ratio; a navigation frame clips only the broad white margin. The mark is never redrawn, distorted, or rotated. `lib/brand.ts` stores the file reference. The abstract movement path and favicon are separate graphics, not replacement logos.

## Motion

The hero sequence reveals typography and actions before drawing two spacious interlocking curves and introducing shipment nodes. Four desktop nodes and two mobile nodes travel along one open route at different speeds, fading at the endpoints. The route continues into services. ScrollTrigger adds restrained hero parallax and individual card reveals without pinning or scroll hijacking.

The pause control stops ambient shipment motion. Offscreen and hidden-tab animations pause automatically. `prefers-reduced-motion` shows complete paths and static nodes, disables parallax and pointer responses, and uses only opacity for service reveals. GSAP contexts, timelines, media queries, observers, and listeners are disposed on cleanup.

Fonts are served locally. The original generated cargo image is optimized as WebP; the hero image is prioritized and its service-card reuse is lazy-loaded.
