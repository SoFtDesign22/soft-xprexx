"use client";

import { FormEvent, useRef, useState } from "react";
import { ScanLine } from "lucide-react";
import styles from "./TrackingBar.module.css";

type TrackingBarProps = { onTrack?: (trackingNumber: string) => Promise<string> | string };

export default function TrackingBar({ onTrack }: TrackingBarProps) {
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = number.trim();
    if (!value) { setError(true); setMessage("Enter a tracking number to continue."); input.current?.focus(); return; }
    if (!/^[a-zA-Z0-9 -]{4,40}$/.test(value)) { setError(true); setMessage("Use 4–40 letters or numbers, with spaces or hyphens if needed."); input.current?.focus(); return; }
    setError(false);
    setLoading(true);
    try {
      setMessage(onTrack ? await onTrack(value) : `Tracking number ${value} is ready to look up. Live shipment tracking will be available soon.`);
    } catch { setError(true); setMessage("We couldn’t check that shipment. Please try again."); }
    finally { setLoading(false); }
  };

  return <div id="tracking" className={styles.wrapper}>
    <form className={styles.bar} onSubmit={submit} noValidate>
      <div className={styles.labelGroup}><span className={styles.icon}><ScanLine size={25} strokeWidth={1.6} /></span><label htmlFor="tracking-number">Track your shipment<span>Every journey, within reach.</span></label></div>
      <div className={styles.field}><input ref={input} id="tracking-number" name="trackingNumber" type="text" value={number} onChange={event => { setNumber(event.target.value); if (message) { setMessage(""); setError(false); } }} placeholder="Enter tracking number" autoComplete="off" spellCheck={false} maxLength={40} aria-invalid={error} aria-describedby={message ? "tracking-status" : undefined} /><button type="submit" className={styles.submit} disabled={loading}>{loading ? "Checking…" : "Track"}</button></div>
    </form>
    {message && <p id="tracking-status" className={`${styles.status} ${error ? styles.error : ""}`} role={error ? "alert" : "status"}>{message}</p>}
  </div>;
}
