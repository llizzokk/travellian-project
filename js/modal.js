(() => {
  const mobileMenu = document.querySelector(".js-menu-container");
  const openMenuBtn = document.querySelector(".js-open-menu");
  const closeMenuBtn = document.querySelector(".js-close-menu");

  const toggleMenu = () => {
    const anchors = mobileMenu.querySelectorAll('a[href*="#"]');
    const isMenuOpen =
      openMenuBtn.getAttribute("aria-expanded") === "true" || false;
    openMenuBtn.setAttribute("aria-expanded", !isMenuOpen);
    mobileMenu.classList.toggle("is-open");

    const scrollLockMethod = !isMenuOpen
      ? "disableBodyScroll"
      : "enableBodyScroll";
    bodyScrollLock[scrollLockMethod](document.body);

    if (anchors.length === 0) return;

    if (!isMenuOpen) {
      anchors.forEach((anchor) => {
        anchor.addEventListener("click", toggleMenu);
      });
      return;
    }

    anchors.forEach((anchor) => {
      anchor.removeEventListener("click", toggleMenu);
    });
  };

  openMenuBtn.addEventListener("click", toggleMenu);
  closeMenuBtn.addEventListener("click", toggleMenu);

  // Вказати брейкпоінт після якого повинна зачинятися
  window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => {
    if (!e.matches) return;
    mobileMenu.classList.remove("is-open");
    openMenuBtn.setAttribute("aria-expanded", false);
    bodyScrollLock.enableBodyScroll(document.body);
  });
})();

document.addEventListener("DOMContentLoaded", function () {
  // Отключаем автоматическое восстановление прокрутки
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  // Прокручиваем страницу вверх при загрузке
  window.scrollTo(0, 0);

  document.querySelectorAll("nav a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
});
