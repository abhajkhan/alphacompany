import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Container } from "./Container";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const FOOTER_LINKS = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  Services: [
    { label: "Product Engineering", href: "/services" },
    { label: "AI Solutions", href: "/services" },
    { label: "Cloud & DevOps", href: "/services" },
    { label: "UI/UX Engineering", href: "/services" },
    { label: "Consulting", href: "/services" },
  ],
  Products: [
    { label: "Our Products", href: "/products" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Engineering Insights", href: "/insights" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X (Twitter)", href: "https://twitter.com" },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background-secondary border-t border-divider-neutral">
      <Container>
        {/* Main grid */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 flex flex-col gap-4">
            {/* Logo */}
            <Link href="/" aria-label="Alpha Company — Home" className="flex items-center gap-2 w-fit">
              <AlphaLogo />
              <span className="font-sans font-semibold text-lg text-text-primary tracking-tight">
                Alpha<span className="text-accent-blue">.</span>
              </span>
            </Link>
            <p className="text-sm text-text-muted font-sans leading-relaxed max-w-[240px]">
              Engineering software products with precision, clarity, and long-term thinking.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="px-2 py-1 text-xs text-text-muted hover:text-text-primary hover:bg-surface rounded-[--radius-sm] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue font-sans"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading} className="flex flex-col gap-4">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted font-sans">
                {heading}
              </h3>
              <ul className="flex flex-col gap-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors font-sans focus:outline-none focus-visible:underline"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-divider-neutral flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted font-sans">
            © {year} Alpha Company. All rights reserved.
          </p>
          <p className="text-xs text-text-muted font-sans">
            Built with precision.
          </p>
        </div>
      </Container>
    </footer>
  );
}

function AlphaLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect width="28" height="28" rx="6" fill="#3B82F6" fillOpacity="0.15" />
      <path d="M14 6L21 21H7L14 6Z" stroke="#3B82F6" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <line x1="9.5" y1="16" x2="18.5" y2="16" stroke="#3B82F6" strokeWidth="1.5" />
    </svg>
  );
}
