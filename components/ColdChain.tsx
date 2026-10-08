import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Snowflake, Truck, ThermometerSnowflake } from "lucide-react";
import { brandLogo } from "@/lib/brand";
import { coldChainMedia } from "@/lib/coldChainMedia";
import styles from "./ColdChain.module.css";

/**
 * Cold-chain photography is intentionally separated from the main service grid.
 * The truck remains illustrative until the user supplies the final branded truck.
 */
export default function ColdChain() {
  return (
    <section id="cold-chain" className={styles.section} aria-labelledby="cold-chain-title">
      <div className={styles.intro}>
        <p className={styles.eyebrow}><Snowflake size={17} aria-hidden="true" /> COLD CHAIN COURIERS</p>
        <h2 id="cold-chain-title">Cold Room <span>&</span><br />Refrigeration</h2>
        <p className={styles.description}>
          Explore cold-storage and temperature-controlled shipping options
          for goods that need additional care along the way.
        </p>
        <div className={styles.highlights} aria-label="Cold chain areas of interest">
          <span><ThermometerSnowflake size={17} aria-hidden="true" /> Cold room storage</span>
          <span><Truck size={17} aria-hidden="true" /> Refrigerated transport enquiries</span>
        </div>
        <Link href="/ship/" className="button button-cyan">
          Explore shipping options <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>

      <div className={styles.gallery} aria-label="Cold chain image gallery">
        <figure className={styles.roomCard}>
          <div className={styles.imageWrap}>
            <Image
              src={coldChainMedia.coldRoom.src}
              alt={coldChainMedia.coldRoom.alt}
              width={1200}
              height={800}
              sizes="(max-width: 760px) 100vw, 36vw"
              className={styles.photo}
              loading="lazy"
              unoptimized
            />
          </div>
          <figcaption><span>01 / COLD STORAGE</span><strong>Large cold rooms</strong></figcaption>
        </figure>

        <figure className={styles.truckCard}>
          <div className={styles.imageWrap}>
            <Image
              src={coldChainMedia.truck.src}
              alt={coldChainMedia.truck.alt}
              width={1200}
              height={800}
              sizes="(max-width: 760px) 100vw, 36vw"
              className={styles.photo}
              loading="lazy"
              unoptimized
            />
            {brandLogo.src && (
              <div className={styles.truckBrand} aria-label="Soft Xprexx branding preview">
                <span className={styles.brandCrop}>
                  <Image src={brandLogo.src} alt="" width={brandLogo.width} height={brandLogo.height} className={styles.brandImage} aria-hidden="true" />
                </span>
                <span className={styles.brandName}>SOFT XPREXX</span>
              </div>
            )}
          </div>
          <figcaption><span>02 / FLEET CONCEPT</span><strong>Delivery fleet inspiration</strong></figcaption>
        </figure>
        <p className={styles.mediaNote}>
          Illustrative photography. The temporary truck image can be replaced with the final Soft Xprexx truck design.
        </p>
      </div>
    </section>
  );
}
