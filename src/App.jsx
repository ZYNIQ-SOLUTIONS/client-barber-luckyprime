import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  Check,
  Clock,
  EnvelopeSimple,
  InstagramLogo,
  List,
  MapPin,
  Phone,
  Scissors,
  Sparkle,
  TiktokLogo,
  WhatsappLogo,
  X,
} from "@phosphor-icons/react";
import { CutRitual } from "./CutRitual";
import { DubaiMeridian } from "./DubaiMeridian";
import { BarberChairScene } from "./BarberChairScene";
import { siteConfig } from "./siteConfig";

const smallImage = (src) => src.replace(".webp", "-sm.webp");

const navItems = [
  ["Work", "#work"],
  ["Ritual", "#ritual"],
  ["Services", "#services"],
  ["About", "#about"],
  ["Location", "#location"],
  ["Contact", "#contact"],
];

function usePageMotion() {
  const [scrolled, setScrolled] = useState(false);
  const [heroOffset, setHeroOffset] = useState(0);
  const [contactReached, setContactReached] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        const contact = document.getElementById("contact");
        setScrolled(y > 32);
        setHeroOffset(Math.min(y * 0.08, 64));
        setContactReached(Boolean(contact && y + window.innerHeight * 0.62 >= contact.offsetTop));
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return { scrolled, heroOffset, contactReached };
}

function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll("[data-reveal]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((node) => node.setAttribute("data-visible", "true"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10%", threshold: 0.06 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function Navbar({ scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a className="wordmark" href="#top" aria-label="Lucky Prime Gents Salon Home">
        <img className="wordmark__emblem" src={siteConfig.images.logo} alt="Lucky Prime Logo" width="38" height="38" />
        <div className="wordmark__titles">
          <span className="wordmark-main">{siteConfig.name}</span>
          <span className="wordmark-sub" lang="ar" dir="rtl">{siteConfig.arabicName}</span>
        </div>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map(([label, href]) => (
          <a href={href} key={href}>{label}</a>
        ))}
        <a
          className="nav-book"
          href={siteConfig.freshaUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Book on Fresha"
        >
          Book Online
        </a>
      </nav>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={24} /> : <List size={26} />}
      </button>
      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} id="mobile-menu">
        <div className="mobile-menu__header">
          <div className="wordmark">
            <img className="wordmark__emblem" src={siteConfig.images.logo} alt="Lucky Prime Logo" width="40" height="40" />
            <div className="wordmark__titles">
              <span className="wordmark-main">{siteConfig.name}</span>
              <span className="wordmark-sub" lang="ar" dir="rtl">{siteConfig.arabicName}</span>
            </div>
          </div>
          <button
            className="mobile-menu__close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav aria-label="Mobile navigation">
          {navItems.map(([label, href], index) => (
            <a href={href} key={href} onClick={() => setMenuOpen(false)}>
              <span>0{index + 1}</span>{label}
            </a>
          ))}
        </nav>

        <div className="mobile-menu-actions">
          <a
            className="button button--sand button--mobile-action"
            href={siteConfig.freshaUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            <CalendarCheck size={18} />
            Book on Fresha
          </a>
          <a
            className="button button--whatsapp-green button--mobile-action"
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            <WhatsappLogo size={18} weight="fill" />
            WhatsApp Inquiry
          </a>
          <a
            className="button button--outline button--mobile-action"
            href={`tel:${siteConfig.phoneNumber}`}
            onClick={() => setMenuOpen(false)}
          >
            <Phone size={18} />
            Call {siteConfig.phoneDisplay}
          </a>
        </div>

        <div className="mobile-menu-footer">
          <p className="mobile-menu-hours"><Clock size={14} /> {siteConfig.hours}</p>
          <p className="mobile-menu-meta">{siteConfig.address}</p>
        </div>
      </div>
    </header>
  );
}

