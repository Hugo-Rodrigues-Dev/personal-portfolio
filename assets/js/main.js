const portfolioApp = (() => {
  const selectors = {
    navToggle: '[data-nav-toggle]',
    nav: '[data-site-nav]',
    header: '[data-header]',
    navLinks: '.site-nav__link',
    currentYear: '[data-current-year]',
    tiltCard: '[data-tilt-card]',
    reveal: '[data-reveal]',
    scrollProgress: '[data-scroll-progress]',
    languageSwitch: '[data-language-switch]',
    languageOption: '[data-language-switch] [data-language]'
  };

  const state = {
    navOpen: false,
    language: 'fr',
    prefersReducedMotion: window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : { matches: false }
  };

  const translations = {
    fr: {
      language: {
        switchLabel: 'Sélecteur de langue'
      },
      logo: {
        alt: 'Logo Hugo Rodrigues'
      },
      header: {
        navToggle: 'Ouvrir le menu',
        navClose: 'Fermer le menu'
      },
      nav: {
        about: 'À propos',
        skills: 'Compétences',
        projects: 'Projets',
        experience: 'Expériences',
        education: 'Formations',
        contact: 'Contact'
      },
      hero: {
        eyebrow: 'Apprenti développeur logiciel chez Orange',
        title: 'Étudiant ingénieur à CPE Lyon',
        subtitle:
          "Passionné par les technologies émergentes, notamment l'intelligence artificielle, la robotique et le développement web, je consolide mes bases en ingénierie logicielle tout en préparant un stage international de 2 à 3 mois pour l'été 2026.",
        ctaProjects: 'Découvrir mes projets',
        ctaContact: "Discuter d'une opportunité",
        antennaLabel: "Taper sur l'antenne du robot",
        panelLeft: 'Activer le module gauche',
        panelCenter: 'Activer le module central',
        panelRight: 'Activer le module droit'
      },
      about: {
        eyebrow: 'À propos',
        title: "Ingénieur logiciel passionné par l'Informatique et les nouvelles technologies",
        paragraph1:
          "Etudiant ingénieur en Informatique & Réseaux de Communication à CPE Lyon et apprenti développeur logiciel chez Orange. J'oriente mes travaux vers l'intelligence artificielle, la robotique et le développement web.",
        paragraph2:
          "Curieux de nature, j'explore la data science et les nouvelles tendances technologiques, mais je me ressource surtout à travers le sport collectif : handballeur depuis quinze ans, j'ai aussi eu la chance de coacher de jeunes équipes et d'arbitrer des rencontres officielles."
      },
      skills: {
        eyebrow: 'Compétences',
        title: 'Mes connaissances techniques',
        groups: {
          languages: {
            title: 'Langages & web',
            items: ['Java', 'Python', 'C#', 'C', 'JavaScript, HTML/CSS, Razor']
          },
          databases: {
            title: 'Bases de données',
            items: ['SQL, PostgreSQL, MongoDB', 'MySQL', 'SQL Developer, Access']
          },
          methods: {
            title: 'IA, modélisation & méthodes',
            items: [
              'Architecture logicielle, DevOps, Systèmes embarqués & IoT',
              'Gestion de projet, Économie, Droit',
              'UML, MLD, MVP, normalisation, algèbre relationnelle'
            ]
          }
        }
      },
      projects: {
        eyebrow: 'Projets',
        title: 'Sélection de réalisations',
        cta: 'Voir tous les projets',
        cards: {
          job: {
            description:
              'Application pour suivre mes candidatures, organiser les contacts, les relances et les échéances depuis une interface claire accessible sur desktop comme mobile.',
            code: 'Code',
            more: 'Voir plus'
          },
          python: {
            description:
              'Dépôt personnel où je documente mon parcours sur les fondamentaux Python, les structures de données, les algorithmes et la programmation orientée objet, avec des exemples progressifs.',
            code: 'Code',
            more: 'Voir plus'
          },
          iot: {
            description:
              "Application Android réalisée à CPE Lyon pour afficher en temps réel des données de capteurs via UDP, choisir un serveur distant et visualiser graphiquement les mesures depuis l'application mobile.",
            code: 'Code',
            more: 'Voir plus'
          }
        }
      },
      experience: {
        eyebrow: 'Expériences',
        title: 'Parcours professionnel',
        items: {
          orange: {
            role: 'Apprenti développeur logiciel',
            meta: 'Orange · Lyon · 2024 — 2027',
            description:
              "Conception et développement d'une nouvelle API REST, intégration de services partenaires, automatisation de l'enrichissement et de la gestion des erreurs, rédaction de tests unitaires et d'intégration (JUnit, Mockito, Castle Mock) et application des bonnes pratiques Agile."
          },
          kardham: {
            role: 'Apprenti développeur logiciel',
            meta: 'Kardham Digital · Dijon · 2023 — 2024',
            description:
              "Ajout de nouvelles fonctionnalités à des applications internes, résolution d'anomalies et maintenance applicative, conception de dashboards métier avec Blazor et les APIs d'Enedis."
          },
          tech2023: {
            role: 'Technicien IT (Intérim)',
            meta: 'La Pierrette S.A. · Suisse · juil. 2023 — août 2023',
            description:
              "Mission estivale au sein du service informatique : installation et mise en service du matériel, préparation des postes utilisateurs et déploiement des mises à jour logicielles."
          },
          intern: {
            role: 'Développeur logiciel (Stage)',
            meta: 'La Pierrette S.A. · Suisse · mai 2023 — juin 2023',
            description:
              "Conception d'une application de gestion de contacts internes, prête pour le déploiement, construite en C# / WPF avec une base de données SQL."
          },
          tech2022: {
            role: 'Technicien IT (Intérim)',
            meta: 'La Pierrette S.A. · Suisse · juil. 2022 — août 2022',
            description:
              "Support technique et préparation de postes : rédaction de procédures d'installation, configuration de Windows, déploiement et remise en service des équipements auprès des utilisateurs finaux."
          }
        }
      },
      education: {
        eyebrow: 'Formations',
        title: 'Parcours académique',
        items: {
          engineering: {
            role: 'Cycle Ingénieur Informatique & Réseaux',
            meta: 'CPE Lyon · 2024 — 2027',
            description:
              "Programme en alternance couvrant intelligence artificielle, mathématiques avancées, développement front et back-end, DevOps, ingénierie logicielle, systèmes et cybersécurité."
          },
          but: {
            role: 'BUT Informatique · Parcours Développement',
            meta: 'IUT de Dijon · 2021 — 2024',
            description:
              'Bases solides en développement logiciel, modélisation de bases de données, gestion de projet, cybersécurité, troisième année en alternance.'
          },
          highschool: {
            role: 'Baccalauréat Technologique STI2D · option SIN',
            meta: 'Lycée Victor Bérard · 2018 — 2021',
            description:
              "Spécialisation en systèmes d'information numériques, électronique et premières applications logicielles orientées systèmes embarqués."
          }
        }
      },
      contact: {
        eyebrow: 'Contact',
        title: "N'hésitez pas à me contacter !",
        avatarAlt: 'Avatar de Hugo Rodrigues',
        intro: 'Retrouvez-moi ici :',
        linkedin: 'Profil LinkedIn',
        github: 'Profil GitHub',
        email: 'Envoyer un e-mail'
      },
      footer: {
        rights: 'Tous droits réservés.',
        backToTop: 'Retour en haut'
      },
      meta: {
        description:
          "Portfolio de Hugo Rodrigues, étudiant ingénieur à CPE Lyon et apprenti développeur logiciel chez Orange."
      }
    },
    en: {
      language: {
        switchLabel: 'Language selector'
      },
      logo: {
        alt: 'Hugo Rodrigues logo'
      },
      header: {
        navToggle: 'Open menu',
        navClose: 'Close menu'
      },
      nav: {
        about: 'About',
        skills: 'Skills',
        projects: 'Projects',
        experience: 'Experience',
        education: 'Education',
        contact: 'Contact'
      },
      hero: {
        eyebrow: 'Software engineering apprentice at Orange',
        title: 'Engineering student at CPE Lyon',
        subtitle:
          'Passionate about emerging technologies such as artificial intelligence, robotics, and web development, I am strengthening my software engineering foundations while preparing for a 2- to 3-month international internship in summer 2026.',
        ctaProjects: 'Explore my projects',
        ctaContact: 'Discuss an opportunity',
        antennaLabel: 'Tap the robot antenna',
        panelLeft: 'Activate left module',
        panelCenter: 'Activate center module',
        panelRight: 'Activate right module'
      },
      about: {
        eyebrow: 'About',
        title: 'Software engineer passionate about computing and new technologies',
        paragraph1:
          'Engineering student in Computer Science & Communication Networks at CPE Lyon and software developer apprentice at Orange. I direct my work toward artificial intelligence, robotics, and web development.',
        paragraph2:
          'Naturally curious, I explore data science and new technology trends, and I recharge through team sports: a handball player for fifteen years, I have also coached youth teams and refereed official matches.'
      },
      skills: {
        eyebrow: 'Skills',
        title: 'Technical expertise',
        groups: {
          languages: {
            title: 'Languages & web',
            items: ['Java', 'Python', 'C#', 'C', 'JavaScript, HTML/CSS, Razor']
          },
          databases: {
            title: 'Databases',
            items: ['SQL, PostgreSQL, MongoDB', 'MySQL', 'SQL Developer, Access']
          },
          methods: {
            title: 'AI, modelling & methods',
            items: [
              'Software architecture, DevOps, Embedded systems & IoT',
              'Project management, Economics, Law',
              'UML, LDM, MVP, normalization, relational algebra'
            ]
          }
        }
      },
      projects: {
        eyebrow: 'Projects',
        title: 'Selected work',
        cta: 'View all projects',
        cards: {
          job: {
            description:
              'Application to track my job applications, organize contacts, follow-ups, and deadlines from a clear interface accessible on desktop and mobile.',
            code: 'Source',
            more: 'Learn more'
          },
          python: {
            description:
              'Personal repository documenting my journey through Python fundamentals, data structures, algorithms, and object-oriented programming with progressive examples.',
            code: 'Source',
            more: 'Learn more'
          },
          iot: {
            description:
              'Android app built at CPE Lyon to display live sensor data via UDP, select a remote server, and visualize the measurements directly from the mobile application.',
            code: 'Source',
            more: 'Learn more'
          }
        }
      },
      experience: {
        eyebrow: 'Experience',
        title: 'Professional path',
        items: {
          orange: {
            role: 'Software developer apprentice',
            meta: 'Orange · Lyon · 2024 — 2027',
            description:
              'Designing and building a new REST API, integrating partner services, automating enrichment and error handling, writing unit and integration tests (JUnit, Mockito, Castle Mock), and applying Agile best practices.'
          },
          kardham: {
            role: 'Software developer apprentice',
            meta: 'Kardham Digital · Dijon · 2023 — 2024',
            description:
              'Added new features to internal applications, resolved issues and maintained codebases, and designed business dashboards using Blazor and Enedis APIs.'
          },
          tech2023: {
            role: 'IT technician (Temporary)',
            meta: 'La Pierrette S.A. · Switzerland · Jul 2023 — Aug 2023',
            description:
              'Summer assignment within the IT department: installed and commissioned hardware, prepared user workstations, and deployed software updates.'
          },
          intern: {
            role: 'Software developer intern',
            meta: 'La Pierrette S.A. · Switzerland · May 2023 — Jun 2023',
            description:
              'Designed an in-house contact management application ready for deployment, built with C# / WPF and a SQL database.'
          },
          tech2022: {
            role: 'IT technician (Temporary)',
            meta: 'La Pierrette S.A. · Switzerland · Jul 2022 — Aug 2022',
            description:
              'Provided technical support and workstation preparation: wrote installation procedures, configured Windows, deployed devices, and helped end users get back up and running.'
          }
        }
      },
      education: {
        eyebrow: 'Education',
        title: 'Academic background',
        items: {
          engineering: {
            role: 'Engineering cycle in Computer Science & Networks',
            meta: 'CPE Lyon · 2024 — 2027',
            description:
              'Work-study program covering artificial intelligence, advanced mathematics, front- and back-end development, DevOps, software engineering, systems, and cybersecurity.'
          },
          but: {
            role: 'BSc in Computer Science · Development track',
            meta: 'IUT of Dijon · 2021 — 2024',
            description:
              'Solid foundation in software development, database modelling, project management, cybersecurity, and a third year in an apprenticeship.'
          },
          highschool: {
            role: 'Technological Baccalaureate STI2D · SIN option',
            meta: 'Lycée Victor Bérard · 2018 — 2021',
            description:
              'Specialized in digital information systems, electronics, and early software projects focused on embedded systems.'
          }
        }
      },
      contact: {
        eyebrow: 'Contact',
        title: 'Feel free to reach out!',
        avatarAlt: 'Portrait of Hugo Rodrigues',
        intro: 'Find me here:',
        linkedin: 'LinkedIn profile',
        github: 'GitHub profile',
        email: 'Send an email'
      },
      footer: {
        rights: 'All rights reserved.',
        backToTop: 'Back to top'
      },
      meta: {
        description:
          'Portfolio of Hugo Rodrigues, CPE Lyon engineering student and software developer apprentice at Orange.'
      }
    }
  };

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const lerp = (start, end, amount) => start + (end - start) * amount;
  const shouldReduceMotion = () => Boolean(state.prefersReducedMotion?.matches);

  const resolveTranslation = (lang, key) => {
    if (!lang || !key || !translations[lang]) {
      return undefined;
    }

    return key.split('.').reduce((accumulator, part) => {
      if (accumulator === undefined || accumulator === null) {
        return undefined;
      }
      return accumulator[part];
    }, translations[lang]);
  };

  const updateNavToggleLabel = (navToggle, isOpen) => {
    if (!navToggle) {
      return;
    }
    const key = isOpen ? 'header.navClose' : 'header.navToggle';
    const label = resolveTranslation(state.language, key);
    if (typeof label === 'string' && label.trim().length > 0) {
      navToggle.setAttribute('aria-label', label);
    }
  };

  const applyTranslations = (lang) => {
    const textElements = document.querySelectorAll('[data-i18n]');
    textElements.forEach((element) => {
      const key = element.dataset.i18n;
      const translation = resolveTranslation(lang, key);
      if (translation === undefined) {
        return;
      }

      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.value = translation;
        return;
      }

      element.textContent = translation;
    });

    const attrElements = document.querySelectorAll('[data-i18n-attr]');
    attrElements.forEach((element) => {
      const mapping = element.dataset.i18nAttr;
      if (!mapping) {
        return;
      }

      mapping
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
        .forEach((entry) => {
          const [attr, path] = entry.split(':').map((part) => part.trim());
          if (!attr || !path) {
            return;
          }

          const translation = resolveTranslation(lang, path);
          if (translation !== undefined) {
            element.setAttribute(attr, translation);
          }
        });
    });

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      const description = resolveTranslation(lang, 'meta.description');
      if (typeof description === 'string' && description.trim().length > 0) {
        metaDescription.setAttribute('content', description);
      }
    }
  };

  const syncLanguageSwitch = (lang) => {
    const switchElement = document.querySelector(selectors.languageSwitch);
    if (!switchElement) {
      return;
    }

    const options = switchElement.querySelectorAll(selectors.languageOption);
    options.forEach((option) => {
      const isActive = option.dataset.language === lang;
      option.classList.toggle('is-active', isActive);
      option.setAttribute('aria-pressed', String(isActive));
    });
  };

  const persistLanguage = (lang) => {
    try {
      window.localStorage.setItem('portfolio-language', lang);
    } catch (error) {
      // Ignored: storage may be unavailable (private mode, disabled storage, etc.)
    }
  };

  const getPersistedLanguage = () => {
    try {
      const stored = window.localStorage.getItem('portfolio-language');
      if (stored && translations[stored]) {
        return stored;
      }
    } catch (error) {
      // Ignore storage read errors
    }
    return undefined;
  };

  const detectBrowserLanguage = () => {
    const navigatorLang = navigator.language || navigator.userLanguage;
    if (!navigatorLang) {
      return undefined;
    }

    const shortCode = navigatorLang.slice(0, 2).toLowerCase();
    return translations[shortCode] ? shortCode : undefined;
  };

  const setLanguage = (lang, { persist = true } = {}) => {
    if (!translations[lang]) {
      return;
    }

    state.language = lang;
    document.documentElement.setAttribute('lang', lang);
    applyTranslations(lang);
    syncLanguageSwitch(lang);

    const navToggle = document.querySelector(selectors.navToggle);
    updateNavToggleLabel(navToggle, state.navOpen);

    if (persist) {
      persistLanguage(lang);
    }
  };

  const initLanguageSwitch = () => {
    const switchElement = document.querySelector(selectors.languageSwitch);
    if (!switchElement) {
      return;
    }

    const options = switchElement.querySelectorAll(selectors.languageOption);
    options.forEach((option) => {
      option.addEventListener('click', () => {
        const lang = option.dataset.language;
        if (lang && lang !== state.language) {
          setLanguage(lang);
        }
      });

      option.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          const lang = option.dataset.language;
          if (lang && lang !== state.language) {
            setLanguage(lang);
          }
        }
      });
    });

    const preferred = getPersistedLanguage() || detectBrowserLanguage() || state.language;
    setLanguage(preferred, { persist: false });
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
      updateNavToggleLabel(navToggle, state.navOpen);
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

    updateNavToggleLabel(navToggle, state.navOpen);
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

  const initScrollProgress = () => {
    const bar = document.querySelector(selectors.scrollProgress);
    if (!bar) {
      return;
    }

    const container = bar.closest('.scroll-progress');
    if (!container) {
      return;
    }

    let target = 0;
    let current = 0;
    let rafId = null;

    const applyProgress = () => {
      const easing = 0.2;
      current += (target - current) * easing;

      if (Math.abs(target - current) < 0.002) {
        current = target;
      } else {
        rafId = requestAnimationFrame(applyProgress);
      }

      const percentage = current * 100;
      bar.style.height = `${percentage}%`;
      container.classList.toggle('is-active', percentage > 0.5);
    };

    const updateTarget = () => {
      const scrollTop = window.scrollY;
      const viewport = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight - viewport;
      target = docHeight > 0 ? clamp(scrollTop / docHeight, 0, 1) : 0;

      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(applyProgress);
    };

    window.addEventListener('scroll', updateTarget, { passive: true });
    window.addEventListener('resize', updateTarget);
    updateTarget();
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
          // Ignore pointer capture failures on unsupported browsers
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
    initLanguageSwitch();
    toggleNavigation();
    updateCurrentYear();
    watchHeaderScroll();
    initScrollProgress();
    initHeroBot();
    initTiltCards();
    initReveal();
    initScrollSpy();
  };

  return { init };
})();

document.addEventListener('DOMContentLoaded', portfolioApp.init);
