export const setupFadeUpAnimations = () => {
  // Setup intersection observer for fade-up animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observe all elements with fade-up class
  document.querySelectorAll('.fade-up').forEach((el) => {
    observer.observe(el);
  });

  return () => {
    observer.disconnect();
  };
};