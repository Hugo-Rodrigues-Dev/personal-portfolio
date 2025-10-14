const portfolioApp = (() => {
  const selectors = {
    navToggle: '[data-nav-toggle]',
    nav: '[data-site-nav]',
    header: '[data-header]',
    navLinks: '.site-nav__link',
    currentYear: '[data-current-year]',
    tiltCard: '[data-tilt-card]',
    reveal: '[data-reveal]'
  };

  const state = {
    navOpen: false,
    prefersReducedMotion: window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : { matches: false }
  };

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const lerp = (start, end, amount) => start + (end - start) * amount;
  const shouldReduceMotion = () => Boolean(state.prefersReducedMotion?.matches);

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
      const link = event.target.closest(selectors.navLinks);
      if (link) {
        document.querySelectorAll(selectors.navLinks).forEach((navLink) => {
          navLink.classList.toggle('is-active', navLink === link);
        });
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

  const initHeroBot = () => {
    if (shouldReduceMotion()) {
      return;
    }

    const bot = document.querySelector('[data-hero-bot]');
    if (!bot) {
      return;
    }

    const head = bot.querySelector('[data-hero-head]');
    const antenna = bot.querySelector('[data-hero-antenna]');
    const eyes = bot.querySelectorAll('[data-hero-eye]');
    const buttons = bot.querySelectorAll('[data-panel-button]');
    const leftArm = bot.querySelector('.hero-bot__arm--left');
    const rightArm = bot.querySelector('.hero-bot__arm--right');

    if (!head || !antenna || eyes.length < 2 || !leftArm || !rightArm) {
      return;
    }

    const maxEyeOffset = 12;
    const maxTilt = 6;
    const state = {
      normX: 0,
      normY: 0,
      targetNormX: 0,
      targetNormY: 0,
      isVisible: false
    };

    const update = () => {
      const smoothing = state.isVisible ? 0.18 : 0.12;
      state.normX += (state.targetNormX - state.normX) * smoothing;
      state.normY += (state.targetNormY - state.normY) * smoothing;

      const eyeOffsetX = state.normX * maxEyeOffset;
      const eyeOffsetY = state.normY * maxEyeOffset;
      const tiltX = clamp(state.normY * maxTilt, -maxTilt, maxTilt);
      const tiltY = clamp(-state.normX * maxTilt, -maxTilt, maxTilt);

      eyes.forEach((eye) => {
        eye.style.transform = `translate3d(${eyeOffsetX}px, ${eyeOffsetY}px, 0)`;
      });
      head.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

      requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          state.isVisible = entry.isIntersecting;
          if (!state.isVisible) {
            state.targetNormX = 0;
            state.targetNormY = 0;
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(bot);
    update();

    const handlePointer = (event) => {
      if (!state.isVisible) {
        return;
      }

      const rect = bot.getBoundingClientRect();
      const x = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      state.targetNormX = clamp(x, -1, 1);
      state.targetNormY = clamp(y, -1, 1);
    };

    const resetPointer = () => {
      state.targetNormX = 0;
      state.targetNormY = 0;
    };

    window.addEventListener('pointermove', handlePointer, { passive: true });
    window.addEventListener('pointerdown', handlePointer, { passive: true });
    window.addEventListener('pointerleave', resetPointer);
    window.addEventListener('blur', resetPointer);
    window.addEventListener('resize', resetPointer);
    window.addEventListener('pointercancel', resetPointer);

    const setArmsState = ({ raiseLeft = false, raiseRight = false } = {}) => {
      leftArm.classList.toggle('is-raised', raiseLeft);
      rightArm.classList.toggle('is-raised', raiseRight);
    };

    const setAntennaAlert = (isActive) => {
      if (isActive) {
        bot.classList.add('is-alert');
        antenna.classList.add('is-alert');
        return;
      }
      bot.classList.remove('is-alert');
      antenna.classList.remove('is-alert');
    };

    antenna.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      if (event.pointerId !== undefined && antenna.setPointerCapture) {
        try {
          antenna.setPointerCapture(event.pointerId);
        } catch (error) {
          // pointer capture may fail on some browsers; ignore
        }
      }
      setAntennaAlert(true);
    });
    antenna.addEventListener('pointerleave', () => setAntennaAlert(false));
    antenna.addEventListener('pointerup', () => setAntennaAlert(false));
    antenna.addEventListener('pointercancel', () => setAntennaAlert(false));
    antenna.addEventListener('blur', () => setAntennaAlert(false));
    antenna.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setAntennaAlert(true);
      }
    });
    antenna.addEventListener('keyup', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        setAntennaAlert(false);
      }
    });

    buttons.forEach((button) => {
      button.addEventListener('pointerenter', () => button.classList.add('is-hovered'));
      button.addEventListener('pointerleave', () => {
        button.classList.remove('is-hovered');
        button.classList.remove('is-active');
        setArmsState();
      });
      button.addEventListener('pointerdown', (event) => {
        event.preventDefault();
        button.classList.add('is-hovered');
        button.classList.add('is-active');
        const action = button.dataset.panelButton;
        if (action === 'center') {
          setArmsState({ raiseLeft: true, raiseRight: true });
        } else if (action === 'left') {
          setArmsState({ raiseRight: true });
        } else if (action === 'right') {
          setArmsState({ raiseLeft: true });
        }
      });
      button.addEventListener('pointerup', () => {
        button.classList.remove('is-active');
        setArmsState();
      });
      button.addEventListener('pointercancel', () => {
        button.classList.remove('is-active');
        setArmsState();
      });
      button.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          button.classList.add('is-active');
          const action = button.dataset.panelButton;
          if (action === 'center') {
            setArmsState({ raiseLeft: true, raiseRight: true });
          } else if (action === 'left') {
            setArmsState({ raiseRight: true });
          } else if (action === 'right') {
            setArmsState({ raiseLeft: true });
          }
        }
      });
      button.addEventListener('keyup', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          button.classList.remove('is-active');
          setArmsState();
        }
      });
      button.addEventListener('blur', () => {
        button.classList.remove('is-hovered');
        button.classList.remove('is-active');
        setArmsState();
      });
    });
  };

  const initTiltCards = () => {
    if (shouldReduceMotion()) {
      return;
    }

    const cards = document.querySelectorAll(selectors.tiltCard);
    if (!cards.length) {
      return;
    }

    cards.forEach((card) => {
      const maxTilt = parseFloat(card.dataset.tiltMax || '8');
      const current = { x: 0, y: 0 };
      const target = { x: 0, y: 0 };
      let pointerActive = false;
      let rafId = null;

      const animate = () => {
        current.x = lerp(current.x, target.x, 0.2);
        current.y = lerp(current.y, target.y, 0.2);

        const rotateX = current.y * maxTilt;
        const rotateY = current.x * maxTilt;
        const translateY = pointerActive ? -8 : 0;
        const translateZ = pointerActive ? 6 : 0;

        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${translateY}px) translateZ(${translateZ}px)`;

        if (!pointerActive && Math.abs(current.x) < 0.01 && Math.abs(current.y) < 0.01) {
          card.style.transform = '';
          rafId = null;
          return;
        }

        rafId = requestAnimationFrame(animate);
      };

      const startAnimation = () => {
        if (!rafId) {
          rafId = requestAnimationFrame(animate);
        }
      };

      const updateTargets = (event) => {
        const rect = card.getBoundingClientRect();
        const x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
        const y = clamp((event.clientY - rect.top) / rect.height, 0, 1);

        target.x = (x - 0.5) * 2;
        target.y = (0.5 - y) * 2;
        pointerActive = true;
        card.classList.add('is-tilting');
        startAnimation();
      };

      const resetTargets = () => {
        pointerActive = false;
        target.x = 0;
        target.y = 0;
        card.classList.remove('is-tilting');
        startAnimation();
      };

      card.addEventListener('pointerenter', updateTargets);
      card.addEventListener('pointermove', updateTargets);
      card.addEventListener('pointerleave', resetTargets);
      card.addEventListener('pointercancel', resetTargets);
      card.addEventListener('pointerdown', updateTargets);
      card.addEventListener('pointerup', resetTargets);
    });
  };

  const initReveal = () => {
    const revealElements = document.querySelectorAll(selectors.reveal);
    if (!revealElements.length) {
      return;
    }

    revealElements.forEach((element) => {
      if (element.dataset.revealDelay) {
        const delay = Number.parseFloat(element.dataset.revealDelay);
        if (!Number.isNaN(delay)) {
          element.style.transitionDelay = `${delay}ms`;
        }
      }
    });

    if (shouldReduceMotion() || !('IntersectionObserver' in window)) {
      revealElements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const { target } = entry;
            target.classList.add('is-visible');

            const delayAttr = target.dataset.revealDelay;
            if (delayAttr) {
              const delay = Number.parseFloat(delayAttr);
              if (!Number.isNaN(delay)) {
                const clearDelayAfter = Math.max(delay + 120, 160);
                window.setTimeout(() => {
                  target.style.transitionDelay = '';
                }, clearDelayAfter);
              }
            } else {
              target.style.transitionDelay = '';
            }

            observer.unobserve(target);
          }
        });
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.18
      }
    );

    revealElements.forEach((element) => observer.observe(element));
  };

  const initScrollSpy = () => {
    const sections = Array.from(document.querySelectorAll('main section[id]'));
    const navLinks = Array.from(document.querySelectorAll(selectors.navLinks));

    if (!sections.length || !navLinks.length || !('IntersectionObserver' in window)) {
      return;
    }

    const linkMap = navLinks.reduce((accumulator, link) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        accumulator[href.slice(1)] = link;
      }
      return accumulator;
    }, {});

    const setActiveLink = (id) => {
      navLinks.forEach((link) => {
        link.classList.toggle('is-active', link === linkMap[id]);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveLink(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0
      }
    );

    sections.forEach((section) => observer.observe(section));

    const firstVisible = sections.find((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top <= window.innerHeight * 0.55 && rect.bottom >= window.innerHeight * 0.25;
    });

    if (firstVisible?.id) {
      setActiveLink(firstVisible.id);
    }
  };

  const init = () => {
    toggleNavigation();
    updateCurrentYear();
    watchHeaderScroll();
    initHeroBot();
    initTiltCards();
    initReveal();
    initScrollSpy();
  };

  return { init };
})();

document.addEventListener('DOMContentLoaded', portfolioApp.init);
