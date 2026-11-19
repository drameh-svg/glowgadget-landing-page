import { site } from "@/lib/site";

export function WordmarkSection() {
  return (
    <section className="wordmark" aria-label={site.wordmark}>
      <span className="edgeGlow edgeGlowLeft" aria-hidden="true" />
      <p>{site.wordmark}</p>
      <span className="edgeGlow edgeGlowRight" aria-hidden="true" />
    </section>
  );
}
