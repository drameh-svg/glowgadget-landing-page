import Image from "next/image";
import { site } from "@/lib/site";

export function CustomizationSection() {
  return (
    <section className="custom">
      <h2>
        {site.custom.heading[0]}
        <br />
        {site.custom.heading[1]}
      </h2>
      <figure className="customFigure">
        <Image
          className="customImg"
          src="/images/custom.png"
          alt="Hand holding the pink Glow Gadget with extra frosted beads"
          width={288}
          height={170}
          quality={95}
          sizes="300px"
        />
      </figure>
    </section>
  );
}
