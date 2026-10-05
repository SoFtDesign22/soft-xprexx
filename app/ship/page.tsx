import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ServiceSelection from "./ServiceSelection";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Ship Now — Soft Xprexx",
  description: "Choose to ship a package, send a gift, or shop and send a gift with Soft Xprexx.",
};

export default function ShipPage() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Navbar />
    <main id="main" className={styles.page}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <span className={styles.accent} aria-hidden="true" />
          <h1>What would you like to do?</h1>
          <p>Choose the service that best fits your needs.</p>
        </div>
        <ServiceSelection />
      </div>
    </main>
  </>;
}