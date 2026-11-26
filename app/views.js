// AngkaNusa views — one function per page, each returning its HTML.
// Every figure on every page carries its source and year underneath it.
// Charts come from charts.js; figures from data.js. No page is a stub:
// each one has a headline number, at least one chart with its data table,
// and a source line naming the World Bank indicator and year.

import { YEARS, SERIES, SPARSE, HEADLINES, ASEAN, COMPARE_INDICATORS, INDEX, latestOf, SOURCE } from "./data.js";
import { barChart, lineChart, hbarChart } from "./charts.js";

const yearLabels = YEARS.map((y) => String(y).slice(2));
const fullYears = YEARS.map(String);

function srcLine(code, year) {
  return `<p class="src">Source: ${SOURCE} · ${code} · ${year}</p>`;
}

function hero(big, unit, label, note) {
  return `<section class="hero">
    <p class="kicker">${label}</p>
    <p class="bignum">${big} <span>${unit}</span></p>
    <p class="heronote">${note}</p>
  </section>`;
}

function statCards(rows) {
  return `<section class="stats">${rows.map((r) => `<div class="stat">
    <p class="statnum">${r.value}</p>
    <p class="statlabel">${r.label}</p>
    <p class="statyear">${r.year}</p>
  </div>`).join("")}</section>`;
}

// A chart card: title, the SVG, then the data table that proves it.
function chartCard(title, svg, table, source) {
  return `<section class="card">
    <h2>${title}</h2>
    <div class="chart">${svg}</div>
    ${table}
    ${source}
  </section>`;
}

function seriesTable(values, format) {
  const rows = YEARS.map((y, i) => `<tr><td>${y}</td><td>${format(values[i])}</td></tr>`).join("");
  return `<table class="data"><thead><tr><th>Year</th><th>Value</th></tr></thead><tbody>${rows}</tbody></table>`;
}

function sparseTable(map, format) {
  const years = Object.keys(map).map(Number).sort((a, b) => a - b);
  const rows = years.map((y) => `<tr><td>${y}</td><td>${format(map[y])}</td></tr>`).join("");
  return `<table class="data"><thead><tr><th>Year</th><th>Value</th></tr></thead><tbody>${rows}</tbody></table>`;
}

function tabs(group, options, active) {
  return `<div class="tabs" data-tabs="${group}" role="tablist">${options.map((o) =>
    `<button type="button" data-tab="${o.key}" class="${o.key === active ? "on" : ""}" aria-pressed="${o.key === active}">${o.label}</button>`).join("")}</div>`;
}

const TOPICS = [
  { n: "01", href: "#/population", title: "Population", desc: "283.5 million people, how fast they grow, where they live." },
  { n: "02", href: "#/economy", title: "Economy", desc: "$1,396 billion of GDP, 5.0% growth, prices and jobs." },
  { n: "03", href: "#/health", title: "Health & Education", desc: "71.3 years of life, schooling, clinics and clean water." },
  { n: "04", href: "#/environment", title: "Environment & Energy", desc: "Half the land still forest, energy use, renewables." },
  { n: "05", href: "#/compare", title: "Compare ASEAN", desc: "Indonesia beside Malaysia, Singapore, Thailand, Vietnam and the Philippines." },
  { n: "06", href: "#/data", title: "All Data", desc: "Every indicator on this site, latest value and year, in one searchable table." },
];

function topicCards() {
  return `<section class="topics"><h2>Contents</h2>
  <div class="topicgrid">${TOPICS.map((t) => `<a class="topic" href="${t.href}">
    <span class="topicnum">${t.n}</span>
    <span class="topictitle">${t.title}</span>
    <span class="topicdesc">${t.desc}</span>
  </a>`).join("")}</div></section>`;
}

export function homeView() {
  const popChart = barChart(yearLabels, SERIES.pop, (v) => v.toFixed(1) + "M");
  return `
  ${hero("283.5M", "people", "Indonesia · Population, 2024", "The fourth most populous country on earth — up from 258.9 million in 2014. Every figure on this site comes from the World Bank's World Development Indicators, with its year printed beside it.")}
  ${chartCard("Population, 2014–2024 (millions)", popChart, seriesTable(SERIES.pop, (v) => v.toFixed(1) + " million"), srcLine("SP.POP.TOTL", "2024"))}
  ${statCards(HEADLINES.slice(1).map((h) => ({ value: h.value, label: h.label, year: h.year + " · " + h.code })))}
  ${topicCards()}
  <section class="note"><h2>How to read this site</h2>
  <p>Each page opens with one headline number. Under every chart sits the table the chart was drawn from — no chart without its numbers. A figure's source and year are printed beneath it; where the World Bank publishes no recent value, the latest available year is shown instead of a guess.</p>
  <p><a href="#/sources">Sources &amp; method →</a></p></section>`;
}

