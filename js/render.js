// js/render.js
// Genera las cards de Artículos y Proyectos desde los arrays de data.js

function renderArticulos() {
    const grid = document.getElementById("gridArticulos");
    if (!grid) return;
  
    grid.innerHTML = window.ARTICULOS.map((a) => {
      return `
        <div class="col-sm-6 col-lg-3" data-cat="${a.cat}">
          <article class="product-card reveal">
            <div class="product-media">
              <img src="${a.img}" alt="${a.title}" class="product-img">
            </div>
  
            <div class="product-body">
              <h3 class="h6 fw-bold mb-1">${a.title}</h3>
              <p class="text-muted-soft small mb-2">
                ${a.desc}
              </p>
  
              <div class="d-flex align-items-center justify-content-between mt-auto">
                <div class="price-tag">${a.price}</div>
  
                <div class="d-flex gap-2">
                  <button
                    class="btn btn-outline-light btn-sm js-open-article"
                    data-bs-toggle="modal"
                    data-bs-target="#modalArticulo"
                    data-title="${escapeHtml(a.title)}"
                    data-img="${a.img}"
                    data-desc="${escapeHtml(a.desc)}"
                    data-cat="${escapeHtml(a.catLabel)}"
                  >
                    Ver
                  </button>
  
                  <button class="btn btn-whatsapp btn-sm js-wa" data-wa="${escapeHtml(a.title)}">
                    <i class="bi bi-whatsapp"></i>
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      `;
    }).join("");
  }
  
  function renderProyectos() {
    const grid = document.getElementById("gridProyectos");
    if (!grid) return;
  
    grid.innerHTML = window.PROYECTOS.map((p) => {
      return `
        <div class="col-md-6 col-lg-4">
          <div class="project-card reveal">
            <div class="project-media">
              <img src="${p.img}" alt="${p.title}" class="project-img">
              <div class="project-overlay">
                <div class="project-tag"><i class="bi ${p.tagIcon}"></i> ${p.tagLabel}</div>
                <button
                  class="btn btn-sm btn-light js-open-project"
                  data-bs-toggle="modal"
                  data-bs-target="#modalProyecto"
                  data-title="${escapeHtml(p.title)}"
                  data-img="${p.img}"
                  data-desc="${escapeHtml(p.desc)}"
                >
                  Ver detalle
                </button>
              </div>
            </div>
  
            <div class="project-body">
              <div class="fw-bold">${p.title}</div>
              <div class="text-muted-soft small">${p.sub}</div>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }
  
  /* =========================
     Seguridad simple: escapar texto
  ========================= */
  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
  
  /* =========================
     Ejecutar renders al cargar
  ========================= */
  (function bootRender() {
    renderArticulos();
    renderProyectos();
  })();