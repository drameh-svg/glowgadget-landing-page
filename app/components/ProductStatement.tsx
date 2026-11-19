import Image from "next/image";
import { site } from "@/lib/site";

export function ProductStatement() {
  return (
    <section className="statement">
      <h2>
        {site.statement[0]}
        <br />
        {site.statement[1]}
      </h2>
      <figure className="statementFigure">
        <Image
          src="/images/product-closeup.png"
          alt="Close-up of the silver lock, frosted beads, shackle, and blue orb"
          width={369}
          height={318}
          quality={95}
          sizes="369px"
        />
      </figure>
    </section>
  );
}
