import Link from "next/link";
import { nav, site } from "@/lib/site";
import { IconFacebook, IconInstagram } from "@/components/Icons";

// Footer dal doc di Ilaria: logo + frase, Navigazione, Informazioni, Seguici.
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <img className="footer-logo" src="/brand/logo-ascea-turismo360-bianco.png" alt="Ascea Turismo 360" width={725} height={250} loading="lazy" />
            <p className="footer-claim">{site.footerClaim}</p>
          </div>
          <div>
            <h2>Navigazione</h2>
            <ul>
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href}>{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Informazioni</h2>
            <ul>
              {site.legal.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Seguici</h2>
            <div className="social">
              {/* link da avere: per ora non portano da nessuna parte */}
              <a href={site.social.facebook || "#"} aria-label="Facebook">
                <IconFacebook />
              </a>
              <a href={site.social.instagram || "#"} aria-label="Instagram">
                <IconInstagram />
              </a>
            </div>
            <div className="footer-enti">
              <div className="loghi">
                <img src="/brand/logo-comune.png" alt="Comune di Ascea" loading="lazy" />
                <img src="/brand/logo-ministero.jpg" alt="Ministero dell’Interno" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} {site.name}. Tutti i diritti riservati.<span>|</span>by Qcore Agency
        </div>
      </div>
    </footer>
  );
}
