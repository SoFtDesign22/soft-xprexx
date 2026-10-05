"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe2 } from "lucide-react";
import { brandLogo } from "@/lib/brand";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const homeAnchor = (id: string) => pathname === "/" ? `#${id}` : `/#${id}`;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [panel, setPanel] = useState<"about" | "contact" | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const dialogTrigger = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (panel) dialog.current?.showModal();
  }, [panel]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) { setMenuOpen(false); menuButton.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    const breakpoint = window.matchMedia("(min-width: 901px)");
    const closeAtDesktop = () => { if (breakpoint.matches) setMenuOpen(false); };
    breakpoint.addEventListener("change", closeAtDesktop);
    return () => breakpoint.removeEventListener("change", closeAtDesktop);
  }, []);

  const openPanel = (value: "about" | "contact") => {
    dialogTrigger.current = menuOpen ? menuButton.current : document.activeElement as HTMLElement;
    setMenuOpen(false); setPanel(value);
  };
  const closePanel = () => dialog.current?.close();
  const onPanelClose = () => { setPanel(null); dialogTrigger.current?.focus(); };

  return <>
    <header className={`${styles.header} ${scrolled ? styles.floating : ""}`}>
      <nav className={styles.nav} aria-label="Main navigation">
         <a href={homeAnchor("home")} className={styles.logo} aria-label="Soft Xprexx home" onClick={() => setMenuOpen(false)}>
          {brandLogo.src ? <span className={styles.logoFrame}><Image src={brandLogo.src} width={brandLogo.width} height={brandLogo.height} alt="Soft Xprexx" priority className={styles.logoImage} /></span> : <span className={styles.logoPending}>Original logo pending</span>}
        </a>
        <div className={styles.links}>
           <a href={homeAnchor("services")}>Services</a>
          <a href={homeAnchor("tracking")}>Track</a>
          <button type="button" onClick={() => openPanel("about")}>About</button>
          <button type="button" onClick={() => openPanel("contact")}>Contact</button>
        </div>
        <div className={styles.actions}>
           <a href={homeAnchor("tracking")} className={styles.track}>Track Shipment</a>
          <Link href="/ship/" className="button button-cyan" aria-current={pathname.replace(/\/$/, "") === "/ship" ? "page" : undefined}>Ship Now</Link>
        </div>
        <button ref={menuButton} className={styles.menuButton} type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
      </nav>
      {menuOpen && <div id="mobile-menu" className={styles.mobileMenu}>
       <a href={homeAnchor("services")} onClick={() => setMenuOpen(false)}>Services</a>
        <a href={homeAnchor("tracking")} onClick={() => setMenuOpen(false)}>Track Shipment</a>
        <button type="button" onClick={() => openPanel("about")}>About</button>
        <button type="button" onClick={() => openPanel("contact")}>Contact</button>
      </div>}
    </header>
    <dialog ref={dialog} className={styles.dialog} aria-labelledby="information-title" onClose={onPanelClose} onClick={event => { if (event.target === dialog.current) closePanel(); }}>
      <button type="button" className={styles.close} aria-label="Close information" onClick={closePanel}><X size={22} /></button>
      <Globe2 size={28} className={styles.dialogIcon} />
      <p className="eyebrow">Soft Xprexx</p>
      <h2 id="information-title">{panel === "about" ? "Moving what matters." : "Let’s make your next move."}</h2>
      <p>{panel === "about" ? "Fast, reliable shipping, cargo and gift delivery built to make moving what matters easier. One connection. More ways to move what matters." : "Contact information will be available soon. In the meantime, find the right service for your shipment."}</p>
       <a href={homeAnchor("services")} className="button button-cyan" onClick={closePanel}>Explore services</a>
    </dialog>
  </>;
}
