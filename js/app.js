// js/app.js
// Lógica del sitio: WhatsApp dinámico, filtros, modales, formulario, reveal

/* =========================
   HELPERS
========================= */
function waLink(message) {
    const number = window.SITE?.waNumber || "5493810000000";
    const text = encodeURIComponent(message);
    return `https://wa.me/${number}?text=${text}`;
  }
  
  function qs(sel, ctx = document) {
    return ctx.querySelector(sel);
  }
  
  function qsa(sel, ctx = document) {
    return [...ctx.querySelectorAll(sel)];
  }
  
  /* =========================
     YEAR
  ========================= */
  (function setYear() {
    const yearEl = qs("#year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  })();
  
  /* =========================
     WHATSAPP LINKS (navbar, contacto, flotante)
  ========================= */
  (function initStaticWA() {
    const baseMsg = window.SITE?.waDefaultMsg || "Hola! Quiero un presupuesto de arquitectura.";
  
    const btnNav = qs("#btnNavWA");
    const btnContact = qs("#btnContactWA");
    const waFloat = qs("#waFloat");
  
    if (btnNav) btnNav.href = waLink(baseMsg);
    if (btnContact) btnContact.href = waLink("Hola! Quiero coordinar una visita y presupuesto.");
    if (waFloat) waFloat.href = waLink(baseMsg);
  })();
  
  /* =========================
     FILTROS ARTÍCULOS
  ========================= */
  (function initFilters() {
    const filters = qs("#filtersArticulos");
    const grid = qs("#gridArticulos");
    if (!filters || !grid) return;
  
    const buttons = qsa("button[data-filter]", filters);
  
    function setActive(btn) {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    }
  
    function applyFilter(filter) {
      const items = qsa("[data-cat]", grid);
      items.forEach((col) => {
        const cat = col.getAttribute("data-cat");
        const show = filter === "all" || cat === filter;
        col.style.display = show ? "" : "none";
      });
    }
  
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.getAttribute("data-filter");
        setActive(btn);
        applyFilter(filter);
      });
    });
  
    // default
    if (buttons[0]) {
      setActive(buttons[0]);
      applyFilter("all");
    }
  })();
  
  /* =========================
     MODAL ARTÍCULO (rellena datos)
  ========================= */
  (function initModalArticulo() {
    const modal = qs("#modalArticulo");
    if (!modal) return;
  
    const titleEl = qs("#mArtTitle");
    const imgEl = qs("#mArtImg");
    const descEl = qs("#mArtDesc");
    const catEl = qs("#mArtCat");
    const waBtn = qs("#btnArtWA");
  
    modal.addEventListener("show.bs.modal", (ev) => {
      const trigger = ev.relatedTarget;
      if (!trigger) return;
  
      const title = trigger.getAttribute("data-title") || "Artículo";
      const img = trigger.getAttribute("data-img") || "";
      const desc = trigger.getAttribute("data-desc") || "";
      const cat = trigger.getAttribute("data-cat") || "Categoría";
  
      if (titleEl) titleEl.textContent = title;
      if (imgEl) imgEl.src = img;
      if (imgEl) imgEl.alt = title;
      if (descEl) descEl.textContent = desc;
      if (catEl) catEl.textContent = cat;
  
      if (waBtn) {
        waBtn.href = waLink(`Hola! Quiero consultar por: ${title}.`);
      }
    });
  })();
  
  /* =========================
     MODAL PROYECTO (rellena datos)
  ========================= */
  (function initModalProyecto() {
    const modal = qs("#modalProyecto");
    if (!modal) return;
  
    const titleEl = qs("#mProTitle");
    const imgEl = qs("#mProImg");
    const descEl = qs("#mProDesc");
  
    modal.addEventListener("show.bs.modal", (ev) => {
      const trigger = ev.relatedTarget;
      if (!trigger) return;
  
      const title = trigger.getAttribute("data-title") || "Proyecto";
      const img = trigger.getAttribute("data-img") || "";
      const desc = trigger.getAttribute("data-desc") || "";
  
      if (titleEl) titleEl.textContent = title;
      if (imgEl) imgEl.src = img;
      if (imgEl) imgEl.alt = title;
      if (descEl) descEl.textContent = desc;
    });
  })();
  
  /* =========================
     WHATSAPP BOTONES CHICOS (cards)
  ========================= */
  (function initCardWA() {
    document.addEventListener("click", (ev) => {
      const btn = ev.target.closest(".js-wa");
      if (!btn) return;
  
      const item = btn.getAttribute("data-wa") || "un servicio";
      const url = waLink(`Hola! Quiero consultar por: ${item}.`);
      window.open(url, "_blank", "noopener");
    });
  })();
  
  /* =========================
     MODAL PRESUPUESTO (opciones)
  ========================= */
  (function initPackWA() {
    const optionBtns = qsa(".option-btn");
    const detail = qs("#packDetalle");
    const btnPack = qs("#btnPackWA");
  
    if (!btnPack) return;
  
    let selected = "Pro (Planos + 3D)";
  
    optionBtns.forEach((b) => {
      b.addEventListener("click", () => {
        selected = b.getAttribute("data-pack") || selected;
        optionBtns.forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
      });
    });
  
    btnPack.addEventListener("click", () => {
      const extra = detail?.value?.trim();
      const msg = extra
        ? `Hola! Quiero la opción: ${selected}. Detalle: ${extra}`
        : `Hola! Quiero la opción: ${selected}.`;
  
      btnPack.href = waLink(msg);
    });
  })();
  
  /* =========================
     FORM CONTACTO => abre WA
  ========================= */
  (function initForm() {
    const form = qs("#formContacto");
    if (!form) return;
  
    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
  
      const nombre = qs("#cNombre")?.value?.trim() || "-";
      const tel = qs("#cTelefono")?.value?.trim() || "-";
      const servicio = qs("#cServicio")?.value || "Consulta general";
      const zona = qs("#cZona")?.value?.trim() || "-";
      const msg = qs("#cMensaje")?.value?.trim() || "-";
  
      const text =
        `Hola! Soy ${nombre}.%0A` +
        `Tel: ${tel}%0A` +
        `Servicio: ${servicio}%0A` +
        `Zona: ${zona}%0A` +
        `Mensaje: ${msg}`;
  
      window.open(waLink(decodeURIComponent(text)), "_blank", "noopener");
    });
  })();
  
  /* =========================
     REVEAL ON SCROLL
  ========================= */
  (function revealOnScroll() {
    const items = qsa(".reveal");
    if (!items.length) return;
  
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