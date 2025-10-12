const portfolioApp = (() => {
  const selectors = {
    navToggle: '[data-nav-toggle]',
    nav: '[data-site-nav]',
    header: '[data-header]',
    navLinks: '.site-nav__link',
    currentYear: '[data-current-year]',
    heroVisual: '[data-hero-visual]',
    heroCanvas: '[data-hero-canvas]',
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

  const initHeroAvatar = () => {
    const heroVisual = document.querySelector(selectors.heroVisual);
    const canvas = document.querySelector(selectors.heroCanvas);

    if (!heroVisual || !canvas || typeof THREE === 'undefined') {
      if (!heroVisual || !canvas) {
        console.warn('[Hero avatar] Conteneur ou canvas introuvable. Le visuel restera statique.');
      } else if (typeof THREE === 'undefined') {
        console.warn(
          "[Hero avatar] Three.js n'est pas chargé. Vérifiez l'accès réseau au script https://unpkg.com/three@0.166.0/build/three.min.js ou ajoutez-le localement."
        );
      }
      return;
    }

    const reduceMotion = shouldReduceMotion();
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true
      });
    } catch (error) {
      console.warn('[Hero avatar] Impossible de créer un contexte WebGL.', error);
      heroVisual.classList.add('is-static');
      return;
    }

    const gl = renderer.getContext();
    if (!gl) {
      console.warn(
        "[Hero avatar] WebGL n'est pas disponible dans ce navigateur (peut-être désactivé ou non supporté)."
      );
      heroVisual.classList.add('is-static');
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0.6, 6.5);

    const ambient = new THREE.AmbientLight(0xffffff, 0.82);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.75);
    keyLight.position.set(4, 6, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x6cdfff, 0.5);
    rimLight.position.set(-5, 3, -4);
    scene.add(rimLight);

    const accentLight = new THREE.PointLight(0x6ae0ff, 0.8, 12, 2);
    accentLight.position.set(2.6, 1.4, 2.8);
    scene.add(accentLight);

    const warmLight = new THREE.PointLight(0xffaf80, 0.35, 10, 2);
    warmLight.position.set(-2.2, 1.0, 3.4);
    scene.add(warmLight);

    const avatarGroup = new THREE.Group();
    avatarGroup.position.y = -0.2;
    scene.add(avatarGroup);

    const panelMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0a1f45,
      metalness: 0.35,
      roughness: 0.35,
      clearcoat: 0.6,
      clearcoatRoughness: 0.45,
      emissive: 0x071734,
      emissiveIntensity: 0.7
    });

    const createRoundedRectGeometry = (width, height, radius, depth = 0.15) => {
      const shape = new THREE.Shape();
      const x = -width / 2;
      const y = -height / 2;

      shape.moveTo(x + radius, y);
      shape.lineTo(x + width - radius, y);
      shape.quadraticCurveTo(x + width, y, x + width, y + radius);
      shape.lineTo(x + width, y + height - radius);
      shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      shape.lineTo(x + radius, y + height);
      shape.quadraticCurveTo(x, y + height, x, y + height - radius);
      shape.lineTo(x, y + radius);
      shape.quadraticCurveTo(x, y, x + radius, y);

      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth,
        bevelEnabled: false
      });
      geometry.computeVertexNormals();
      geometry.translate(0, 0, -depth / 2);
      return geometry;
    };

    const panel = new THREE.Mesh(createRoundedRectGeometry(3.8, 3.8, 0.7), panelMaterial);
    panel.position.z = -0.7;
    avatarGroup.add(panel);

    const panelAccent = new THREE.Mesh(
      createRoundedRectGeometry(3.4, 3.4, 0.6),
      new THREE.MeshPhysicalMaterial({
        color: 0x12305c,
        metalness: 0.25,
        roughness: 0.45,
        emissive: 0x0b2450,
        emissiveIntensity: 0.55,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
        reflectivity: 0.8
      })
    );
    panelAccent.position.z = -0.45;
    avatarGroup.add(panelAccent);

    const stand = new THREE.Mesh(
      new THREE.CylinderGeometry(1.2, 1.6, 0.3, 48),
      new THREE.MeshStandardMaterial({
        color: 0x0d254a,
        metalness: 0.3,
        roughness: 0.4,
        emissive: 0x081836,
        emissiveIntensity: 0.4
      })
    );
    stand.position.set(0, -1.75, -0.1);
    avatarGroup.add(stand);

    const torsoMaterial = new THREE.MeshStandardMaterial({
      color: 0x173d73,
      roughness: 0.4,
      metalness: 0.25,
      emissive: 0x0d2550,
      emissiveIntensity: 0.5
    });

    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(1.18, 1.3, 2.15, 64, 1, true),
      torsoMaterial
    );
    body.position.y = -0.3;
    avatarGroup.add(body);

    const shirtCollar = new THREE.Mesh(
      new THREE.TorusGeometry(1.1, 0.14, 24, 64),
      new THREE.MeshStandardMaterial({
        color: 0x143a6d,
        metalness: 0.25,
        roughness: 0.55,
        emissive: 0x0d254a,
        emissiveIntensity: 0.6
      })
    );
    shirtCollar.rotation.x = Math.PI / 2;
    shirtCollar.position.set(0, 0.6, 0.35);
    avatarGroup.add(shirtCollar);

    const skinMaterial = new THREE.MeshStandardMaterial({
      color: 0xffe4c5,
      roughness: 0.45,
      metalness: 0.08
    });

    const head = new THREE.Mesh(new THREE.SphereGeometry(1.05, 48, 48), skinMaterial);
    head.position.set(0, 0.95, 0.35);
    avatarGroup.add(head);

    const hairMaterial = new THREE.MeshStandardMaterial({
      color: 0x202639,
      roughness: 0.35,
      metalness: 0.35,
      emissive: 0x080c16,
      emissiveIntensity: 0.8
    });

    const hair = new THREE.Mesh(new THREE.SphereGeometry(1.15, 48, 48, 0, Math.PI * 2, 0, Math.PI));
    hair.material = hairMaterial;
    hair.scale.set(1.02, 0.75, 1.02);
    hair.position.set(0, 1.25, 0.3);
    avatarGroup.add(hair);

    const earConeGeometry = new THREE.ConeGeometry(0.32, 0.4, 32);
    const leftCatEar = new THREE.Mesh(earConeGeometry, hairMaterial);
    leftCatEar.position.set(-0.55, 1.25, 0.1);
    leftCatEar.rotation.set(Math.PI, 0.25, Math.PI * 0.22);
    avatarGroup.add(leftCatEar);
    const rightCatEar = leftCatEar.clone();
    rightCatEar.position.x *= -1;
    rightCatEar.rotation.y *= -1;
    rightCatEar.rotation.z *= -1;
    avatarGroup.add(rightCatEar);

    const beardMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f2a3d,
      roughness: 0.38,
      metalness: 0.26,
      emissive: 0x0c1222,
      emissiveIntensity: 0.6
    });

    const beard = new THREE.Mesh(new THREE.SphereGeometry(1.05, 48, 48, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), beardMaterial);
    beard.scale.set(1.04, 0.96, 1.05);
    beard.position.set(0, 0.32, 0.6);
    avatarGroup.add(beard);

    const eyebrowGeometry = new THREE.BoxGeometry(0.55, 0.12, 0.1);
    const eyebrowMaterial = new THREE.MeshStandardMaterial({
      color: 0x131f35,
      roughness: 0.35,
      metalness: 0.18
    });

    const leftBrow = new THREE.Mesh(eyebrowGeometry, eyebrowMaterial);
    leftBrow.position.set(-0.42, 0.9, 0.9);
    leftBrow.rotation.z = 0.15;
    avatarGroup.add(leftBrow);

    const rightBrow = leftBrow.clone();
    rightBrow.position.x *= -1;
    rightBrow.rotation.z = -0.15;
    avatarGroup.add(rightBrow);

    const eyeGeometry = new THREE.SphereGeometry(0.14, 32, 32);
    const eyeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x10203b,
      roughness: 0.15,
      metalness: 0.6,
      clearcoat: 1,
      clearcoatRoughness: 0.05
    });

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.4, 0.74, 1.02);
    avatarGroup.add(leftEye);

    const rightEye = leftEye.clone();
    rightEye.position.x *= -1;
    avatarGroup.add(rightEye);

    const eyeHighlightGeometry = new THREE.SphereGeometry(0.06, 16, 16);
    const eyeHighlightMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.65,
      roughness: 0.08,
      metalness: 0.75
    });

    const leftHighlight = new THREE.Mesh(eyeHighlightGeometry, eyeHighlightMaterial);
    leftHighlight.position.set(-0.3, 0.83, 1.13);
    avatarGroup.add(leftHighlight);

    const rightHighlight = leftHighlight.clone();
    rightHighlight.position.x *= -1;
    rightHighlight.position.z = leftHighlight.position.z;
    avatarGroup.add(rightHighlight);

    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.38, 32), new THREE.MeshStandardMaterial({
      color: 0xffd5b1,
      roughness: 0.6,
      metalness: 0.1
    }));
    nose.rotation.x = Math.PI / 2;
    nose.position.set(0, 0.56, 1.12);
    avatarGroup.add(nose);

    const smileGeometry = new THREE.TorusGeometry(0.34, 0.05, 12, 64, Math.PI);
    const smile = new THREE.Mesh(smileGeometry, beardMaterial);
    smile.rotation.set(Math.PI / 1.65, 0, Math.PI);
    smile.position.set(0, 0.28, 0.92);
    avatarGroup.add(smile);

    const earGeometry = new THREE.SphereGeometry(0.22, 24, 24, 0, Math.PI * 2, 0, Math.PI);
    const leftEar = new THREE.Mesh(earGeometry, skinMaterial);
    leftEar.position.set(-0.95, 0.72, 0.2);
    leftEar.rotation.y = Math.PI / 2;
    avatarGroup.add(leftEar);
    const rightEar = leftEar.clone();
    rightEar.position.x *= -1;
    rightEar.rotation.y = -Math.PI / 2;
    avatarGroup.add(rightEar);

    const earAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0xffc7a2,
      roughness: 0.7,
      metalness: 0.05
    });
    const earAccentGeometry = new THREE.SphereGeometry(0.12, 24, 24);
    const leftEarAccent = new THREE.Mesh(earAccentGeometry, earAccentMaterial);
    leftEarAccent.position.copy(leftEar.position).add(new THREE.Vector3(0.05, -0.05, 0.25));
    avatarGroup.add(leftEarAccent);
    const rightEarAccent = leftEarAccent.clone();
    rightEarAccent.position.x *= -1;
    rightEarAccent.position.z = leftEarAccent.position.z;
    avatarGroup.add(rightEarAccent);

    const laptopBadgeMaterial = new THREE.MeshStandardMaterial({
      color: 0x182c4d,
      roughness: 0.35,
      metalness: 0.4,
      emissive: 0x102040,
      emissiveIntensity: 0.5
    });

    const laptopBadge = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.75, 0.18), laptopBadgeMaterial);
    laptopBadge.position.set(0.9, -0.55, -0.05);
    laptopBadge.rotation.set(-0.2, -0.6, 0.28);
    avatarGroup.add(laptopBadge);

    const textureLoader = new THREE.TextureLoader();

    const badgeScreenMaterial = new THREE.MeshStandardMaterial({
      color: 0x263d70,
      emissive: 0x1b48a0,
      emissiveIntensity: 0.55,
      roughness: 0.35,
      metalness: 0.35
    });

    const profileTexture = textureLoader.load(
      'assets/images/Avatar.png',
      () => {
        badgeScreenMaterial.map = profileTexture;
        badgeScreenMaterial.needsUpdate = true;
        renderOnce();
      },
      undefined,
      () => {
        // texture optional, ignore errors
      }
    );
    profileTexture.wrapS = profileTexture.wrapT = THREE.ClampToEdgeWrapping;
    profileTexture.colorSpace = THREE.SRGBColorSpace;

    const badgeScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.78, 0.78), badgeScreenMaterial);
    badgeScreen.position.set(0.9, -0.52, 0.05);
    badgeScreen.rotation.copy(laptopBadge.rotation);
    avatarGroup.add(badgeScreen);

    const idleRotation = { x: 0.2, y: -0.35 };
    const targetRotation = { x: idleRotation.x, y: idleRotation.y };
    const currentRotation = { x: idleRotation.x, y: idleRotation.y };
    let pointerActive = false;
    let idleTime = 0;
    let blinkPhase = Math.random() * Math.PI * 2;
    const eyes = [leftEye, rightEye];
    const highlights = [leftHighlight, rightHighlight];

    const onResize = () => {
      const size = heroVisual.getBoundingClientRect();
      const dimension = Math.min(size.width, size.height);
      renderer.setSize(dimension, dimension, false);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };

    onResize();
    window.addEventListener('resize', onResize);

    const updateTargetFromPointer = (event) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
      const y = clamp((event.clientY - rect.top) / rect.height, 0, 1);
      targetRotation.x = idleRotation.x + (0.5 - y) * 0.6;
      targetRotation.y = idleRotation.y + (x - 0.5) * 0.8;
      pointerActive = true;
      heroVisual.classList.add('is-active');
    };

    const resetTarget = () => {
      pointerActive = false;
      targetRotation.x = idleRotation.x;
      targetRotation.y = idleRotation.y;
      heroVisual.classList.remove('is-active', 'is-dragging');
    };

    if (!reduceMotion) {
      heroVisual.addEventListener('pointermove', updateTargetFromPointer);
      heroVisual.addEventListener('pointerenter', updateTargetFromPointer);
      heroVisual.addEventListener('pointerleave', resetTarget);
      heroVisual.addEventListener('pointercancel', resetTarget);
      heroVisual.addEventListener('pointerdown', (event) => {
        heroVisual.classList.add('is-dragging');
        heroVisual.setPointerCapture?.(event.pointerId);
        updateTargetFromPointer(event);
      });
      heroVisual.addEventListener('pointerup', (event) => {
        heroVisual.releasePointerCapture?.(event.pointerId);
        resetTarget();
      });
    } else {
      heroVisual.classList.add('is-active');
    }

    const renderOnce = () => {
      avatarGroup.rotation.x = currentRotation.x;
      avatarGroup.rotation.y = currentRotation.y;
      renderer.render(scene, camera);
    };

    const animate = () => {
      if (!reduceMotion) {
        idleTime += 0.01;
        blinkPhase += 0.045;
        if (blinkPhase > Math.PI * 2) {
          blinkPhase -= Math.PI * 2;
        }
        const blinkAmount = Math.pow(Math.max(0, Math.sin(blinkPhase)), 18);
        const eyeScaleY = lerp(1, 0.12, blinkAmount);
        const eyeScaleX = lerp(1, 1.05, blinkAmount);
        eyes.forEach((eye) => {
          eye.scale.y = eyeScaleY;
          eye.scale.x = eyeScaleX;
        });
        highlights.forEach((highlight) => {
          highlight.scale.setScalar(lerp(1, 0.5, blinkAmount));
        });
        if (!pointerActive) {
          targetRotation.y = idleRotation.y + Math.sin(idleTime) * 0.15;
          targetRotation.x = idleRotation.x + Math.cos(idleTime * 0.6) * 0.08;
        }

        currentRotation.x = lerp(currentRotation.x, targetRotation.x, 0.08);
        currentRotation.y = lerp(currentRotation.y, targetRotation.y, 0.08);

        avatarGroup.position.y = -0.2 + (pointerActive ? -0.05 : Math.sin(idleTime * 1.4) * 0.05);

        renderOnce();
        requestAnimationFrame(animate);
        return;
      }

      renderOnce();
    };

    animate();
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
    initHeroAvatar();
    initTiltCards();
    initReveal();
    initScrollSpy();
  };

  return { init };
})();

document.addEventListener('DOMContentLoaded', portfolioApp.init);
