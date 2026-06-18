// Interacciones principales: menu movil, animaciones, lightbox y formulario.
const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const navMenuLinks = document.querySelectorAll(".nav-menu a");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navMenuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

// Revela elementos al entrar en pantalla con una animacion suave.
const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => revealObserver.observe(item));

// Lightbox preparado para crecer con muchas fotografias.
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox?.querySelector("img");
const lightboxTitle = lightbox?.querySelector("p");
const closeLightbox = lightbox?.querySelector(".lightbox-close");

document.querySelectorAll("[data-lightbox]").forEach((item) => {
  item.addEventListener("click", () => {
    if (!lightbox || !lightboxImage || !lightboxTitle) return;

    lightboxImage.src = item.dataset.lightbox || "";
    lightboxImage.alt = item.querySelector("img")?.alt || "";
    lightboxTitle.textContent = item.dataset.title || "";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

function closeGallery() {
  if (!lightbox || !lightboxImage) return;

  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
}

closeLightbox?.addEventListener("click", closeGallery);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeGallery();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeGallery();
});

// Validacion ligera para que el formulario se sienta funcional en estatico.
const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const requiredFields = ["nombre", "email", "telefono", "interes"];
  const hasEmptyField = requiredFields.some((field) => !String(formData.get(field) || "").trim());

  if (hasEmptyField) {
    formStatus.textContent = "Completa los campos principales para enviar tu solicitud.";
    formStatus.style.color = "#ff6b86";
    return;
  }

  formStatus.textContent = "Solicitud lista. El equipo Energy Life te contactara pronto.";
  formStatus.style.color = "#c7ff35";
  contactForm.reset();
});
