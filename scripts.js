document.addEventListener("DOMContentLoaded", function () {
    window.location.href = "https://helado-sabrosito.netlify.app/";
  // Animaciones de secciones al hacer scroll
  const sections = document.querySelectorAll("section");
  const options = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, options);

  sections.forEach((section) => {
    observer.observe(section);
  });

  // Despliegue y contracción de la historia completa
  const leerMasBtn = document.querySelector(".section-historia .leer-mas-btn");
  const leerMenosBtn = document.querySelector(
    ".section-historia .leer-menos-btn"
  );
  const historiaCompleta = document.querySelector(".historia-completa");
  const introText = document.querySelector(".section-historia p.intro");

  leerMasBtn.addEventListener("click", function () {
    historiaCompleta.style.maxHeight = historiaCompleta.scrollHeight + "px";
    leerMasBtn.style.display = "none";
    leerMenosBtn.style.display = "block";
    introText.style.opacity = 0;
  });

  leerMenosBtn.addEventListener("click", function () {
    historiaCompleta.style.maxHeight = null;
    leerMasBtn.style.display = "block";
    leerMenosBtn.style.display = "none";
    introText.style.opacity = 1;
  });

  // Menú desplegable de la sección "Sabores"
  const saboresData = {
    leche: [
      { nombre: "Coco", imagen: "Imagenes/Sabores/Leche/Coco.jpg" },
      { nombre: "Maní", imagen: "Imagenes/Sabores/Leche/Mani.jpg" },
      {
        nombre: "Ron con pasas",
        imagen: "Imagenes/Sabores/Leche/Ron_Pasas.jpg",
      },
      {
        nombre: "Queso con bocadillo",
        imagen: "Imagenes/Sabores/Leche/Queso_Bocadillo.jpg",
      },
    ],
    agua: [
      { nombre: "Maracuyá", imagen: "Imagenes/Sabores/Agua/Maracuyá.jpg" },
      { nombre: "Salpicón", imagen: "Imagenes/Sabores/Agua/Salpicón.jpg" },
      {
        nombre: "Mango biche",
        imagen: "Imagenes/Sabores/Agua/Mango_Biche.jpg",
      },
    ],
    combinados: [
      {
        nombre: "Leche y fresa",
        imagen: "Imagenes/Sabores/Combinados/Leche_Fresa.jpg",
      },
    ],
    toppings: [
      {
        nombre: "Chispas de Chocolate",
        imagen: "Imagenes/Sabores/Toppings/chocolate-chips.png",
      },
      {
        nombre: "Pepitas de colores",
        imagen: "Imagenes/Sabores/Toppings/crunchy-rainbow-pearls.png",
      },
      {
        nombre: "Chocolate líquido",
        imagen: "Imagenes/Sabores/Toppings/liquid-chocolate.png",
      },
    ],
  };

  const saboresContainer = document.querySelector(".sabores-container");
  const saboresDetalle = document.querySelector(".sabores-detalle");
  const saboresLista = document.querySelector(".sabores-lista");
  const leerMenosBtnSabores = document.querySelector(".leer-menos");

  saboresContainer.addEventListener("click", (e) => {
    const card = e.target.closest(".sabor-card");
    if (card) {
      const tipo = card.dataset.tipo;
      mostrarSabores(tipo);
    }
  });

  leerMenosBtnSabores.addEventListener("click", ocultarSabores);

  function mostrarSabores(tipo) {
    saboresLista.innerHTML = "";
    saboresData[tipo].forEach((sabor) => {
      const saborElement = document.createElement("div");
      saborElement.classList.add("sabor-item");
      saborElement.innerHTML = `
        <img src="${sabor.imagen}" alt="${sabor.nombre}">
        <p>${sabor.nombre}</p>
      `;
      saboresLista.appendChild(saborElement);
    });
    saboresDetalle.style.display = "block";
    saboresDetalle.classList.add("visible"); // Agregar clase directamente
    saboresContainer.style.display = "none";
  }
  
  function ocultarSabores() {
    saboresDetalle.classList.remove("visible"); // Eliminar clase directamente
    setTimeout(() => {
      saboresDetalle.style.display = "none";
      saboresContainer.style.display = "flex";
    }, 300); // Este tiempo debe coincidir con la duración de la transición en CSS
  }

  // Desplazamiento suave al hacer clic en los enlaces de navegación
  document.querySelectorAll("nav a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    });
  });

  // Animación de tarjetas del blog
  const blogCards = document.querySelectorAll(".blog-card");

  blogCards.forEach((card) => {
    card.addEventListener("click", function () {
      if (document.querySelector(".blog-card.flipped")) {
        document
          .querySelector(".blog-card.flipped")
          .classList.remove("flipped");
      }
      this.classList.add("flipped");
    });
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".blog-card")) {
      const flippedCard = document.querySelector(".blog-card.flipped");
      if (flippedCard) {
        flippedCard.classList.remove("flipped");
      }
    }
  });
});
