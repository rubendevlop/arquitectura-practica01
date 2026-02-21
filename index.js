/* =========================
   CONFIG
========================= */
const WA_NUMBER = "5493810000000"; // <-- cambiá por tu número real (sin + ni espacios)

/* =========================
   HELPERS
========================= */
function waLink(message) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${WA_NUMBER}?text=${text}`;
}

function qs(sel, ctx = document) {
  return ctx.querySelector(sel);
}
function qsa(sel, ctx = document) {
  return [...ctx.querySelectorAll(sel)];
}

/* =========================
   FOOTER YEAR
========================= */
(function setYear() {
  const yearEl = qs("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

/* =========================
   REVEAL ON SCROLL
========================= */
(function revealOnScroll() {
  const items = qsa(".reveal");

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("show");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((el) => io.observe(el));
})();