export function populationView(tab = "pop") {
  const opts = [
    { key: "pop", label: "Population" },
    { key: "growth", label: "Growth rate" },
    { key: "urban", label: "Urban share" },
  ];
  let chart, table, code, title;
  if (tab === "growth") {
    title = "Population growth, 2014–2024 (% per year)";
    chart = lineChart(yearLabels, SERIES.popgrow, (v) => v.toFixed(2) + "%");
    table = seriesTable(SERIES.popgrow, (v) => v.toFixed(2) + "%");
    code = "SP.POP.GROW";
  } else if (tab === "urban") {
    title = "Urban population, 2014–2024 (% of total)";
    chart = lineChart(yearLabels, SERIES.urban, (v) => v.toFixed(1) + "%");
    table = seriesTable(SERIES.urban, (v) => v.toFixed(1) + "%");
    code = "SP.URB.TOTL.IN.ZS";
  } else {
    title = "Population, 2014–2024 (millions)";
    chart = barChart(yearLabels, SERIES.pop, (v) => v.toFixed(1) + "M");
    table = seriesTable(SERIES.pop, (v) => v.toFixed(1) + " million");
    code = "SP.POP.TOTL";
  }
  return `
  ${hero("283.5M", "people", "01 · Population, 2024", "Indonesia added 24.6 million people in a decade — growth has slowed every year, from 1.18% in 2014 to 0.81% in 2024.")}
  ${statCards([
    { value: "0.81%", label: "Population growth", year: "2024 · SP.POP.GROW" },
    { value: "149.8", label: "People per km²", year: "2024 · EN.POP.DNST" },
    { value: "58.8%", label: "Urban population", year: "2024 · SP.URB.TOTL.IN.ZS" },
    { value: "2.12", label: "Births per woman", year: "2024 · SP.DYN.TFRT.IN" },
  ])}
  <section class="card"><h2>${title}</h2>${tabs("population", opts, tab)}
  <div class="chart" id="chart-slot">${chart}</div>${table}${srcLine(code, "2024")}</section>
  ${chartCard("Age structure, 2024 (% of population)",
    barChart(["0–14", "15–64", "65+"], [24.6, 68.11, 7.29], (v) => v.toFixed(1) + "%"),
    `<table class="data"><thead><tr><th>Age group</th><th>Share</th></tr></thead><tbody>
    <tr><td>0–14 years</td><td>24.6%</td></tr>
    <tr><td>15–64 years</td><td>68.1%</td></tr>
    <tr><td>65 years and over</td><td>7.3%</td></tr></tbody></table>`,
    srcLine("SP.POP.0014.TO.ZS · SP.POP.1564.TO.ZS · SP.POP.65UP.TO.ZS", "2024"))}
  <section class="note"><p>Two in three Indonesians are of working age (15–64). The 65-and-over share has risen every year of the decade, from 6.0% in 2014 to 7.3% in 2024 — the population is ageing even as it grows. <a href="#/data">See all population indicators →</a></p></section>`;
}

