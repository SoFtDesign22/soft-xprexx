"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Globe2, Pause, Play, ChevronDown } from "lucide-react";
import { loadAnimations, setMotionPaused } from "@/lib/animations";
import TrackingBar from "./TrackingBar";
import styles from "./Hero.module.css";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    loadAnimations().then(({ gsap }) => {
      if (disposed || !root.current) return;
      const mm = gsap.matchMedia();
      mm.add({ reduced: "(prefers-reduced-motion: reduce)", mobile: "(max-width: 767px)", desktop: "(min-width: 768px)" }, context => {
        const reduced = context.conditions?.reduced;
        const scope = root.current!;
        if (document.documentElement.dataset.heroIntro === "pending") {
          const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
          timeline.fromTo(scope.querySelectorAll("[data-hero-line]"), { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 1.05, stagger: .13 }, .1)
            .fromTo(scope.querySelector("[data-hero-copy]"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .65 }, .5)
            .fromTo(scope.querySelector("[data-hero-actions]"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .6 }, .75);
          delete document.documentElement.dataset.heroIntro;
        }
        if (!reduced) {
          gsap.to(scope.querySelector("[data-hero-content]"), {
            y: context.conditions?.mobile ? -22 : -64,
            opacity: .3, ease: "none",
            scrollTrigger: { trigger: scope, start: "top top", end: "bottom 20%", scrub: .8 },
          });
          gsap.to(scope.querySelector("[data-hero-image]"), {
            yPercent: 6, scale: 1.045, ease: "none",
            scrollTrigger: { trigger: scope, start: "top top", end: "bottom top", scrub: 1 },
          });
        }
      }, root);
      cleanup = () => mm.revert();
    }).catch(() => { delete document.documentElement.dataset.heroIntro; });
    return () => { disposed = true; cleanup(); };
  }, []);

  const toggleMotion = () => { const next = !paused; setPaused(next); setMotionPaused(next); };

  return <section id="home" ref={root} className={styles.hero} aria-labelledby="hero-title">
    <div className={styles.content} data-hero-content>
      <p className={`eyebrow ${styles.eyebrow}`} data-hero-line><span className={styles.smallRule} /> Shipping made Easy.</p>
      <h1 id="hero-title" className={styles.title} aria-label="Moving What Matters Across Borders.">
        <span data-hero-line>Moving What</span>
        <span data-hero-line>Matters</span>
        <span className={styles.titleLast} data-hero-line>Across Borders<span className={styles.period}>.</span></span>
      </h1>
      <p className={styles.copy} data-hero-copy>Fast, reliable shipping, cargo and gift delivery built to make moving what matters easier.</p>
      <div className={styles.buttons} data-hero-actions>
          <Link href="/ship/" className="button button-cyan">Ship Now</Link>
        <a href="#tracking" className="button button-outline">Track Shipment</a>
      </div>
    </div>
    <div className={styles.visual} data-hero-visual>
      <Image src="/images/cargo-aircraft.webp" width={1086} height={1448} alt="An unbranded cargo aircraft ready for its next journey on an airport apron" priority sizes="(max-width: 767px) 100vw, 48vw" className={styles.photo} data-hero-image />
      <div className={styles.imageTop}><Globe2 size={18} strokeWidth={1.5} /><span>BEYOND BORDERS</span><span className={styles.imageIndex}>01 / 04</span></div>
      <div className={styles.imageCaption}><span>Every shipment.<br />A world of possibility.</span><span className={styles.captionCross}>+</span></div>
    </div>
    <div className={styles.heroBottom}>
      <a href="#services" className={styles.discover}><span className={styles.scrollIcon}><ChevronDown size={15} /></span><span>Discover a world of services</span></a>
      <button className={styles.motionToggle} type="button" onClick={toggleMotion} aria-pressed={paused} aria-label={paused ? "Resume shipment animation" : "Pause shipment animation"}>{paused ? <Play size={13} /> : <Pause size={13} />}<span>{paused ? "Motion paused" : "Always in motion"}</span></button>
    </div>
    <div className={styles.tracking}><TrackingBar /></div>
  </section>;
}
