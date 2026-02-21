// js/data.js
// Datos del catálogo y proyectos (el HTML se genera desde JS)

window.SITE = {
    waNumber: "5493810000000",
    waDefaultMsg: "Hola! Quiero un presupuesto de arquitectura."
  };
  
  window.ARTICULOS = [
    {
      id: "lampara",
      title: "Lámpara Colgante Minimal",
      img: "img/articulo-lampara.png",
      desc: "Iluminación cálida para ambientes modernos. Ideal para comedor o barra. Materiales: metal + difusor.",
      cat: "interior",
      catLabel: "Interior",
      price: "$ Consultar"
    },
    {
      id: "piso",
      title: "Piso Vinílico Premium",
      img: "img/articulo-piso.png",
      desc: "Instalación rápida con excelente terminación. Ideal para interiores, oficinas y locales.",
      cat: "interior",
      catLabel: "Interior",
      price: "$ Consultar"
    },
    {
      id: "revestimiento",
      title: "Revestimiento Texturado",
      img: "img/articulo-revestimiento.png",
      desc: "Ideal para exterior. Mejora la estética y protege la pared. Gran durabilidad.",
      cat: "exterior",
      catLabel: "Exterior",
      price: "$ Consultar"
    },
    {
      id: "deck",
      title: "Deck Exterior Símil Madera",
      img: "img/articulo-deck.png",
      desc: "Perfecto para exterior. Resiste humedad y sol. Excelente terminación moderna.",
      cat: "exterior",
      catLabel: "Exterior",
      price: "$ Consultar"
    }
  ];
  
  window.PROYECTOS = [
    {
      id: "vivienda",
      title: "Vivienda Moderna",
      tagIcon: "bi-house",
      tagLabel: "Vivienda",
      img: "img/proyecto-1.png",
      desc: "Diseño de vivienda con líneas limpias, ventanales amplios y circulación eficiente.",
      sub: "Fachada + distribución funcional"
    },
    {
      id: "reforma",
      title: "Reforma Integral",
      tagIcon: "bi-hammer",
      tagLabel: "Reforma",
      img: "img/proyecto-2.png",
      desc: "Reforma completa: optimización de espacios, cocina integrada y renovación de iluminación.",
      sub: "Más luz • más espacio • mejor flujo"
    },
    {
      id: "interiores",
      title: "Interiores Modernos",
      tagIcon: "bi-lamp",
      tagLabel: "Interiores",
      img: "img/proyecto-3.png",
      desc: "Diseño interior con paleta cálida, madera, iluminación puntual y muebles a medida.",
      sub: "Materiales + iluminación pro"
    }
  ];
  