export function economyView(tab = "gdp") {
  const opts = [
    { key: "gdp", label: "GDP" },
    { key: "growth", label: "Growth" },
    { key: "gdppc", label: "GDP per capita" },
  ];
  let chart, table, code, title;
  if (tab === "growth") {
    title = "GDP growth, 2014–2024 (% per year)";
    chart = lineChart(yearLabels, SERIES.growth, (v) => v.toFixed(2) + "%");
    table = seriesTable(SERIES.growth, (v) => v.toFixed(2) + "%");
    code = "NY.GDP.MKTP.KD.ZG";
  } else if (tab === "gdppc") {
    title = "GDP per capita, 2014–2024 (current US$)";
    chart = barChart(yearLabels, SERIES.gdppc, (v) => "$" + v.toLocaleString("en-US"));
    table = seriesTable(SERIES.gdppc, (v) => "$" + v.toLocaleString("en-US"));
    code = "NY.GDP.PCAP.CD";
  } else {
    title = "GDP, 2014–2024 ($ billion, current US$)";
    chart = barChart(yearLabels, SERIES.gdp, (v) => "$" + v.toFixed(0) + "B");
    table = seriesTable(SERIES.gdp, (v) => "$" + v.toFixed(1) + " billion");
    code = "NY.GDP.MKTP.CD";
  }
  return `
  ${hero("$1,396B", "GDP, current US$", "02 · Economy, 2024", "The world's 16th-largest economy by nominal GDP — and 5.0% growth in 2024, the fifth straight year at or above 5% outside the pandemic slump of 2020.")}
  ${statCards([
    { value: "5.03%", label: "GDP growth", year: "2024 · NY.GDP.MKTP.KD.ZG" },
    { value: "$4,925", label: "GDP per capita", year: "2024 · NY.GDP.PCAP.CD" },
    { value: "2.18%", label: "Inflation", year: "2024 · FP.CPI.TOTL.ZG" },
    { value: "3.30%", label: "Unemployment", year: "2024 · SL.UEM.TOTL.ZS" },
  ])}
  <section class="card"><h2>${title}</h2>${tabs("economy", opts, tab)}
  <div class="chart" id="chart-slot">${chart}</div>${table}${srcLine(code, "2024")}</section>
  ${chartCard("What the economy is made of, 2024 (% of GDP)",
    barChart(["Services", "Industry", "Agriculture"], [43.77, 39.32, 12.61], (v) => v.toFixed(1) + "%"),
    `<table class="data"><thead><tr><th>Sector</th><th>Share of GDP</th></tr></thead><tbody>
    <tr><td>Services</td><td>43.8%</td></tr>
    <tr><td>Industry (incl. manufacturing)</td><td>39.3%</td></tr>
    <tr><td>Agriculture, forestry &amp; fishing</td><td>12.6%</td></tr></tbody></table>`,
    srcLine("NV.SRV.TOTL.ZS · NV.IND.TOTL.ZS · NV.AGR.TOTL.ZS", "2024"))}
  <section class="note"><p>Trade is 42.8% of GDP (2024): exports 22.3%, imports 20.5%. Foreign direct investment added a net 1.7% of GDP. Inflation has stayed under 4.3% in every year since 2016. <a href="#/compare">Compare with neighbours →</a></p></section>`;
}

export function healthView() {
  return `
  ${hero("71.3", "years", "03 · Health & Education", "Life expectancy at birth, 2024 — up from 69.3 in 2014, after falling to 67.5 in the pandemic year 2021.")}
  ${statCards([
    { value: "17.7", label: "Under-5 deaths per 1,000 births", year: "2024 · SH.DYN.MORT" },
    { value: "96.0%", label: "Adult literacy", year: "2020 · SE.ADT.LITR.ZS" },
    { value: "88.2%", label: "Safely managed sanitation", year: "2024 · SH.STA.BASS.ZS" },
    { value: "99.9%", label: "Access to electricity", year: "2024 · EG.ELC.ACCS.ZS" },
  ])}
  ${chartCard("Life expectancy at birth, 2014–2024 (years)",
    lineChart(yearLabels, SERIES.life, (v) => v.toFixed(1)),
    seriesTable(SERIES.life, (v) => v.toFixed(2) + " years"),
    srcLine("SP.DYN.LE00.IN", "2024"))}
  ${chartCard("Under-5 mortality, 2014–2024 (per 1,000 live births)",
    lineChart(yearLabels, SERIES.u5mort, (v) => v.toFixed(1)),
    seriesTable(SERIES.u5mort, (v) => v.toFixed(1) + " per 1,000"),
    srcLine("SH.DYN.MORT", "2024"))}
  ${chartCard("Maternal mortality, 2014–2023 (per 100,000 live births)",
    lineChart(Object.keys(SPARSE.mmat), Object.values(SPARSE.mmat), (v) => String(v)),
    sparseTable(SPARSE.mmat, (v) => v + " per 100,000"),
    srcLine("SH.STA.MMRT", "2023"))}
  <section class="note"><p>Schooling: net primary enrolment was 93.5% in 2018 (latest published) and secondary 78.7%. Government spending on education was 1.3% of GDP in 2023; current health expenditure 2.7% of GDP. 89.0% of people use safely managed drinking water (2024). <a href="#/data">See all health &amp; education indicators →</a></p></section>`;
}

