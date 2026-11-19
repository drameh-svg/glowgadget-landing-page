import Image from "next/image";
import { site } from "@/lib/site";

export function BrandMoment() {
  return (
    <section className="brand">
      <p className="brandWord" aria-hidden="true">
        <span className="lineGlow">Glow</span>
        <span className="lineGadget">Gadget</span>
      </p>
      <span className="brandGlow" aria-hidden="true" />
      <Image
        className="brandLock"
        src="/images/brand-lock.png"
        alt="Teal Glow Gadget charm"
        width={111}
        height={148}
        quality={95}
        sizes="132px"
      />
      <p className="tagline">{site.brand.tagline}</p>
    </section>
  );
}