function Hero({ offset }) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__rail">
        <div className="hero__copy hero-reveal">
          <p className="eyebrow">
            {siteConfig.tagline} — {siteConfig.location}
          </p>
          <p className="hero__statement">
            Precision.<br />Style.<br />Identity.
          </p>
          <div className="hero__badges">
            <span className="hero__badge"><Clock size={13} /> {siteConfig.hours}</span>
            <span className="hero__badge"><MapPin size={13} /> Meydan, Dubai</span>
          </div>
          <div className="hero__buttons">
            <a
              className="button button--sand"
              href={siteConfig.freshaUrl}
              target="_blank"
              rel="noreferrer"
            >
              <CalendarCheck size={18} />
              Book on Fresha
            </a>
            <a
              className="button button--outline"
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsappLogo size={18} weight="fill" />
              WhatsApp Us
            </a>
          </div>
        </div>
        <a className="scroll-cue" href="#work">
          <ArrowDown size={24} aria-hidden="true" />
          <span>Scroll to discover</span>
        </a>
      </div>
      <div className="hero__media" style={{ "--hero-offset": `${offset}px` }}>
        <video
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={siteConfig.images.hero}
          aria-hidden="true"
        >
          <source src={siteConfig.images.heroVideo} type="video/mp4" />
        </video>
        <img
          className="hero__poster"
          src={siteConfig.images.hero}
          srcSet={`${smallImage(siteConfig.images.hero)} 720w, ${siteConfig.images.hero} 2048w`}
          sizes="100vw"
          alt="Master barber crafting precision fade at Lucky Prime Gents Salon"
          width="1280"
          height="720"
          fetchPriority="high"
        />
        <div className="hero__shade" />
      </div>
      <h1 className="hero__name" id="hero-title" aria-label="Lucky Prime">
        {siteConfig.name}
      </h1>
      <div className="hero__index" aria-hidden="true">
        MEYDAN — {siteConfig.coordinates.lat}
      </div>
    </section>
  );
}

