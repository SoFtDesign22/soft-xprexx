"use client";

import { useEffect, useRef } from "react";
import { loadAnimations, motionEvent } from "@/lib/animations";
import ShipmentNode from "./ShipmentNode";
import styles from "./MovementPath.module.css";

// Original, open, interlocking curves; this graphic is never used as the logo.
const desktop = "M-40 110 C100 -10 140 310 300 195 S500 5 590 160 S700 305 810 175 S1010 -30 1120 110 S1285 300 1080 355 C910 400 1100 440 1310 460 S1460 575 1300 620 C1120 670 1170 785 1460 775";
const desktopPair = "M-40 205 C100 325 140 5 300 120 S500 310 590 155 S700 10 810 140 S1010 345 1120 205 S1285 15 1320 175";
const mobile = "M-40 70 C45 5 75 215 170 145 S275 25 350 105 S425 260 265 290 C95 325 -10 395 85 480 S385 520 315 655 C265 745 130 720 145 815 S300 850 410 900";
const mobilePair = "M-40 150 C45 215 75 5 170 75 S275 195 350 115 S425 10 440 80";

export default function MovementPath() {
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    loadAnimations().then(({ gsap, ScrollTrigger }) => {
      if (disposed || !stage.current) return;
      const mm = gsap.matchMedia();
      mm.add({ reduced: "(prefers-reduced-motion: reduce)", mobile: "(max-width: 767px)", desktop: "(min-width: 768px)" }, context => {
        const reduced = context.conditions?.reduced;
        const svg = stage.current!.querySelector<SVGSVGElement>(context.conditions?.mobile ? "[data-mobile-path]" : "[data-desktop-path]")!;
        const path = svg.querySelector<SVGPathElement>("[data-route]")!;
        const paths = svg.querySelectorAll<SVGPathElement>("[data-draw]");
        const nodes = svg.querySelectorAll<SVGGElement>("[data-shipment-node]");
        const nodeLayer = svg.querySelector("[data-node-layer]");
        const positionStage = () => {
          const hero = document.querySelector<HTMLElement>("#home");
          if (!hero) return;
          const visual = hero.querySelector<HTMLElement>("[data-hero-visual]")!;
          stage.current!.style.top = `${context.conditions?.mobile ? visual.offsetTop + 100 : hero.offsetHeight - (window.innerWidth <= 1023 ? 285 : 310)}px`;
          const bounds = svg.getBoundingClientRect();
          // Counter-scale the glyphs so nodes stay circular at every SVG ratio.
          gsap.set(svg.querySelectorAll("[data-node-glyph]"), { scaleX: svg.viewBox.baseVal.width / bounds.width, scaleY: svg.viewBox.baseVal.height / bounds.height, transformOrigin: "0 0" });
        };
        positionStage();
        const resize = new ResizeObserver(() => { positionStage(); ScrollTrigger.refresh(); });
        resize.observe(document.querySelector("#home")!);
        resize.observe(svg);
        if (reduced) {
          paths.forEach(line => gsap.set(line, { strokeDasharray: "none", strokeDashoffset: 0 }));
          nodes.forEach((node, index) => { const point = path.getPointAtLength(path.getTotalLength() * (.12 + index * .22)); gsap.set(node, { x: point.x, y: point.y, opacity: 1 }); });
          delete document.documentElement.dataset.routeIntro;
          return () => { resize.disconnect(); stage.current?.style.removeProperty("top"); };
        }
        const animateEntry = document.documentElement.dataset.routeIntro === "pending";
        const reveal = gsap.timeline({ delay: 1.05 });
        gsap.set(nodeLayer, { opacity: animateEntry ? 0 : 1 });
        paths.forEach((line, index) => {
          const length = line.getTotalLength();
          gsap.set(line, { opacity: 1, strokeDasharray: length, strokeDashoffset: animateEntry ? length : 0 });
          if (animateEntry) reveal.to(line, { strokeDashoffset: 0, duration: 2.25, ease: "power2.inOut" }, index * .15);
        });
        if (animateEntry) reveal.to(nodeLayer, { opacity: 1, duration: .6 }, 2.3);
        delete document.documentElement.dataset.routeIntro;

        const ambient: ReturnType<typeof gsap.timeline>[] = [];
        nodes.forEach((node, index) => {
          const duration = 26 + index * 3.4;
          const travel = gsap.timeline({ repeat: -1, paused: true });
          travel.to(node, { motionPath: { path, align: path, alignOrigin: [.5, .5], start: 0, end: 1 }, duration, ease: "none" }, 0)
            .fromTo(node, { opacity: 0 }, { opacity: 1, duration: 1.3 }, 0)
            .to(node, { opacity: 0, duration: 1.3 }, duration - 1.3);
          // Even spacing without a cluster of dots at the entrance.
          travel.totalTime(duration * (index * .21 + .06));
          ambient.push(travel);
        });
        let inView = true;
        let userPaused = document.documentElement.dataset.motionPaused === "true";
        let introduced = false;
        const updatePlayback = () => { ambient.forEach(travel => { if (introduced && inView && !document.hidden && !userPaused) travel.resume(); else travel.pause(); }); };
        const introduce = gsap.delayedCall(animateEntry ? 3.35 : 0, () => { introduced = true; updatePlayback(); });
        const observer = new IntersectionObserver(entries => { inView = entries[0].isIntersecting; updatePlayback(); }, { rootMargin: "120px" });
        observer.observe(stage.current!);
        const onMotion = (event: Event) => { userPaused = (event as CustomEvent<{ paused: boolean }>).detail.paused; updatePlayback(); };
        document.addEventListener("visibilitychange", updatePlayback);
        window.addEventListener(motionEvent, onMotion);

        gsap.to(svg, { y: context.conditions?.mobile ? 18 : 62, ease: "none", scrollTrigger: { trigger: "#home", start: "top top", end: "bottom top", scrub: 1.2 } });
        return () => { observer.disconnect(); resize.disconnect(); stage.current?.style.removeProperty("top"); introduce.kill(); ambient.forEach(travel => travel.kill()); reveal.kill(); document.removeEventListener("visibilitychange", updatePlayback); window.removeEventListener(motionEvent, onMotion); };
      }, stage);
      cleanup = () => mm.revert();
    }).catch(() => { delete document.documentElement.dataset.routeIntro; });
    return () => { disposed = true; cleanup(); };
  }, []);

  return <div ref={stage} className={styles.stage} aria-hidden="true">
    <svg data-desktop-path className={styles.desktop} viewBox="0 0 1440 860" fill="none" preserveAspectRatio="none">
      <path data-draw d={desktopPair} stroke="#FFD900" strokeOpacity=".55" strokeWidth="2.2" vectorEffect="non-scaling-stroke" />
      <path data-draw data-route d={desktop} stroke="#FFD900" strokeWidth="4.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <g data-node-layer>{[0,1,2,3].map(index => <ShipmentNode key={index} index={index} x={100 + index * 270} y={160} />)}</g>
    </svg>
    <svg data-mobile-path className={styles.mobile} viewBox="0 0 390 960" fill="none" preserveAspectRatio="none">
      <path data-draw d={mobilePair} stroke="#FFD900" strokeOpacity=".6" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      <path data-draw data-route d={mobile} stroke="#FFD900" strokeWidth="3.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <g data-node-layer>{[0,1].map(index => <ShipmentNode key={index} index={index} x={80 + index * 210} y={140} />)}</g>
    </svg>
  </div>;
}
