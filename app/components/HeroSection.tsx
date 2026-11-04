import Image from "next/image";
import { site } from "@/lib/site";

export function HeroSection() {
  const { hero } = site;

  return (
    <header className="hero">
      <a className="logo" href="#top" aria-label="Glow Gadget" />
      <div className="pills" aria-hidden="true">
        <span className="pill" />
        <span className="pill" />
        <span className="pill" />
      </div>
      <Image
        className="heroLock"
        src="/images/hero-lock.png"
        alt="Teal Glow Gadget lock charm"
        width={143}
        height={192}
        quality={95}
        priority
        sizes="148px"
      />
      <div className="heroCopy">
        <h1>
          {hero.title.map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
        </h1>
        <p>
          {hero.body[0]}
          <br />
          {hero.body[1]}
        </p>
        <a className="rsvp" href="#early-access">
          {hero.cta}
        </a>
      </div>
    </header>
  );
}
