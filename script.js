/**
 * LUCKY PRIME GENTS SALON L.L.C — Interactive Client Logic
 * Handles Navigation, Smooth Scrolling, Scroll Reveals, and Fresha Booking Modal
 */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // Elements
  const header = document.getElementById("site-header");
  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");
  const revealElements = document.querySelectorAll(".reveal");

  // Fresha Modal Elements
  const freshaModal = document.getElementById("fresha-modal");
  const modalBackdrop = document.getElementById("modal-backdrop");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalIframe = document.getElementById("fresha-modal-iframe");
  const modalLoader = document.getElementById("modal-loader");
  const openModalButtons = document.querySelectorAll(".open-fresha-modal");
  const sectionIframe = document.getElementById("fresha-section-iframe");
  const reloadBtn = document.getElementById("fresha-reload");

  /* ------------------------------------------------------------------------
     1. Header State on Scroll
     ------------------------------------------------------------------------ */
  const handleScroll = () => {
    const isScrolled = window.scrollY > 30;
    header.classList.toggle("scrolled", isScrolled);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  /* ------------------------------------------------------------------------
     2. Mobile Navigation Drawer
     ------------------------------------------------------------------------ */
  const toggleMobileMenu = (forceState) => {
    const isOpen = typeof forceState === "boolean" ? forceState : !mainNav.classList.contains("open");
    mainNav.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  };

  menuToggle?.addEventListener("click", () => toggleMobileMenu());

  // Close mobile drawer when clicking a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mainNav.classList.contains("open")) {
        toggleMobileMenu(false);
      }
    });
  });

  // Close mobile drawer when clicking outside
  document.addEventListener("click", (e) => {
    if (
      mainNav.classList.contains("open") &&
      !mainNav.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      toggleMobileMenu(false);
    }
  });

  /* ------------------------------------------------------------------------
     3. Active Navigation Highlighting on Scroll
     ------------------------------------------------------------------------ */
  const updateActiveNavLink = () => {
    const scrollPosition = window.scrollY + 200;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  };

  window.addEventListener("scroll", updateActiveNavLink, { passive: true });

  /* ------------------------------------------------------------------------
     4. Scroll Reveal Animations (Intersection Observer)
     ------------------------------------------------------------------------ */
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    revealElements.forEach((el) => el.classList.add("visible"));
  } else if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -60px 0px",
        threshold: 0.08,
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("visible"));
  }

  /* ------------------------------------------------------------------------
     5. Fresha Dedicated Booking Modal Logic
     ------------------------------------------------------------------------ */
  const openFreshaModal = (serviceName = "") => {
    if (!freshaModal) return;

    // Lazy load iframe on first open
    if (modalIframe && !modalIframe.src && modalIframe.dataset.src) {
      modalIframe.src = modalIframe.dataset.src;

      modalIframe.addEventListener("load", () => {
        if (modalLoader) {
          modalLoader.style.opacity = "0";
          setTimeout(() => {
            modalLoader.style.display = "none";
          }, 300);
        }
      });
    }

    freshaModal.classList.add("is-active");
    freshaModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    // Auto-focus close button for accessibility
    setTimeout(() => modalCloseBtn?.focus(), 100);
  };

  const closeFreshaModal = () => {
    if (!freshaModal) return;
    freshaModal.classList.remove("is-active");
    freshaModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  openModalButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const service = btn.dataset.serviceName || "";
      openFreshaModal(service);
    });
  });

  modalCloseBtn?.addEventListener("click", closeFreshaModal);
  modalBackdrop?.addEventListener("click", closeFreshaModal);

  // Close modal on Escape key press
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && freshaModal?.classList.contains("is-active")) {
      closeFreshaModal();
    }
  });

  /* ------------------------------------------------------------------------
     6. Fresha Section Embed Reload Helper
     ------------------------------------------------------------------------ */
  reloadBtn?.addEventListener("click", () => {
    if (sectionIframe) {
      const currentSrc = sectionIframe.src;
      sectionIframe.src = "about:blank";
      setTimeout(() => {
        sectionIframe.src = currentSrc;
      }, 100);
    }
  });
});
