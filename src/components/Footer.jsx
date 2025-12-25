import React from "react";
import { Github, Twitter, Linkedin, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer
      style={{
        marginTop: "auto",
        padding: "2rem",
        backgroundColor: "var(--bg-card)",
        borderTop: "1px solid var(--border-color)",
        color: "var(--text-secondary)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          className="footer-content"
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span>© 2025 Nexus Admin. Made with</span>
            <Heart
              size={16}
              fill="var(--danger-color)"
              color="var(--danger-color)"
            />
            <span>by Team.</span>
          </div>

          <div style={{ display: "flex", gap: "1.5rem" }}>
            <a
              href="#"
              style={{
                color: "var(--text-secondary)",
                transition: "color 0.2s",
              }}
              className="hover:text-primary"
            >
              <Github size={20} />
            </a>
            <a
              href="#"
              style={{
                color: "var(--text-secondary)",
                transition: "color 0.2s",
              }}
              className="hover:text-primary"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              style={{
                color: "var(--text-secondary)",
                transition: "color 0.2s",
              }}
              className="hover:text-primary"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Responsive adjustments handled via CSS if needed, or inline styles for simplicity in this context */}
      <style>{`
        .hover\\:text-primary:hover {
          color: var(--accent-color) !important;
        }
        @media (max-width: 600px) {
          .footer-content {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
