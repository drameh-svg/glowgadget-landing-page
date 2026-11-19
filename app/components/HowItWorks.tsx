import Image from "next/image";
import { site } from "@/lib/site";

export function HowItWorks() {
  return (
    <section className="how" aria-labelledby="how-heading">
      <h2 id="how-heading">{site.howItWorks.heading}</h2>
      <ol className="steps">
        {site.howItWorks.steps.map((step) => (
          <li key={step.n} className={`step step${step.n}`}>
            <Image
              className="stepImg"
              src={step.image}
              alt={step.alt}
              width={step.width}
              height={step.height}
              quality={95}
              sizes={`${step.width}px`}
            />
            <span className={`num num${step.n}`} aria-hidden="true">
              {step.n}
            </span>
            <p className={`stepCopy copy${step.n}`}>
              {step.lines[0]}
              <br />
              {step.lines[1]}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