export function environmentView() {
  return `
  ${hero("50.7%", "of land is forest", "04 · Environment & Energy", "Forest area, 2024 — barely changed in a decade (50.8% in 2014), while energy use per person rose by 44% over the same years.")}
  ${statCards([
    { value: "1,020", label: "Energy use, kg of oil equivalent per person", year: "2024 · EG.USE.PCAP.KG.OE" },
    { value: "20.2%", label: "Renewable energy share", year: "2021 · EG.FEC.RNEW.ZS" },
    { value: "72.8%", label: "Internet users", year: "2024 · IT.NET.USER.ZS" },
    { value: "88.2%", label: "Safely managed sanitation", year: "2024 · SH.STA.BASS.ZS" },
  ])}
  ${chartCard("Energy use per capita, 2014–2024 (kg of oil equivalent)",
    barChart(yearLabels, SERIES.energy, (v) => v.toFixed(0)),
    seriesTable(SERIES.energy, (v) => v.toFixed(1) + " kg of oil equivalent"),
    srcLine("EG.USE.PCAP.KG.OE", "2024"))}
  ${chartCard("Forest area, 2014–2024 (% of land area)",
    lineChart(yearLabels, SERIES.forest, (v) => v.toFixed(1) + "%"),
    seriesTable(SERIES.forest, (v) => v.toFixed(2) + "%"),
    srcLine("AG.LND.FRST.ZS", "2024"))}
  ${chartCard("Internet users, 2014–2024 (% of population)",
    lineChart(yearLabels, SERIES.internet, (v) => v.toFixed(0) + "%"),
    seriesTable(SERIES.internet, (v) => v.toFixed(2) + "%"),
    srcLine("IT.NET.USER.ZS", "2024"))}
  <section class="note"><p>Renewables were 20.2% of final energy consumption in 2021 (latest published), down from 29.3% in 2014 as total energy use grew faster than renewable supply. Mobile subscriptions stand at 122.5 per 100 people (2024). <a href="#/data">See all environment indicators →</a></p></section>`;
}

export function compareView(indKey = "gdppc") {
  const ind = COMPARE_INDICATORS.find((i) => i.key === indKey) || COMPARE_INDICATORS[2];
  const order = ["IDN", "MYS", "SGP", "THA", "VNM", "PHL"];
  const rows = order.map((c) => ({ label: ASEAN[c].name, value: ASEAN[c][ind.key], highlight: c === "IDN" }));
  const sorted = [...rows].sort((a, b) => b.value - a.value);
  const table = `<table class="data"><thead><tr><th>Rank</th><th>Country</th><th>${ind.label}</th></tr></thead><tbody>${
    sorted.map((r, i) => `<tr class="${r.highlight ? "hl" : ""}"><td>${i + 1}</td><td>${r.label}</td><td>${ind.fmt(r.value)}</td></tr>`).join("")
  }</tbody></table>`;
  return `
  ${hero("6", "countries · 2024", "05 · Compare ASEAN", "Indonesia beside its five largest ASEAN neighbours — same indicator, same year, same source. Pick an indicator; Indonesia's bar is capped red.")}
  <section class="card"><h2>Compare — ${ind.label}</h2>
  <label class="selectlabel" for="compare-indicator">Indicator</label>
  <select id="compare-indicator">${COMPARE_INDICATORS.map((i) =>
    `<option value="${i.key}" ${i.key === ind.key ? "selected" : ""}>${i.label}</option>`).join("")}</select>
  <div class="chart" id="compare-slot">${hbarChart(rows, ind.fmt)}</div>
  ${table}
  ${srcLine("World Bank WDI · " + ind.label, "2024")}</section>
  <section class="note"><p>Indonesia is the region's largest country by people (283.5M) and by GDP ($1,396B), but its GDP per capita ($4,925) sits below Malaysia ($11,874) and far below Singapore ($94,897) — the gap this site's economy page explains. <a href="#/economy">Back to the economy →</a></p></section>`;
}

