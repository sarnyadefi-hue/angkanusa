// AngkaNusa data — every figure is a real World Bank, World Development
// Indicators (WDI) value, fetched from api.worldbank.org on 26 Nov 2026.
// Series are aligned to YEARS (2014-2024). Sparse series carry only the
// years the WDI publishes. Nothing here is invented, estimated or rounded
// beyond the decimals shown; the site prints each figure with its year.

export const YEARS = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
export const SOURCE = "World Bank, World Development Indicators";
export const FETCHED = "26 Nov 2026";

// Full 2014-2024 series. GDP in $bn; population in millions; the rest as
// the WDI reports them (%, years, per 1,000, per km2, kg of oil equivalent).
export const SERIES = {
  pop: [258.9, 261.8, 264.6, 267.3, 270.0, 272.5, 274.8, 276.8, 278.8, 281.2, 283.5],
  gdp: [890.8, 860.9, 931.9, 1015.6, 1042.3, 1119.1, 1059.1, 1186.5, 1319.1, 1371.2, 1396.3],
  gdppc: [3441, 3288, 3521, 3799, 3861, 4107, 3854, 4287, 4731, 4876, 4925],
  growth: [5.01, 4.88, 5.03, 5.07, 5.17, 5.02, -2.07, 3.70, 5.31, 5.05, 5.03],
  life: [69.29, 69.52, 69.73, 69.95, 70.08, 70.35, 68.82, 67.45, 70.92, 71.15, 71.29],
  unemp: [4.05, 4.51, 4.30, 3.78, 4.39, 3.59, 4.25, 3.83, 3.46, 3.31, 3.30],
  infl: [6.39, 6.36, 3.53, 3.81, 3.20, 3.03, 1.92, 1.56, 4.21, 3.67, 2.18],
  u5mort: [27.3, 26.1, 25.0, 23.8, 22.8, 21.8, 20.8, 19.9, 19.1, 18.4, 17.7],
  forest: [50.75, 50.61, 50.67, 50.73, 50.78, 50.84, 50.90, 50.54, 50.58, 50.63, 50.67],
  urban: [52.50, 53.17, 53.81, 54.45, 55.10, 55.74, 56.28, 56.88, 57.49, 58.12, 58.75],
  popgrow: [1.18, 1.12, 1.07, 1.02, 0.97, 0.94, 0.85, 0.70, 0.75, 0.84, 0.81],
  internet: [17.14, 22.06, 25.45, 32.34, 39.90, 47.69, 53.73, 62.10, 66.48, 69.21, 72.78],
  pop65: [6.04, 6.08, 6.15, 6.24, 6.35, 6.49, 6.61, 6.69, 6.82, 7.05, 7.29],
  pop014: [27.15, 26.97, 26.77, 26.56, 26.33, 26.09, 25.83, 25.58, 25.27, 24.93, 24.60],
  exports: [23.67, 21.16, 19.09, 20.18, 21.00, 18.59, 17.33, 21.42, 24.50, 21.81, 22.31],
  imports: [24.41, 20.78, 18.33, 19.18, 22.07, 19.04, 15.64, 18.79, 20.96, 19.65, 20.50],
  density: [137.88, 139.44, 140.95, 142.39, 143.78, 145.13, 146.37, 146.24, 147.33, 148.59, 149.80],
  energy: [709.4, 703.7, 723.8, 760.8, 832.8, 850.0, 856.0, 904.4, 969.8, 991.8, 1019.8],
  labforce: [125.6, 127.3, 128.5, 130.9, 134.5, 137.4, 137.4, 135.7, 139.6, 143.3, 145.2],
  fertility: [2.39, 2.35, 2.31, 2.25, 2.22, 2.21, 2.19, 2.17, 2.15, 2.13, 2.12],
  sanitation: [69.83, 71.89, 73.96, 76.03, 78.10, 80.18, 82.26, 84.34, 85.65, 86.94, 88.20],
  water: [86.91, 87.30, 87.68, 88.05, 88.41, 88.75, 89.09, 89.40, 89.71, 89.36, 89.01],
  electric: [97.0, 97.5, 97.6, 98.1, 98.5, 98.8, 97.0, 99.2, 100.0, 99.4, 99.9],
  gdpPppPc: [10065, 10028, 10263, 10688, 11372, 11986, 11729, 12757, 14283, 15428, 16472],
  agri: [13.34, 13.49, 13.48, 13.16, 12.81, 12.71, 13.70, 13.28, 12.40, 12.53, 12.61],
  industry: [41.93, 40.05, 39.31, 39.38, 39.73, 38.95, 38.24, 39.84, 41.43, 40.22, 39.32],
  services: [42.24, 43.31, 43.64, 43.61, 43.40, 44.22, 44.41, 42.82, 41.79, 42.88, 43.77],
  fdi: [2.82, 2.30, 0.49, 2.02, 1.81, 2.23, 1.81, 1.79, 1.87, 1.57, 1.74],
  trade: [48.08, 41.94, 37.42, 39.36, 43.07, 37.63, 32.97, 40.20, 45.46, 41.46, 42.81],
  rural: [47.50, 46.83, 46.19, 45.55, 44.90, 44.26, 43.72, 43.12, 42.51, 41.88, 41.25],
  pop1564: [66.81, 66.95, 67.08, 67.20, 67.31, 67.42, 67.56, 67.74, 67.90, 68.02, 68.11],
  gniPc: [3570, 3390, 3370, 3490, 3810, 4020, 3850, 4130, 4520, 4810, 4920],
  poverty: [11.3, 11.2, 10.9, 10.6, 9.8, 9.4, 9.8, 10.1, 9.5, 9.4, 9.0],
};

