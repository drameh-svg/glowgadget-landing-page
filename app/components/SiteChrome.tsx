import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link className="wordmark" href="/#top" aria-label="Glow Gadget Orbit">
          <span>Glow Gadget</span>
          <span className="divider" aria-hidden="true" />
          <span className="orbit-name">Orbit</span>
        </Link>
        <Link className="nav-cta" href="/#early-access">
          Get early access
        </Link>
      </div>
    </header>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="ig-icon">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <p className="wordmark footer-mark">
            <span>Glow Gadget</span>
            <span className="divider" aria-hidden="true" />
            <span className="orbit-name">Orbit</span>
          </p>
          <p className="footer-tag">Where fashion meets function.</p>
        </div>
        <div className="footer-links">
          <Link href="/privacy">Privacy</Link>
          <a href="#" aria-label="Glow Gadget on Instagram">
            <InstagramIcon />
          </a>
          <p>© 2026 Glow Gadget</p>
        </div>
      </div>
    </footer>
  );
}
