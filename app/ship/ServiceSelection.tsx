"use client";

import { useState } from "react";
import { Package, Gift, ShoppingBag, Check } from "lucide-react";
import styles from "./page.module.css";

const services = [
  {
    id: "package",
    title: "Ship a Package",
    description: "Send your packages and cargo safely to their destination.",
    Icon: Package,
  },
  {
    id: "gift",
    title: "Send a Gift",
    description: "Already have a gift? Let Soft Xprexx handle the delivery.",
    Icon: Gift,
  },
  {
    id: "shop-gift",
    title: "Shop & Send a Gift",
    description: "Tell us what you want. We’ll help you shop for the gift and arrange delivery.",
    Icon: ShoppingBag,
  },
];

export default function ServiceSelection() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedTitle = services.find(service => service.id === selected)?.title;

  return <>
    <div className={styles.cards}>
      {services.map(({ id, title, description, Icon }) => {
        const active = selected === id;
        return <article key={id} className={`${styles.card} ${active ? styles.selected : ""}`} aria-labelledby={`${id}-title`}>
          <div className={styles.cardTop}>
            <span className={styles.icon} aria-hidden="true"><Icon size={30} strokeWidth={1.5} /></span>
            {active && <span className={styles.selectionLabel}><Check size={14} aria-hidden="true" />Selected</span>}
          </div>
          <h2 id={`${id}-title`}>{title}</h2>
          <p>{description}</p>
          <button type="button" className={`button button-cyan ${styles.startButton}`} aria-label={`Get Started: ${title}`} aria-pressed={active} onClick={() => setSelected(id)}>Get Started</button>
        </article>;
      })}
    </div>
    <p className={styles.screenReaderStatus} role="status" aria-live="polite" aria-atomic="true">{selectedTitle ? `${selectedTitle} selected.` : ""}</p>
  </>;
}