// Sparse series: only the years the WDI publishes.
export const SPARSE = {
  literacy: { 2014: 95.1, 2015: 95.2, 2016: 95.4, 2018: 95.7, 2020: 96.0 },
  primEnr: { 2014: 90.0, 2016: 92.8, 2017: 94.1, 2018: 93.5 },
  secEnr: { 2014: 75.2, 2015: 75.8, 2018: 78.7 },
  eduSpend: { 2014: 3.29, 2015: 3.58, 2016: 1.21, 2017: 1.05, 2018: 0.99, 2019: 0.96, 2020: 1.02, 2021: 1.03, 2022: 0.86, 2023: 1.28 },
  healthSpend: { 2014: 2.96, 2015: 2.92, 2016: 3.02, 2017: 2.90, 2018: 2.87, 2019: 2.88, 2020: 3.42, 2021: 3.71, 2022: 2.69, 2023: 2.70 },
  renew: { 2014: 29.3, 2015: 26.6, 2016: 27.8, 2017: 25.2, 2018: 22.0, 2019: 19.8, 2020: 21.9, 2021: 20.2 },
  mmat: { 2014: 198, 2015: 190, 2016: 182, 2017: 173, 2018: 168, 2019: 161, 2020: 184, 2021: 226, 2022: 148, 2023: 140 },
};

// Headline figures: value, unit, year, WDI code. Shown on the home page.
export const HEADLINES = [
  { key: "pop", label: "Population", value: "283.5M", unit: "people", year: 2024, code: "SP.POP.TOTL" },
  { key: "gdp", label: "GDP", value: "$1,396B", unit: "current US$", year: 2024, code: "NY.GDP.MKTP.CD" },
  { key: "growth", label: "GDP growth", value: "5.0%", unit: "annual", year: 2024, code: "NY.GDP.MKTP.KD.ZG" },
  { key: "life", label: "Life expectancy", value: "71.3", unit: "years", year: 2024, code: "SP.DYN.LE00.IN" },
  { key: "unemp", label: "Unemployment", value: "3.3%", unit: "of labour force", year: 2024, code: "SL.UEM.TOTL.ZS" },
  { key: "infl", label: "Inflation", value: "2.2%", unit: "consumer prices", year: 2024, code: "FP.CPI.TOTL.ZG" },
];

// ASEAN comparison, latest year (2024) for every country. Source: WDI.
export const ASEAN = {
  IDN: { name: "Indonesia", pop: 283.5, gdp: 1396.3, gdppc: 4925, growth: 5.03, life: 71.29, unemp: 3.30, infl: 2.18, urban: 58.75, internet: 72.78, forest: 50.67, density: 149.80 },
  MYS: { name: "Malaysia", pop: 35.6, gdp: 422.2, gdppc: 11874, growth: 5.11, life: 76.82, unemp: 3.85, infl: 1.83, urban: 76.92, internet: 98.02, forest: 57.66, density: 108.23 },
  SGP: { name: "Singapore", pop: 6.0, gdp: 572.9, gdppc: 94897, growth: 5.34, life: 83.35, unemp: 2.74, infl: 2.39, urban: 100.0, internet: 94.38, forest: 21.80, density: 8329.0 },
  THA: { name: "Thailand", pop: 71.7, gdp: 529.4, gdppc: 7387, growth: 2.95, life: 76.56, unemp: 0.78, infl: 0.40, urban: 61.87, internet: 90.87, forest: 38.73, density: 140.28 },
  VNM: { name: "Vietnam", pop: 101.0, gdp: 476.3, gdppc: 4717, growth: 7.04, life: 74.74, unemp: 1.60, infl: 3.62, urban: 38.49, internet: 84.15, forest: 47.12, density: 322.20 },
  PHL: { name: "Philippines", pop: 115.8, gdp: 461.7, gdppc: 3985, growth: 5.71, life: 69.95, unemp: 2.20, infl: 3.21, urban: 55.45, internet: 67.26, forest: 24.81, density: 388.52 },
};

