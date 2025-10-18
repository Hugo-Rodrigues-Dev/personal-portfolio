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
        eyebrow: 'Apprenti développeur ingénieur chez Orange',
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
      projectsDetail: {
        common: {
          breadcrumbLabel: "Fil d'Ariane",
          breadcrumb: {
            home: 'Accueil',
            projects: 'Projets'
          },
          headerLabel: 'Fiche projet'
        },
        job: {
          titleTag: 'Job Application Tracking | Portfolio',
          metaDescription:
            'Fiche projet détaillée : Job Application Tracking Spreadsheet. Suivi de candidatures, organisation des relances et export Excel.',
          breadcrumb: {
            current: 'Job Application Tracking'
          },
          hero: {
            title: 'Job Application Tracking',
            meta: ['Gestion de candidatures', 'Front-end only'],
            summary:
              "Tableau de bord web pensé pour suivre mes candidatures en stage et alternance : chaque contact, chaque relance et chaque échéance reste visible d'un coup d'œil, sans dépendre d'un back-end.",
            ctaCode: 'Code source',
            ctaBack: 'Retour au portfolio',
            media: "Captures d'écran en cours de préparation (vue tableau, fiche contact, export Excel)."
          },
          overview: {
            title: 'Résumé du projet',
            intro:
              "Partant d'un Google Sheet trop peu ergonomique, j'ai construit une application réactive qui facilite le suivi des pipelines de recrutement. L'interface est optimisée pour clavier et mobile, et conserve toutes les données directement dans le navigateur.",
            problem: {
              title: 'Problématique',
              body:
                "Multiplier les candidatures signifie jongler avec des dizaines de contacts, de dates et d'actions à planifier. Les tableurs perdent vite en lisibilité et n'offrent pas de rappels proactifs."
            },
            solution: {
              title: 'Solution',
              body:
                "Organiser les candidatures sous forme de cartes filtrables, avec des statuts explicites, des dates clés et un suivi d'activité instantané. Les données persistent grâce à <code>localStorage</code> et restent exportables en Excel."
            },
            result: {
              title: 'Résultat',
              body:
                "Je sais en permanence où en sont mes candidatures prioritaires, quelles relances programmer et quels contacts nécessitent un suivi."
            }
          },
          features: {
            title: 'Fonctionnalités clés',
            items: [
              'Noyau du tracker avec filtres, recherche et métriques pour suivre les candidatures.',
              'Persistance locale et export Excel pour garder ses données accessibles hors ligne.',
              "Formulaire d'ajout/édition en modale, tri et pagination pour gérer de gros volumes.",
              'Tableau de bord analytique, vue entreprises et page de prioritisation des postes.',
              'Navigation latérale, interface bilingue et paramètres utilisateur (dont mode sombre).'
            ],
            stack: {
              title: 'Stack & outils',
              body:
                "React 19 (hooks), Tailwind CSS, Vite et lucide-react forment la base de l'IU. Les données sont encore stockées côté client via <code>localStorage</code> en attendant la mise en place de la couche serveur planifiée."
            }
          },
          next: {
            title: 'Prochaines étapes',
            items: [
              'Adopter une base de données sécurisée et une authentification multi-appareils.',
              "Mettre en place rappels/notifications, calendrier intégré et workflow d'archivage.",
              "Concevoir une expérience mobile aboutie et une section dédiée aux CV/lettres.",
              'Automatiser les tests/déploiements (CI/CD) et connecter les job boards pour importer les offres.',
              "Développer des assistants IA : recherche d'opportunités, optimisation de CV, préparation d'entretiens."
            ],
            support: {
              title: 'Accompagnement Codex',
              body:
                "Codex m'aide à cadrer cette feuille de route ambitieuse : architecture serveur, intégrations IA et pipelines automatisés sont explorés sans compromettre l'expérience utilisateur."
            }
          }
        },
        python: {
          titleTag: 'Python Learning Repository | Portfolio',
          metaDescription:
            'Fiche détaillée du dépôt Python Learning Repository : progression, structures de données et algorithmes étudiés.',
          breadcrumb: {
            current: 'Python Learning Repository'
          },
          hero: {
            title: 'Python Learning Repository',
            meta: ['Auto-formation', 'Algorithmique & data'],
            summary:
              "Un dépôt vivant où je documente mon apprentissage de Python : des fondations à l'algorithmique avancée, avec scripts commentés, checklists de progression et projets inspirés de cas réels.",
            ctaCode: 'Code source',
            ctaBack: 'Retour au portfolio',
            media:
              'Diagrammes et notebooks interactifs à venir (comparaison de structures de données, benchmarks).'
          },
          structure: {
            title: 'Structure du dépôt',
            intro:
              "Pour garder une vision claire de ma progression, chaque thème est isolé dans un dossier dédié, avec des exemples, une synthèse et des exercices. Le fichier <code>progress.md</code> sert de feuille de route globale.",
            basics: {
              title: 'Bases',
              body:
                "Syntaxe, structures de contrôle, fonctions (args/kwargs, closures, lambdas), gestion des erreurs, fichiers et tests unitaires."
            },
            data: {
              title: 'Structures de données',
              body:
                'Listes, tuples, dictionnaires, sets, mais aussi implémentations maison : listes chaînées, piles, files, tables de hachage, tas binaires et tries.'
            },
            algorithms: {
              title: 'Algorithmes',
              body:
                'Tri, recherche, récursion, backtracking, fenêtre glissante, deux pointeurs et premières notions de graphes en préparation de la suite.'
            }
          },
          takeaways: {
            title: "Ce que j'en retire",
            items: [
              "Renforcer ma pratique quotidienne du langage en l'appliquant à des problèmes concrets.",
              'Construire des références réutilisables pour des entretiens techniques (résolution de problèmes, analyses de complexité).',
              'Préparer des mini-projets data science et automatisation avec une base solide.'
            ]
          },
          roadmap: {
            title: 'Roadmap',
            phase5: {
              title: 'Phase 5 — Programmation orientée objet',
              items: [
                'Consolider les notions de classes, objets et relations entre composantes.',
                'Explorer héritage, polymorphisme, encapsulation et abstraction.',
                'Pratiquer les méthodes spéciales pour améliorer les API (`__str__`, `__repr__`, etc.).'
              ]
            },
            phase6: {
              title: 'Phase 6 — Python avancé',
              items: [
                'Approfondir décorateurs, générateurs et itérateurs personnalisés.',
                'Revoir les compréhensions (listes, dictionnaires, ensembles) de manière intensive.',
                'Introduire les approches fonctionnelles (`map`/`filter`/`reduce`) et les bibliothèques standard clés (os, sys, datetime, math...).'
              ]
            },
            phase7: {
              title: 'Phase 7 — Bits & mathématiques',
              items: [
                'Manipuler le binaire : opérations bitwise, masques, décalages.',
                'Réviser les astuces mathématiques courantes (PGCD, modulo, nombres premiers).',
                'Préparer des projets appliqués (graphes DFS/BFS, Union-Find, Dijkstra, DP knapsack/LIS/LCS) pour ancrer ces notions.'
              ]
            }
          }
        },
        iot: {
          titleTag: 'IoT Android App | Portfolio',
          metaDescription:
            'Fiche projet détaillée : IoT Android App. Visualisation temps réel des données capteurs micro:bit avec Android et UDP.',
          breadcrumb: {
            current: 'IoT Android App'
          },
          hero: {
            title: 'IoT Android App',
            meta: ['Android', 'IoT & capteurs'],
            summary:
              "Application Android réalisée à CPE Lyon pour se connecter à un serveur IoT, sélectionner un micro:bit et afficher ses capteurs en temps réel. L'utilisateur réorganise les capteurs selon ses priorités et suit les courbes directement sur son smartphone.",
            ctaCode: 'Code source',
            ctaBack: 'Retour au portfolio',
            media:
              "Aperçus des écrans de connexion, sélection d'appareil et tableau de bord seront intégrés ici."
          },
          architecture: {
            title: "Architecture de l'application",
            connection: {
              title: 'Écran Connexion',
              body:
                "Saisie de l'adresse IP et du port du serveur, contrôle de la connexion et bouton pour activer le mode démo hors ligne."
            },
            selection: {
              title: "Écran Sélection d'appareil",
              body:
                "Liste des micro:bits disponibles, informations de statut et sélection de l'appareil à monitorer."
            },
            dashboard: {
              title: 'Tableau de bord principal',
              body:
                'Visualisation temps réel avec MPAndroidChart, cartes de capteurs réordonnables en drag & drop, envoi des préférences au serveur.'
            }
          },
          features: {
            title: 'Fonctionnalités principales',
            items: [
              'Connexion réseau en UDP pour recevoir les mesures avec une latence minimale.',
              'Graphique en temps réel du capteur prioritaire, mis à jour au fur et à mesure des paquets.',
              "Réorganisation des capteurs via RecyclerView, persistée et renvoyée au serveur pour synchroniser l'affichage.",
              "Mode démo autonome pour tester l'application sans serveur ni micro:bit."
            ],
            ux: {
              title: 'Expérience utilisateur',
              body:
                "UI inspirée de la charte CPE Lyon : contrastes doux, icônes explicites, feedback sur les états de connexion et transitions fluides entre les écrans."
            }
          },
          next: {
            title: 'Perspectives',
            items: [
              'Ajouter une sauvegarde des capteurs favoris côté client.',
              "Notifier l'utilisateur en cas de perte de connexion ou d'intervalle de mesure anormal.",
              'Exporter un rapport PDF avec les mesures clés sur une période donnée.'
            ],
            lessons: {
              title: 'Enseignements',
              body:
                "Ce projet m'a permis d'appliquer les principes SOLID sur Android, de manipuler des sockets UDP et de concevoir une architecture modulaire pour capteurs connectés."
            }
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
        eyebrow: 'Software engineer apprentice at Orange',
        title: 'Engineer student at CPE Lyon',
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
      projectsDetail: {
        common: {
          breadcrumbLabel: 'Breadcrumb',
          breadcrumb: {
            home: 'Home',
            projects: 'Projects'
          },
          headerLabel: 'Project brief'
        },
        job: {
          titleTag: 'Job Application Tracking | Portfolio',
          metaDescription:
            'Detailed project page: Job Application Tracking Spreadsheet. Track applications, plan follow-ups, and export to Excel.',
          breadcrumb: {
            current: 'Job Application Tracking'
          },
          hero: {
            title: 'Job Application Tracking',
            meta: ['Application tracking', 'Front-end only'],
            summary:
              'Web dashboard designed to monitor my internship and apprenticeship applications: every contact, follow-up, and deadline stays visible at a glance without relying on a back end.',
            ctaCode: 'Source',
            ctaBack: 'Back to portfolio',
            media: 'Screenshots in progress (board view, contact sheet, Excel export).'
          },
          overview: {
            title: 'Project overview',
            intro:
              'Starting from a clunky Google Sheet, I built a reactive application that makes recruitment pipelines easier to manage. The interface is keyboard- and mobile-friendly, and keeps all data locally in the browser.',
            problem: {
              title: 'Problem',
              body:
                'Handling many applications means juggling dozens of contacts, dates, and planned actions. Spreadsheets quickly lose clarity and never provide proactive reminders.'
            },
            solution: {
              title: 'Solution',
              body:
                'Organize applications as filterable cards with explicit statuses, key dates, and instant activity tracking. Data persists through <code>localStorage</code> and remains exportable to Excel.'
            },
            result: {
              title: 'Outcome',
              body:
                'I always know the status of my priority applications, which follow-ups to schedule, and which contacts need attention.'
            }
          },
          features: {
            title: 'Key features',
            items: [
              'Core tracker with filters, search, and metrics to monitor applications.',
              'Local persistence and Excel export to keep data accessible offline.',
              'Modal add/edit form, sorting, and pagination to manage large volumes.',
              'Analytics dashboard, company view, and job prioritization page.',
              'Sidebar navigation, bilingual interface, and user settings (including dark mode).'
            ],
            stack: {
              title: 'Stack & tools',
              body:
                'React 19 (hooks), Tailwind CSS, Vite, and lucide-react power the UI. Data still lives client-side via <code>localStorage</code> until the upcoming server layer is deployed.'
            }
          },
          next: {
            title: 'Next steps',
            items: [
              'Adopt a secure database plus multi-device authentication.',
              'Add reminders/notifications, an integrated calendar, and an archiving workflow.',
              'Design a polished mobile experience and a dedicated CV/cover letter space.',
              'Automate testing/deployment (CI/CD) and connect job boards to import offers.',
              'Build AI assistants for opportunity scouting, CV optimization, and interview prep.'
            ],
            support: {
              title: 'Codex guidance',
              body:
                'Codex helps shape this ambitious roadmap: server architecture, AI integrations, and automated pipelines are explored without compromising user experience.'
            }
          }
        },
        python: {
          titleTag: 'Python Learning Repository | Portfolio',
          metaDescription:
            'Detailed page for the Python Learning Repository: learning journey, data structures, and algorithms covered.',
          breadcrumb: {
            current: 'Python Learning Repository'
          },
          hero: {
            title: 'Python Learning Repository',
            meta: ['Self-learning', 'Algorithms & data'],
            summary:
              'A living repository documenting my Python journey: from fundamentals to advanced algorithms, with annotated scripts, progress checklists, and projects inspired by real scenarios.',
            ctaCode: 'Source',
            ctaBack: 'Back to portfolio',
            media: 'Diagrams and interactive notebooks coming soon (data-structure comparisons, benchmarks).'
          },
          structure: {
            title: 'Repository structure',
            intro:
              'To keep a clear view of my progress, each topic lives in its own folder with examples, a summary, and exercises. The <code>progress.md</code> file acts as the global roadmap.',
            basics: {
              title: 'Fundamentals',
              body:
                'Syntax, control structures, functions (args/kwargs, closures, lambdas), error handling, files, and unit tests.'
            },
            data: {
              title: 'Data structures',
              body:
                'Lists, tuples, dictionaries, sets, and custom implementations: linked lists, stacks, queues, hash tables, heaps, and tries.'
            },
            algorithms: {
              title: 'Algorithms',
              body:
                'Sorting, searching, recursion, backtracking, sliding window, two pointers, and early graph concepts to prepare the next steps.'
            }
          },
          takeaways: {
            title: 'What I gain',
            items: [
              'Strengthen my daily practice of the language by tackling concrete problems.',
              'Build reusable references for technical interviews (problem solving, complexity analysis).',
              'Prepare data-science and automation mini-projects on solid foundations.'
            ]
          },
          roadmap: {
            title: 'Roadmap',
            phase5: {
              title: 'Phase 5 — Object-oriented programming',
              items: [
                'Consolidate class, object, and component relationship concepts.',
                'Explore inheritance, polymorphism, encapsulation, and abstraction.',
                'Practice special methods to craft better APIs (`__str__`, `__repr__`, etc.).'
              ]
            },
            phase6: {
              title: 'Phase 6 — Advanced Python',
              items: [
                'Deepen understanding of decorators, generators, and custom iterators.',
                'Revisit comprehensions (lists, dicts, sets) with intensive practice.',
                'Introduce functional approaches (`map`/`filter`/`reduce`) and key standard libraries (os, sys, datetime, math...).'
              ]
            },
            phase7: {
              title: 'Phase 7 — Bits & math',
              items: [
                'Manipulate binary: bitwise operations, masks, shifts.',
                'Review common math tricks (GCD, modulo, prime numbers).',
                'Prepare applied projects (DFS/BFS graphs, Union-Find, Dijkstra, DP knapsack/LIS/LCS) to cement these ideas.'
              ]
            }
          }
        },
        iot: {
          titleTag: 'IoT Android App | Portfolio',
          metaDescription:
            'Detailed project page: IoT Android App. Real-time visualization of micro:bit sensor data with Android and UDP.',
          breadcrumb: {
            current: 'IoT Android App'
          },
          hero: {
            title: 'IoT Android App',
            meta: ['Android', 'IoT & sensors'],
            summary:
              'Android app built at CPE Lyon to connect to an IoT server, pick a micro:bit, and display its sensors in real time. Users reorder sensors by priority and follow live charts on their phone.',
            ctaCode: 'Source',
            ctaBack: 'Back to portfolio',
            media:
              'Upcoming previews of the connection, device selection, and dashboard screens.'
          },
          architecture: {
            title: 'App architecture',
            connection: {
              title: 'Connection screen',
              body:
                'Enter the server IP and port, test the connection, and toggle an offline demo mode.'
            },
            selection: {
              title: 'Device selection screen',
              body:
                'List of available micro:bits, status information, and selection of the device to monitor.'
            },
            dashboard: {
              title: 'Main dashboard',
              body:
                'Real-time charts powered by MPAndroidChart, reorderable sensor cards via drag & drop, and preference updates sent back to the server.'
            }
          },
          features: {
            title: 'Key features',
            items: [
              'UDP networking to receive sensor data with minimal latency.',
              'Real-time chart for the priority sensor, updated as packets arrive.',
              'Sensor reordering through RecyclerView, persisted and synced with the server.',
              'Standalone demo mode to test the app without a server or micro:bit.'
            ],
            ux: {
              title: 'User experience',
              body:
                'UI inspired by the CPE Lyon branding: soft contrasts, clear icons, connection state feedback, and smooth screen transitions.'
            }
          },
          next: {
            title: 'Next steps',
            items: [
              'Store favourite sensors locally on the client.',
              'Notify the user if the connection drops or measurement intervals drift.',
              'Export a PDF report summarizing key metrics over a selected period.'
            ],
            lessons: {
              title: 'Lessons learned',
              body:
                'This project let me apply SOLID principles on Android, work with UDP sockets, and design a modular architecture for connected sensors.'
            }
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
