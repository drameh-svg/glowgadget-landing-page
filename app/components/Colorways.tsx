import Image from "next/image";
import { site } from "@/lib/site";

export function Colorways() {
  return (
    <section className="colorways" aria-labelledby="colorways-heading">
      <Image
        className="colorwaysImg"
        src="/images/colorways.png"
        alt=""
        width={369}
        height={213}
        quality={95}
        sizes="369px"
      />
      <h2 id="colorways-heading" className="clip">
        {site.colorways.heading.map((line) => (
          <span key={line}>
            {line}
            <br />
          </span>
        ))}
      </h2>
      <ul className="swatches clip">
        {site.colorways.swatches.map((swatch) => (
          <li key={swatch.id} className={`swatch-${swatch.id}`}>
            {swatch.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