// Compare-page indicator menu: key, label, unit, formatter.
export const COMPARE_INDICATORS = [
  { key: "pop", label: "Population (millions)", unit: "million people", fmt: (v) => v.toFixed(1) },
  { key: "gdp", label: "GDP ($ billion)", unit: "$ billion", fmt: (v) => "$" + v.toFixed(1) + "B" },
  { key: "gdppc", label: "GDP per capita ($)", unit: "$", fmt: (v) => "$" + v.toLocaleString("en-US") },
  { key: "growth", label: "GDP growth (% per year)", unit: "%", fmt: (v) => v.toFixed(2) + "%" },
  { key: "life", label: "Life expectancy (years)", unit: "years", fmt: (v) => v.toFixed(1) },
  { key: "unemp", label: "Unemployment (% of labour force)", unit: "%", fmt: (v) => v.toFixed(2) + "%" },
  { key: "infl", label: "Inflation (% per year)", unit: "%", fmt: (v) => v.toFixed(2) + "%" },
  { key: "urban", label: "Urban population (% of total)", unit: "%", fmt: (v) => v.toFixed(1) + "%" },
  { key: "internet", label: "Internet users (% of population)", unit: "%", fmt: (v) => v.toFixed(1) + "%" },
  { key: "forest", label: "Forest area (% of land)", unit: "%", fmt: (v) => v.toFixed(1) + "%" },
  { key: "density", label: "Population density (people per km²)", unit: "per km²", fmt: (v) => v.toLocaleString("en-US", { maximumFractionDigits: 0 }) },
];