function WorkGallery() {
  return (
    <section className="work section-dark" id="work" aria-labelledby="work-title">
      <div className="section-kicker" data-reveal>
        <span>01</span>
        <h2 id="work-title">Selected work</h2>
        <p>A study in shape, texture, and finish at Lucky Prime.</p>
      </div>
      <div className="work-grid">
        {siteConfig.work.map((item, index) => (
          <figure className={`work-card work-card--${index + 1}`} key={item.src} data-reveal>
            <div className="work-card__image">
              <img
                src={item.src}
                srcSet={`${smallImage(item.src)} 720w, ${item.src} ${item.width}w`}
                sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 40vw"
                alt={item.alt}
                loading="lazy"
                width={item.width}
                height={item.height}
              />
            </div>
            <figcaption>
              <span>0{index + 1}</span>
              {item.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="services" id="services" aria-labelledby="services-title">
      <div className="section-kicker section-kicker--services" data-reveal>
        <span>03</span>
        <h2 id="services-title">Signature Menu</h2>
        <p>Tailored rituals. Tap any service to reserve your chair on Fresha.</p>
      </div>
      <div className="services-list">
        {siteConfig.services.map((service, index) => (
          <a
            className="service-row"
            href={siteConfig.freshaUrl}
            target="_blank"
            rel="noreferrer"
            key={service.name}
            data-reveal
            aria-label={`Book ${service.name} on Fresha for ${service.price}`}
          >
            <span className="service-row__number">0{index + 1}</span>
            <div className="service-row__main">
              <div className="service-row__name-wrap">
                <span className="service-row__name">{service.name}</span>
                {service.featured && <span className="service-row__tag">Featured</span>}
              </div>
              <p className="service-row__desc">{service.desc}</p>
            </div>
            <div className="service-row__meta">
              <span className="service-row__price">{service.price}</span>
              <span className="service-row__arrow-wrap">
                <span className="service-row__cta-text">Book</span>
                <ArrowRight className="service-row__arrow" size={24} weight="regular" aria-hidden="true" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about section-dark" id="about" aria-labelledby="about-title">
      <div className="container about__container" data-reveal>
        <div className="about__header">
          <p className="eyebrow">The Experience /</p>
          <h2 id="about-title">{siteConfig.fullName}</h2>
          <p className="about__role">
            {siteConfig.role} — {siteConfig.location}
          </p>
        </div>

        <div className="about__body-grid">
          <div className="about__text-col">
            <p className="about__lead">
              Step into an exclusive gentlemen's sanctuary in Meydan, Dubai. Lucky Prime Gents Salon was founded on a singular standard: delivering impeccable precision barbering with contemporary executive luxury.
            </p>
            <p className="about__subtext">
              Every appointment is treated as an individualized craft ritual. Whether you are coming in for a razor-sharp skin fade, artisanal beard sculpting with eucalyptus hot towel therapy, or an invigorating VIP charcoal facial, our seasoned master barbers tailor each detail to complement your facial structure, lifestyle, and personal aesthetic.
            </p>
          </div>

          <div className="about__text-col">
            <p className="about__subtext">
              Located conveniently in Azizi Riviera (Building No. 48, Meydan), our salon provides a tranquil retreat from the city's fast pace. From high-grade Japanese steel shears and premium organic grooming formulations to serene hospitality, we have created an atmosphere where you can relax, recharge, and step out looking your sharpest.
            </p>
            <div className="about__metrics">
              <div className="about__metric-item">
                <span className="about__metric-num">100%</span>
                <span className="about__metric-lbl">Tailored Grooming</span>
              </div>
              <div className="about__metric-item">
                <span className="about__metric-num">7 Days</span>
                <span className="about__metric-lbl">10 AM – 11 PM</span>
              </div>
              <div className="about__metric-item">
                <span className="about__metric-num">VIP</span>
                <span className="about__metric-lbl">Private Attention</span>
              </div>
            </div>
          </div>
        </div>

        <div className="about__features">
          <div className="about__feature-item">
            <Scissors size={24} />
            <div>
              <strong>Master Artisans</strong>
              <span>Decades of precision scissor and razor mastery</span>
            </div>
          </div>
          <div className="about__feature-item">
            <Sparkle size={24} />
            <div>
              <strong>Luxury Ambiance</strong>
              <span>A refined masculine space designed to unwind</span>
            </div>
          </div>
          <div className="about__feature-item">
            <Clock size={24} />
            <div>
              <strong>Punctual VIP Service</strong>
              <span>Seamless online booking with zero waiting</span>
            </div>
          </div>
        </div>

        <div className="about__actions">
          <a
            className="button button--sand"
            href={siteConfig.freshaUrl}
            target="_blank"
            rel="noreferrer"
          >
            <CalendarCheck size={18} />
            Reserve on Fresha
          </a>
          <a className="button button--outline" href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer">
            <WhatsappLogo size={18} weight="fill" />
            WhatsApp Inquiry
          </a>
        </div>
      </div>
    </section>
  );
}

function PrecisionArtifact() {
  return (
    <section className="precision-artifact" aria-label="Interactive barber chair 3D experience">
      <div className="container precision-artifact__inner" data-reveal>
        <div className="precision-artifact__text">
          <p className="eyebrow">Craft &amp; Space /</p>
          <h2>The Artifact.</h2>
          <p>
            An interactive three-dimensional study in poise, balance, and the ceremonial seat of grooming.
          </p>
        </div>
        <div className="precision-artifact__canvas-wrap">
          <BarberChairScene fallback={siteConfig.images.detail} />
        </div>
      </div>
    </section>
  );
}

function ImageBreak() {
  return (
    <section className="image-break" aria-label="The details make the difference">
      <img
        src={siteConfig.images.detail}
        srcSet={`${smallImage(siteConfig.images.detail)} 720w, ${siteConfig.images.detail} 2048w`}
        sizes="100vw"
        alt="Close-up precision clipper work"
        loading="lazy"
        width="2048"
        height="1152"
      />
      <div className="image-break__shade" />
      <p data-reveal>
        The details<br />
        make the difference.
      </p>
      <span aria-hidden="true">04 — CRAFT</span>
    </section>
  );
}

function LocationSection() {
  return (
    <section className="location-section section-dark" id="location" aria-labelledby="location-title">
      <div className="container location-grid" data-reveal>
        <div className="location-info">
          <p className="eyebrow">Visit the Salon /</p>
          <h2 id="location-title">Azizi Riviera, Meydan</h2>
          <p className="location-desc">
            Located in the heart of Meydan Dubai, Lucky Prime Gents Salon offers private parking and a discrete, refined setting for your grooming appointments.
          </p>
          <div className="location-meta-list">
            <div className="location-meta-item">
              <MapPin size={22} />
              <div>
                <strong>Location &amp; Address</strong>
                <span>{siteConfig.address}</span>
              </div>
            </div>
            <div className="location-meta-item">
              <Clock size={22} />
              <div>
                <strong>Working Hours</strong>
                <span>{siteConfig.hours}</span>
              </div>
            </div>
            <div className="location-meta-item">
              <Phone size={22} />
              <div>
                <strong>Direct Line</strong>
                <a href={`tel:${siteConfig.phoneNumber}`}>{siteConfig.phoneDisplay}</a>
              </div>
            </div>
          </div>
          <div className="location-actions">
            <a
              className="button button--sand"
              href={siteConfig.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              <MapPin size={18} />
              Google Maps Directions
            </a>
          </div>
        </div>

        <div className="location-map">
          <iframe
            className="map-frame"
            src="https://maps.google.com/maps?q=25.1764,55.3093&hl=en&z=15&output=embed"
            title="Lucky Prime Gents Salon Location Map"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact__title" data-reveal>
        <p className="eyebrow">Luxury Gents Salon — UAE</p>
        <h2 id="contact-title">
          Based in<br />
          Meydan, Dubai.
        </h2>
      </div>
      <div className="contact__actions" data-reveal>
        <p>Ready when you are.</p>
        <a
          className="contact-link"
          href={siteConfig.freshaUrl}
          target="_blank"
          rel="noreferrer"
        >
          <CalendarCheck size={28} />
          <span>Book on Fresha</span>
          <ArrowRight size={34} weight="thin" />
        </a>
        <a className="contact-link" href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer">
          <WhatsappLogo size={28} weight="fill" />
          <span>WhatsApp Inquiry</span>
          <ArrowRight size={34} weight="thin" />
        </a>
        <a className="contact-link contact-link--phone" href={`tel:${siteConfig.phoneNumber}`}>
          <Phone size={28} />
          <span>{siteConfig.phoneDisplay}</span>
        </a>
        <div className="contact-socials">
          <a href={siteConfig.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
            <InstagramLogo size={22} />
          </a>
          <a href={siteConfig.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok">
            <TiktokLogo size={22} />
          </a>
          <a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp">
            <WhatsappLogo size={22} weight="fill" />
          </a>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="final-cta section-dark" aria-labelledby="final-title">
      <div data-reveal>
        <p className="eyebrow">Azizi Riviera · Meydan, Dubai</p>
        <h2 id="final-title">
          Ready for<br />
          a fresh cut?
        </h2>
      </div>
      <div className="final-cta__actions">
        <a
          className="button button--sand button--large"
          href={siteConfig.freshaUrl}
          target="_blank"
          rel="noreferrer"
        >
          <CalendarCheck size={20} />
          Reserve on Fresha
        </a>
        <a
          className="button button--cream button--large"
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noreferrer"
        >
          <WhatsappLogo size={20} weight="fill" />
          Book via WhatsApp
        </a>
      </div>
    </section>
  );
}

function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);
  return (
    <footer className="footer section-dark">
      <div className="footer__brand-wrap">
        <a className="wordmark" href="#top">
          <img className="wordmark__emblem footer__emblem" src={siteConfig.images.logo} alt="Lucky Prime Logo" width="46" height="46" />
          <div className="wordmark__titles">
            <span className="wordmark-main">{siteConfig.name}</span>
            <span className="footer__arabic" lang="ar" dir="rtl">{siteConfig.arabicName}</span>
          </div>
        </a>
      </div>
      <p>
        {siteConfig.role} — {siteConfig.address}
      </p>
      <div className="footer__socials">
        <a href={siteConfig.instagram} target="_blank" rel="noreferrer">Instagram</a>
        <span>·</span>
        <a href={siteConfig.tiktok} target="_blank" rel="noreferrer">TikTok</a>
        <span>·</span>
        <a href={`tel:${siteConfig.phoneNumber}`}>{siteConfig.phoneDisplay}</a>
      </div>
      <p>© {year} {siteConfig.fullName}. All Rights Reserved.</p>
    </footer>
  );
}

export function App() {
  const { scrolled, heroOffset, contactReached } = usePageMotion();
  useReveal();

  return (
    <>
      <Navbar scrolled={scrolled} />
      <main>
        <Hero offset={heroOffset} />
        <WorkGallery />
        <CutRitual />
        <DubaiMeridian />
        <Services />
        <About />
        <PrecisionArtifact />
        <ImageBreak />
        <LocationSection />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />

      {/* Floating Action Quick Bar */}
      <div
        className={`floating-actions ${scrolled && !contactReached ? "is-visible" : ""}`}
        aria-hidden={!scrolled || contactReached}
      >
        <a
          className="floating-btn floating-btn--fresha"
          href={siteConfig.freshaUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Book on Fresha"
        >
          <CalendarCheck size={20} />
          <span>Book on Fresha</span>
        </a>
        <a
          className="floating-btn floating-btn--whatsapp"
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <WhatsappLogo size={24} weight="fill" />
        </a>
      </div>
    </>
  );
}
