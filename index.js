/* =========================================================
   index.js — PARTE 1/3
   - Menú mobile (toggle)
   - Modal (open/close)
   ========================================================= */

/* ---------------------------
   Helpers
--------------------------- */
const $ = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => [...parent.querySelectorAll(sel)];

/* ---------------------------
   Menú mobile
--------------------------- */
const btnMenu = $("#btnMenu");
const menuMobile = $("#menuMobile");

if (btnMenu && menuMobile) {
  btnMenu.addEventListener("click", () => {
    const isHidden = menuMobile.classList.contains("hidden");
    menuMobile.classList.toggle("hidden", !isHidden);

    // Texto del botón (detalle pro)
    btnMenu.textContent = isHidden ? "Cerrar" : "Menú";
  });

  // Cerrar menú al clickear un link (móvil)
  $$("#menuMobile a").forEach((a) => {
    a.addEventListener("click", () => {
      menuMobile.classList.add("hidden");
      btnMenu.textContent = "Menú";
    });
  });
}

/* ---------------------------
   Modal
--------------------------- */
const modal = $("#modal");
const modalTitle = $("#modalTitle");
const modalText = $("#modalText");
const modalImage = $("#modalImage");

// Botones / overlays que cierran el modal
const closeModalEls = $$("[data-close-modal]");

function openModal({ title, text, imageSrc, imageAlt = "Detalle" }) {
  if (!modal) return;

  // Set content
  if (modalTitle) modalTitle.textContent = title || "Detalle";
  if (modalText) modalText.textContent = text || "";
  if (modalImage) {
    modalImage.src = imageSrc || "img/proyecto-1.png";
    modalImage.alt = imageAlt;
  }

  modal.classList.remove("hidden");
  document.body.classList.add("modal-open");
}

function closeModal() {
  if (!modal) return;

  modal.classList.add("hidden");
  document.body.classList.remove("modal-open");
}

// Cerrar con botones y overlay
closeModalEls.forEach((el) => el.addEventListener("click", closeModal));

// Cerrar con tecla ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
/* =========================================================
   index.js — PARTE 2/3
   - Data de proyectos
   - Data de artículos
   - Abrir modal dinámico
   ========================================================= */

/* ---------------------------
   Data: Proyectos
--------------------------- */
const PROJECTS = {
  1: {
    title: "Residencia Patio-Luz",
    text:
      "Una vivienda pensada para maximizar luz natural y ventilación cruzada. " +
      "Se trabajó con volúmenes simples, patios estratégicos y materiales cálidos para una sensación contemporánea y atemporal.",
    imageSrc: "img/proyecto-1.png",
    imageAlt: "Residencia Patio-Luz"
  },
  2: {
    title: "Local Comercial NEO",
    text:
      "Proyecto comercial enfocado en una circulación clara, fachada limpia y presencia urbana. " +
      "Iluminación por capas, señalética integrada y un layout optimizado para experiencia de compra.",
    imageSrc: "img/proyecto-2.png",
    imageAlt: "Local Comercial NEO"
  },
  3: {
    title: "Remodelación Ático",
    text:
      "Reforma integral con reconfiguración funcional, aislación y terminaciones premium. " +
      "Se buscó mejorar el confort térmico/acústico y elevar la calidad espacial con detalles de obra precisos.",
    imageSrc: "img/proyecto-3.png",
    imageAlt: "Remodelación Ático"
  }
};

