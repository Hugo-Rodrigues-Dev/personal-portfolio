const portfolioApp = (() => {
  const selectors = {
    navToggle: '[data-nav-toggle]',
    nav: '[data-site-nav]',
    header: '[data-header]',
    navLinks: '.site-nav__link',
    currentYear: '[data-current-year]'
  };

  const state = {
    navOpen: false
  };

  const toggleNavigation = () => {
    const navToggle = document.querySelector(selectors.navToggle);
    const nav = document.querySelector(selectors.nav);

    if (!navToggle || !nav) {
      return;
    }

    const toggleNav = (forceState) => {
      state.navOpen = typeof forceState === 'boolean' ? forceState : !state.navOpen;
      navToggle.classList.toggle('is-active', state.navOpen);
      nav.classList.toggle('is-open', state.navOpen);
      document.body.classList.toggle('nav-open', state.navOpen);
    };

    navToggle.addEventListener('click', () => toggleNav());

    nav.addEventListener('click', (event) => {
      if (event.target.matches(selectors.navLinks)) {
        toggleNav(false);
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && state.navOpen) {
        toggleNav(false);
      }
    });
  };

  const updateCurrentYear = () => {
    const currentYearEl = document.querySelector(selectors.currentYear);
    if (currentYearEl) {
      currentYearEl.textContent = new Date().getFullYear().toString();
    }
  };

  const watchHeaderScroll = () => {
    const header = document.querySelector(selectors.header);
    if (!header) {
      return;
    }

    const onScroll = () => {
      header.classList.toggle('is-stuck', window.scrollY > 24);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  };

  const init = () => {
    toggleNavigation();
    updateCurrentYear();
    watchHeaderScroll();
  };

  return { init };
})();

document.addEventListener('DOMContentLoaded', portfolioApp.init);