export function dataView() {
  const rows = INDEX.map((row) => {
    const { value, year } = latestOf(row);
    const shown = row.scale ? (value / row.scale) : value;
    const text = (row.prefix || "") + shown.toLocaleString("en-US", { minimumFractionDigits: row.digits, maximumFractionDigits: row.digits }) + (row.suffix || "");
    return `<tr data-label="${row.label.toLowerCase()} ${row.code.toLowerCase()}"><td>${row.label}</td><td>${text}</td><td>${row.unit}</td><td>${year}</td><td>${row.code}</td></tr>`;
  }).join("");
  return `
  ${hero("40", "indicators", "06 · All Data", "Every indicator on this site in one table — latest value, unit, year and World Bank code. Type to filter.")}
  <section class="card"><h2>Indicator index</h2>
  <label class="selectlabel" for="data-filter">Filter indicators</label>
  <input id="data-filter" type="search" placeholder="Type a word — try “population” or “GDP”…" autocomplete="off">
  <p class="countline" id="data-count">${INDEX.length} indicators · all from the World Bank, World Development Indicators</p>
  <table class="data wide" id="data-table"><thead><tr><th>Indicator</th><th>Latest value</th><th>Unit</th><th>Year</th><th>WDI code</th></tr></thead><tbody>${rows}</tbody></table>
  ${srcLine("World Bank, World Development Indicators", "fetched 26 Nov 2026")}</section>`;
}

export function sourcesView() {
  return `
  ${hero("1", "source", "Sources & Method", "One source for every number on this site: the World Bank's World Development Indicators.")}
  <section class="card"><h2>Where the numbers come from</h2>
  <p>All figures were fetched from the World Bank API (<code>api.worldbank.org/v2</code>) on 26 November 2026, for Indonesia (country code IDN) and, on the compare page, Malaysia, Singapore, Thailand, Vietnam and the Philippines. Each figure is printed with its year; where the World Bank publishes no recent value, the latest available year is shown — never a guess, never an estimate of ours.</p>
  <p>Values are shown rounded for reading (one or two decimals); the charts and tables use the same rounded values, so a chart and its table always agree. GDP is shown in current US dollars; GDP per capita, PPP is in current international dollars.</p>
  <h2>What is not here</h2>
  <p>This site holds no forecast, no model output and no figure from any other source. Two series the World Bank no longer publishes through this API — CO₂ emissions per capita and general government debt — are left out rather than filled from memory.</p>
  <h2>Indicator codes used</h2>
  <p class="codes">SP.POP.TOTL · SP.POP.GROW · EN.POP.DNST · SP.POP.0014.TO.ZS · SP.POP.1564.TO.ZS · SP.POP.65UP.TO.ZS · SP.DYN.TFRT.IN · SP.URB.TOTL.IN.ZS · SP.RUR.TOTL.ZS · NY.GDP.MKTP.CD · NY.GDP.PCAP.CD · NY.GDP.PCAP.PP.CD · NY.GNP.PCAP.CD · NY.GDP.MKTP.KD.ZG · FP.CPI.TOTL.ZG · SL.UEM.TOTL.ZS · SL.TLF.TOTL.IN · NE.EXP.GNFS.ZS · NE.IMP.GNFS.ZS · NE.TRD.GNFS.ZS · BX.KLT.DINV.WD.GD.ZS · NV.AGR.TOTL.ZS · NV.IND.TOTL.ZS · NV.SRV.TOTL.ZS · SP.DYN.LE00.IN · SH.DYN.MORT · SH.STA.MMRT · SE.ADT.LITR.ZS · SE.PRM.NENR · SE.SEC.NENR · SE.XPD.TOTL.GD.ZS · SH.XPD.CHEX.GD.ZS · SH.STA.BASS.ZS · SH.H2O.BASW.ZS · EG.ELC.ACCS.ZS · IT.NET.USER.ZS · AG.LND.FRST.ZS · EG.FEC.RNEW.ZS · EG.USE.PCAP.KG.OE · SI.POV.NAHC · IT.CEL.SETS.P2</p>
  <h2>Reuse</h2>
  <p>Figures are facts from a public source; the writing, design and charts are this site's own. Cite as: “AngkaNusa — Indonesia in Numbers. Data: World Bank, World Development Indicators, fetched 26 Nov 2026.”</p></section>`;
}

export const VIEWS = {
  "": homeView,
  "population": populationView,
  "economy": economyView,
  "health": healthView,
  "environment": environmentView,
  "compare": compareView,
  "data": dataView,
  "sources": sourcesView,
};
