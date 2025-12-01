/* ===================== MAIN.JS ===================== */

/* ------------------ Hamburger Navigation ------------------ */
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector("header nav");

  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      const expanded = hamburger.getAttribute("aria-expanded") === "true" || false;
      hamburger.setAttribute("aria-expanded", !expanded);
      nav.classList.toggle("show");
    });
  }

  /* ------------------ Membership Card Modals ------------------ */
  const openModalButtons = document.querySelectorAll(".open-modal");
  const closeModalButtons = document.querySelectorAll(".close-dialog");

  openModalButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const modalId = button.getAttribute("aria-controls");
      const modal = document.getElementById(modalId);
      if (modal) modal.showModal();
    });
  });

  closeModalButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const dialog = button.closest("dialog");
      if (dialog) dialog.close();
    });
  });

  /* Close modal on Escape key */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll("dialog").forEach((dialog) => {
        if (dialog.open) dialog.close();
      });
    }
  });

  /* ------------------ Membership Card Selection ------------------ */
  const cardRadios = document.querySelectorAll(".card-select input[type='radio']");
  const formRadios = document.querySelectorAll("fieldset.membership-fieldset input[type='radio']");

  cardRadios.forEach((cardRadio) => {
    cardRadio.addEventListener("change", (e) => {
      const value = cardRadio.value;
      formRadios.forEach((radio) => {
        radio.checked = radio.value === value;
      });
    });
  });

  /* Sync form selection to card radios */
  formRadios.forEach((formRadio) => {
    formRadio.addEventListener("change", () => {
      const value = formRadio.value;
      cardRadios.forEach((cardRadio) => {
        cardRadio.checked = cardRadio.value === value;
      });
    });
  });

  /* ------------------ Set Timestamp on Form Submit ------------------ */
  const timestampInput = document.getElementById("timestamp");
  const joinForm = document.getElementById("join-form");
  if (joinForm && timestampInput) {
    joinForm.addEventListener("submit", () => {
      const now = new Date();
      timestampInput.value = now.toISOString();
    });
  }
});

const hamburger = document.querySelector(".hamburger");
const navMenu = document.getElementById("main-nav-menu");

hamburger.addEventListener("click", () => {
  const expanded = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", !expanded);
  navMenu.classList.toggle("open");
});