/* ---------------------------
   Data: Artículos
--------------------------- */
const ARTICLES = {
  deck: {
    title: "Deck exterior: durabilidad real",
    text:
      "Para exteriores, lo importante no es solo la estética: fijate en la estabilidad del material, " +
      "la resistencia UV, el drenaje y el sistema de colocación. Un buen detalle de junta y pendiente " +
      "te ahorra mantenimiento y deformaciones con el tiempo.",
    imageSrc: "img/articulo-deck.png",
    imageAlt: "Deck exterior"
  },
  lampara: {
    title: "Iluminación: capas y escenas",
    text:
      "Pensá la iluminación en 3 capas: ambiente (general), tarea (funcional) y acento (escena). " +
      "Con dimmers y temperatura de color coherente, el espacio se siente más cálido y profesional.",
    imageSrc: "img/articulo-lampara.png",
    imageAlt: "Iluminación interior"
  },
  piso: {
    title: "Pisos: estética + mantenimiento",
    text:
      "Elegí el piso por uso real: tránsito, humedad, limpieza y sensación al tacto. " +
      "El porcelanato es noble y resistente, la madera aporta calidez pero exige cuidados, " +
      "y el microcemento luce minimalista pero requiere buena mano de obra y selladores correctos.",
    imageSrc: "img/articulo-piso.png",
    imageAlt: "Pisos"
  },
  revestimiento: {
    title: "Revestimientos: textura y luz",
    text:
      "El revestimiento define profundidad: texturas, juntas y brillo cambian cómo se comporta la luz. " +
      "Usá superficies más ricas en puntos focales y mantené fondos más limpios para equilibrio visual.",
    imageSrc: "img/articulo-revestimiento.png",
    imageAlt: "Revestimientos"
  }
};

/* ---------------------------
   Abrir modal desde Proyectos
--------------------------- */
$$("[data-open-project]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-open-project");
    const p = PROJECTS[id];

    if (!p) return;

    openModal({
      title: p.title,
      text: p.text,
      imageSrc: p.imageSrc,
      imageAlt: p.imageAlt
    });
  });
});

/* ---------------------------
   Abrir modal desde Artículos
--------------------------- */
$$("[data-open-article]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.getAttribute("data-open-article");
    const a = ARTICLES[key];

    if (!a) return;

    openModal({
      title: a.title,
      text: a.text,
      imageSrc: a.imageSrc,
      imageAlt: a.imageAlt
    });
  });
});
/* =========================================================
   index.js — PARTE 3/3
   - Animaciones al scroll (IntersectionObserver)
   - Navbar scrolled
   - Formulario: validación + mensaje
   ========================================================= */

/* ---------------------------
   Navbar: estado scrolled
--------------------------- */
const header = document.querySelector("header");

function onScrollHeader() {
  if (!header) return;
  const y = window.scrollY || document.documentElement.scrollTop;
  header.classList.toggle("scrolled", y > 8);
}

window.addEventListener("scroll", onScrollHeader);
onScrollHeader();


/* ---------------------------
   Animaciones al hacer scroll
   (usa clases .fade-up / .fade del CSS)
--------------------------- */
const animatedEls = [
  ...document.querySelectorAll(".fade-up"),
  ...document.querySelectorAll(".fade")
];

if (animatedEls.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  animatedEls.forEach((el) => io.observe(el));
}


/* ---------------------------
   Formulario de contacto
--------------------------- */
const contactForm = $("#contactForm");
const formMsg = $("#formMsg");

function setFormMsg(type, text) {
  if (!formMsg) return;

  formMsg.classList.remove("hidden", "ok", "err");

  if (type === "ok") formMsg.classList.add("ok");
  if (type === "err") formMsg.classList.add("err");

  formMsg.textContent = text;
}

function validateEmail(email) {
  // simple, suficiente para front
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = $("#nombre")?.value.trim();
    const email = $("#email")?.value.trim();
    const tipo = $("#tipo")?.value;
    const mensaje = $("#mensaje")?.value.trim();

    // Validaciones
    if (!nombre || nombre.length < 2) {
      return setFormMsg("err", "Por favor, ingresá un nombre válido.");
    }

    if (!email || !validateEmail(email)) {
      return setFormMsg("err", "Ingresá un email válido para poder contactarte.");
    }

    if (!mensaje || mensaje.length < 12) {
      return setFormMsg("err", "Contanos un poco más (mínimo 12 caracteres).");
    }

    // Éxito (por ahora demo; luego lo conectamos a WhatsApp / Email / API)
    setFormMsg(
      "ok",
      `Listo ${nombre}. Recibimos tu consulta (${tipo}). Te respondemos a la brevedad.`
    );

    // Reset suave
    contactForm.reset();

    // (opcional) auto-ocultar mensaje
    setTimeout(() => {
      if (!formMsg) return;
      formMsg.classList.add("hidden");
      formMsg.textContent = "";
      formMsg.classList.remove("ok", "err");
    }, 5000);
  });
}