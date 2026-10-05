"use client";

import { PointerEvent, useRef } from "react";
import Image from "next/image";
import { Globe2, Gift, Smartphone, Package } from "lucide-react";
import styles from "./ServiceCard.module.css";

type ServiceCardProps = { number: string; title: string; description: string; kind: "international" | "gift" | "gadget" | "cargo" };
const icons = { international: Globe2, gift: Gift, gadget: Smartphone, cargo: Package };

export default function ServiceCard({ number, title, description, kind }: ServiceCardProps) {
  const card = useRef<HTMLElement>(null);
  const Icon = icons[kind];
  const move = (event: PointerEvent<HTMLElement>) => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    card.current?.style.setProperty("--pointer-x", `${x * 7}px`);
    card.current?.style.setProperty("--pointer-y", `${y * 7}px`);
  };
  const reset = () => { card.current?.style.setProperty("--pointer-x", "0px"); card.current?.style.setProperty("--pointer-y", "0px"); };

  return <article ref={card} className={`${styles.card} ${styles[kind]}`} data-service-card onPointerMove={move} onPointerLeave={reset}>
    {kind === "international" && <div className={styles.imageMask}><Image src="/images/cargo-aircraft.webp" alt="Cargo aircraft connecting shipments across borders" width={1086} height={1448} loading="lazy" sizes="(max-width: 767px) 100vw, 45vw" className={styles.image} data-service-image /><span className={styles.imageLabel}><Globe2 size={15} /> A WORLD WITHIN REACH</span></div>}
    <div className={styles.cardContent}>
      <div className={styles.cardTop}><span className={styles.number}>{number}</span><span className={styles.icon}><Icon size={kind === "gift" ? 34 : 28} strokeWidth={1.45} /></span></div>
      <div className={styles.text}><h3>{title}</h3><p>{description}</p></div>
    </div>
  </article>;
}
