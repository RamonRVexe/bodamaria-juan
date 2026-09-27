/**
 * Sistema ligero de animaciones al hacer scroll.
 * No usa librerías externas: solo IntersectionObserver nativo.
 * Respeta prefers-reduced-motion (el CSS ya desactiva la transición,
 * aquí solo evitamos trabajo innecesario).
 */
export function initReveal(root: ParentNode = document): void {
  const targets = root.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!targets.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  // Stagger automático dentro de un mismo contenedor
  const groups = new Map<Element | null, HTMLElement[]>();
  targets.forEach((el) => {
    const parent = el.parentElement;
    const arr = groups.get(parent) ?? [];
    arr.push(el);
    groups.set(parent, arr);
  });
  groups.forEach((els) => {
    els.forEach((el, i) => {
      if (!el.style.getPropertyValue('--delay')) {
        el.style.setProperty('--delay', `${Math.min(i * 90, 360)}ms`);
      }
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}

function initScrollBackground(): void {
  const updateBackground = () => {
    document.body.classList.toggle('has-scrolled', window.scrollY > 8);
  };

  updateBackground();
  window.addEventListener('scroll', updateBackground, { passive: true });
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initReveal();
      initScrollBackground();
    });
  } else {
    initReveal();
    initScrollBackground();
  }
}
