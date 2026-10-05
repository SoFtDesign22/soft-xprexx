"use client";

import { useEffect, useRef } from "react";
import { loadAnimations } from "@/lib/animations";
import ServiceCard from "./ServiceCard";
import styles from "./Services.module.css";

const services = [
  { number: "01", title: "International Shipping", description: "Move packages reliably across borders.", kind: "international" as const },
  { number: "02", title: "Gift Delivery", description: "Send meaningful gifts to the people who matter.", kind: "gift" as const },
  { number: "03", title: "Gadget Shipping", description: "Reliable handling for phones, tablets and electronics.", kind: "gadget" as const },
  { number: "04", title: "Cargo & Freight", description: "Flexible solutions for larger shipments.", kind: "cargo" as const },
];

export default function Services() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    loadAnimations().then(({ gsap }) => {
      if (disposed || !root.current) return;
      const mm = gsap.matchMedia();
      mm.add({ reduced: "(prefers-reduced-motion: reduce)", full: "(prefers-reduced-motion: no-preference)" }, context => {
        const reduced = context.conditions?.reduced;
        gsap.from(root.current!.querySelector("[data-service-heading]"), { opacity: 0, y: reduced ? 0 : 24, duration: .8, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 83%", once: true } });
        root.current!.querySelectorAll("[data-service-card]").forEach((card, index) => {
          gsap.from(card, { opacity: 0, y: reduced ? 0 : 40, duration: reduced ? .35 : .85, delay: index * .075, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 91%", once: true } });
          if (!reduced) {
            const image = card.querySelector("[data-service-image]");
            if (image) gsap.from(image, { scale: 1.12, duration: 1.5, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 90%", once: true } });
          }
        });
      }, root);
      cleanup = () => mm.revert();
    });
    return () => { disposed = true; cleanup(); };
  }, []);

  return <section ref={root} id="services" className={styles.services} aria-labelledby="services-title">
    <div className={styles.heading} data-service-heading>
      <div><p className="eyebrow"><span className={styles.rule} /> MADE FOR YOUR NEXT MOVE</p><h2 id="services-title">Shipping Made Easy<span>.</span></h2></div>
      <p className={styles.intro}>One connection.<br />More ways to move what matters.</p>
    </div>
    <div className={styles.grid}>{services.map(service => <ServiceCard key={service.kind} {...service} />)}</div>
    <div className={styles.endnote}><span>SOFT XPREXX</span><span>Across borders. Connected by care.</span><a href="#home">Back to top</a></div>
  </section>;
}