// The full indicator index for the All Data page: label, key or sparse key,
// WDI code, unit, and how to read the latest value.
export const INDEX = [
  { label: "Population", key: "pop", code: "SP.POP.TOTL", unit: "people", digits: 1, suffix: "M" },
  { label: "Population growth", key: "popgrow", code: "SP.POP.GROW", unit: "% per year", digits: 2, suffix: "%" },
  { label: "Population density", key: "density", code: "EN.POP.DNST", unit: "people per km²", digits: 1 },
  { label: "Population ages 0–14", key: "pop014", code: "SP.POP.0014.TO.ZS", unit: "% of total", digits: 1, suffix: "%" },
  { label: "Population ages 15–64", key: "pop1564", code: "SP.POP.1564.TO.ZS", unit: "% of total", digits: 1, suffix: "%" },
  { label: "Population ages 65+", key: "pop65", code: "SP.POP.65UP.TO.ZS", unit: "% of total", digits: 1, suffix: "%" },
  { label: "Fertility rate", key: "fertility", code: "SP.DYN.TFRT.IN", unit: "births per woman", digits: 2 },
  { label: "Urban population", key: "urban", code: "SP.URB.TOTL.IN.ZS", unit: "% of total", digits: 1, suffix: "%" },
  { label: "Rural population", key: "rural", code: "SP.RUR.TOTL.ZS", unit: "% of total", digits: 1, suffix: "%" },
  { label: "GDP", key: "gdp", code: "NY.GDP.MKTP.CD", unit: "current US$", scale: 1, digits: 1, prefix: "$", suffix: "B" },
  { label: "GDP per capita", key: "gdppc", code: "NY.GDP.PCAP.CD", unit: "current US$", digits: 0, prefix: "$" },
  { label: "GDP per capita, PPP", key: "gdpPppPc", code: "NY.GDP.PCAP.PP.CD", unit: "current intl $", digits: 0, prefix: "$" },
  { label: "GNI per capita", key: "gniPc", code: "NY.GNP.PCAP.CD", unit: "current US$", digits: 0, prefix: "$" },
  { label: "GDP growth", key: "growth", code: "NY.GDP.MKTP.KD.ZG", unit: "% per year", digits: 2, suffix: "%" },
  { label: "Inflation, consumer prices", key: "infl", code: "FP.CPI.TOTL.ZG", unit: "% per year", digits: 2, suffix: "%" },
  { label: "Unemployment", key: "unemp", code: "SL.UEM.TOTL.ZS", unit: "% of labour force", digits: 2, suffix: "%" },
  { label: "Labour force", key: "labforce", code: "SL.TLF.TOTL.IN", unit: "people", digits: 1, suffix: "M" },
  { label: "Exports of goods and services", key: "exports", code: "NE.EXP.GNFS.ZS", unit: "% of GDP", digits: 1, suffix: "%" },
  { label: "Imports of goods and services", key: "imports", code: "NE.IMP.GNFS.ZS", unit: "% of GDP", digits: 1, suffix: "%" },
  { label: "Trade", key: "trade", code: "NE.TRD.GNFS.ZS", unit: "% of GDP", digits: 1, suffix: "%" },
  { label: "Foreign direct investment, net inflows", key: "fdi", code: "BX.KLT.DINV.WD.GD.ZS", unit: "% of GDP", digits: 2, suffix: "%" },
  { label: "Agriculture, value added", key: "agri", code: "NV.AGR.TOTL.ZS", unit: "% of GDP", digits: 1, suffix: "%" },
  { label: "Industry, value added", key: "industry", code: "NV.IND.TOTL.ZS", unit: "% of GDP", digits: 1, suffix: "%" },
  { label: "Services, value added", key: "services", code: "NV.SRV.TOTL.ZS", unit: "% of GDP", digits: 1, suffix: "%" },
  { label: "Life expectancy at birth", key: "life", code: "SP.DYN.LE00.IN", unit: "years", digits: 1 },
  { label: "Mortality rate, under-5", key: "u5mort", code: "SH.DYN.MORT", unit: "per 1,000 live births", digits: 1 },
  { label: "Maternal mortality ratio", sparse: "mmat", code: "SH.STA.MMRT", unit: "per 100,000 live births", digits: 0 },
  { label: "Literacy rate, adult", sparse: "literacy", code: "SE.ADT.LITR.ZS", unit: "% of people 15+", digits: 1, suffix: "%" },
  { label: "School enrolment, primary", sparse: "primEnr", code: "SE.PRM.NENR", unit: "% net", digits: 1, suffix: "%" },
  { label: "School enrolment, secondary", sparse: "secEnr", code: "SE.SEC.NENR", unit: "% net", digits: 1, suffix: "%" },
  { label: "Government expenditure on education", sparse: "eduSpend", code: "SE.XPD.TOTL.GD.ZS", unit: "% of GDP", digits: 2, suffix: "%" },
  { label: "Current health expenditure", sparse: "healthSpend", code: "SH.XPD.CHEX.GD.ZS", unit: "% of GDP", digits: 2, suffix: "%" },
  { label: "People using safely managed sanitation", key: "sanitation", code: "SH.STA.BASS.ZS", unit: "% of population", digits: 1, suffix: "%" },
  { label: "People using safely managed drinking water", key: "water", code: "SH.H2O.BASW.ZS", unit: "% of population", digits: 1, suffix: "%" },
  { label: "Access to electricity", key: "electric", code: "EG.ELC.ACCS.ZS", unit: "% of population", digits: 1, suffix: "%" },
  { label: "Internet users", key: "internet", code: "IT.NET.USER.ZS", unit: "% of population", digits: 1, suffix: "%" },
  { label: "Forest area", key: "forest", code: "AG.LND.FRST.ZS", unit: "% of land area", digits: 1, suffix: "%" },
  { label: "Renewable energy consumption", sparse: "renew", code: "EG.FEC.RNEW.ZS", unit: "% of final energy", digits: 1, suffix: "%" },
  { label: "Energy use per capita", key: "energy", code: "EG.USE.PCAP.KG.OE", unit: "kg of oil equivalent", digits: 0 },
  { label: "Poverty headcount ratio", key: "poverty", code: "SI.POV.NAHC", unit: "% of population", digits: 1, suffix: "%" },
];

// Latest value + year for one INDEX row.
export function latestOf(row) {
  if (row.sparse) {
    const m = SPARSE[row.sparse];
    const years = Object.keys(m).map(Number).sort((a, b) => a - b);
    const y = years[years.length - 1];
    return { value: m[y], year: y };
  }
  const s = SERIES[row.key];
  return { value: s[s.length - 1], year: YEARS[YEARS.length - 1] };
}
