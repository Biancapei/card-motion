
"use client";

const footerColumns = [
  {
    heading: "Platform",
    links: [
      {
        label: "Credit Management",
        href: "#experience",
      },
      {
        label: "Flexible Credit Access",
        href: "#benefits",
      },
      {
        label: "Spending Insights",
        href: "#benefits",
      },
      {
        label: "Smart Repayments",
        href: "#how-it-works",
      },
    ],
  },
  {
    heading: "Explore",
    links: [
      {
        label: "The Card",
        href: "#card",
      },
      {
        label: "Pricing",
        href: "#pricing",
      },
      {
        label: "Testimonials",
        href: "#testimonials",
      },
    ],
  },
  {
    heading: "Information",
    links: [
      {
        label: "About AETHER",
        href: "#home",
      },
      {
        label: "Concept Project",
        href: "#footer-bottom",
      },
      {
        label: "Back to Top",
        href: "#home",
      },
    ],
  },
];

export default function AetherFooter() {
  return (
    <footer
      id="footer"
      className="aether-footer-minimal"
    >
      {/* FOUR-COLUMN EDITORIAL GRID */}
      <div className="aether-footer-grid">

        {/* BRAND COLUMN */}
        <div className="aether-footer-cell">
          <p className="aether-footer-cell-heading">
            A different perspective
          </p>

          <div className="aether-footer-brand-content">
            <a
              href="#home"
              className="aether-footer-small-logo"
              aria-label="AETHER home"
            >
              aether<span>.</span>
            </a>

            <p className="aether-footer-description">
              A different way to
              <br />
              move forward.
            </p>

            <a
              href="#experience"
              className="aether-footer-inline-cta"
            >
              <span>Explore AETHER</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        {/* PLATFORM / EXPLORE / INFORMATION */}
        {footerColumns.map((column) => (
          <div
            key={column.heading}
            className="aether-footer-cell"
          >
            <p className="aether-footer-cell-heading">
              {column.heading}
            </p>

            <nav
              className="aether-footer-cell-links"
              aria-label={`${column.heading} footer links`}
            >
              {column.links.map((link) => (
                <a
                  key={`${column.heading}-${link.label}`}
                  href={link.href}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        ))}
      </div>

      {/* OVERSIZED ANIMATED WORDMARK */}
      <div className="aether-footer-wordmark-clip">
        <div
          className="aether-footer-bigtype"
          aria-label="Aether"
        >
          aether<span>.</span>
        </div>
      </div>

      {/* BOTTOM INFORMATION */}
      <div
        id="footer-bottom"
        className="aether-footer-bottomline"
      >
        <span>© 2026 AETHER</span>

        <span>INDEPENDENT CONCEPT PROJECT</span>

        <a href="#home">
          RETURN TO TOP ↑
        </a>
      </div>
    </footer>
  );
}
