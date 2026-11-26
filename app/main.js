// AngkaNusa router — hash routes, no framework, no network.
// Routes: "" (home), population, economy, health, environment, compare,
// data, sources. Controls are real: metric tabs re-render their chart,
// the compare select re-renders its chart and table, the data filter
// narrows the indicator table as you type. Every control is wired here,
// in this file, with addEventListener — nothing is an inline handler.

import { VIEWS, populationView, economyView, compareView } from "./views.js";

const app = document.getElementById("app");
const navLinks = Array.from(document.querySelectorAll(".contents a"));

// Which metric tab is active on the two tabbed pages.
const state = { population: "pop", economy: "gdp", compare: "gdppc" };

function route() {
  const hash = location.hash.replace(/^#\/?/, "");
  const [page] = hash.split("?");
  return VIEWS[page] ? page : "";
}

function render() {
  const page = route();
  const y = window.scrollY;
  if (page === "population") app.innerHTML = populationView(state.population);
  else if (page === "economy") app.innerHTML = economyView(state.economy);
  else if (page === "compare") app.innerHTML = compareView(state.compare);
  else app.innerHTML = VIEWS[page]();
  navLinks.forEach((a) => {
    const target = a.getAttribute("href").replace(/^#\/?/, "");
    a.classList.toggle("on", target === page);
    if (target === page) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  document.title = page
    ? `AngkaNusa — ${page[0].toUpperCase() + page.slice(1)} · Indonesia in Numbers`
    : "AngkaNusa — Indonesia in Numbers";
  window.scrollTo(0, y);
  wireControls();
}

// Wire the controls of the page that was just rendered.
function wireControls() {
  // Metric tabs: switch the chart, the table and the source line by
  // re-rendering the page with the new tab active.
  app.querySelectorAll("[data-tabs]").forEach((box) => {
    box.addEventListener("click", (ev) => {
      const btn = ev.target.closest("button[data-tab]");
      if (!btn) return;
      state[box.dataset.tabs] = btn.dataset.tab;
      render();
    });
  });
  // Compare indicator: re-render the compare page with the new indicator.
  const sel = document.getElementById("compare-indicator");
  if (sel) {
    sel.addEventListener("change", () => {
      state.compare = sel.value;
      render();
    });
  }
  // Data filter: hide rows whose label or code does not contain the text.
  const filter = document.getElementById("data-filter");
  const table = document.getElementById("data-table");
  const count = document.getElementById("data-count");
  if (filter && table) {
    filter.addEventListener("input", () => {
      const q = filter.value.trim().toLowerCase();
      let shown = 0;
      table.querySelectorAll("tbody tr").forEach((tr) => {
        const hit = !q || tr.dataset.label.includes(q);
        tr.style.display = hit ? "" : "none";
        if (hit) shown += 1;
      });
      if (count) {
        count.textContent = q
          ? `${shown} of 40 indicators match “${filter.value.trim()}”`
          : "40 indicators · all from the World Bank, World Development Indicators";
      }
    });
  }
}

window.addEventListener("hashchange", render);
render();
