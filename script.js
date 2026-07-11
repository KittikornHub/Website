const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");
const year = document.querySelector("#year");
const lastUpdated = document.querySelector("#last-updated");
const publicationList = document.querySelector("#publication-list");
const presentationList = document.querySelector("#presentation-list");
const filterButtons = document.querySelectorAll("[data-publication-filter]");
const portfolio = window.portfolioData || { publications: [], presentations: [] };

const escapeHTML = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const closeMenu = () => {
  if (!navLinks || !menuToggle) return;
  navLinks.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
};

const renderPublications = (filter = "all") => {
  if (!publicationList) return;

  const items = portfolio.publications.filter((item) =>
    filter === "all" ? true : item.type === filter
  );

  if (!items.length) {
    publicationList.innerHTML = '<p class="empty-state">No outputs are listed in this category yet.</p>';
    return;
  }

  publicationList.innerHTML = items.map((item) => {
    const link = item.link
      ? '<a class="output-link" href="' + escapeHTML(item.link) + '" target="_blank" rel="noopener noreferrer">View record ↗</a>'
      : '<span class="output-link">Record to be added</span>';

    return '<article class="output-card">' +
      '<div class="output-year">' + escapeHTML(item.year) + '</div>' +
      '<div><h3>' + escapeHTML(item.title) + '</h3>' +
      '<p class="output-meta">' + escapeHTML(item.typeLabel) + ' · ' + escapeHTML(item.venue) + '</p></div>' +
      link +
      '</article>';
  }).join("");
};

const renderPresentations = () => {
  if (!presentationList) return;

  presentationList.innerHTML = portfolio.presentations.map((item) =>
    '<article class="timeline-item">' +
      '<div class="timeline-date">' + escapeHTML(item.date) + '</div>' +
      '<div class="timeline-body"><h3>' + escapeHTML(item.title) + '</h3>' +
      '<p><strong>' + escapeHTML(item.event) + '</strong></p>' +
      '<p>' + escapeHTML(item.location) + '</p></div>' +
    '</article>'
  ).join("");
};

if (year) year.textContent = new Date().getFullYear();
if (lastUpdated) lastUpdated.textContent = portfolio.lastUpdated || "not specified";

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navItems.forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    menuToggle?.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1020) closeMenu();
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navItems.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

  sections.forEach((section) => observer.observe(section));
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderPublications(button.dataset.publicationFilter);
  });
});

renderPublications();
renderPresentations();
