# AngkaNusa — Indonesia in Numbers

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/sarnyadefi-hue/angkanusa/rank.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/sarnyadefi-hue/angkanusa/reward.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)

A national statistics site for Indonesia: population, economy, health and
education, environment and energy, an ASEAN comparison, and a searchable
index of every indicator — real figures from the World Bank's World
Development Indicators, each printed with its source and year.

## The site

- **Home** — one headline number (283.5 million people, 2024), the six key
  figures, a 10-year population chart with its data table, and contents.
- **01 Population** — growth, density, urban share, age structure; metric
  tabs switch the chart between population, growth rate and urban share.
- **02 Economy** — GDP, growth, GDP per capita; tabs switch the chart;
  sector shares; trade and investment notes.
- **03 Health & Education** — life expectancy, child and maternal
  mortality, literacy, schooling, sanitation, electricity.
- **04 Environment & Energy** — forest cover, energy use, renewables,
  internet use.
- **05 Compare ASEAN** — Indonesia beside Malaysia, Singapore, Thailand,
  Vietnam and the Philippines; the indicator selector re-draws the chart
  and the table. Indonesia's bar is capped red.
- **06 All Data** — all 40 indicators in one table with latest value,
  unit, year and WDI code; type to filter.
- **07 Sources** — method, what is left out and why, every WDI code used.

Every chart carries its data table directly beneath it — no chart without
its numbers. The design is a ledger: paper ground, ink navy, one vermilion
headline number per page, hairlines, no rounded cards, no shadows.

## Run it

```sh
node serve.ts
# open http://localhost:8080
```

No build step, no network at runtime: `app/` is plain static files.

## Data

World Bank, World Development Indicators, fetched from
`api.worldbank.org/v2` on 26 November 2026. Every figure is printed with
its year; where the World Bank publishes no recent value, the latest
available year is shown instead of a guess. Two series the World Bank no
longer publishes through this API (CO₂ per capita, government debt) are
left out rather than filled from memory.

## Verification

- `node serve.ts`, open every page in desktop Chrome and at phone size;
  click every link, tab, selector and the filter — all controls work.
- Screenshots in `screenshots/` are real renders of this code:
  `1-home.jpg` (1280×800, cover), `2-economy.jpg`, `3-compare.jpg`,
  `4-home-phone.jpg` (390×844).
- `mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts` writes the
  hand-in to `out/` (app/ + screenshots/ + dossier.json).

## Layout

- `main.ts` — the entrypoint: copies app/ + screenshots/ and writes
  dossier.json with the vendored make.fun library.
- `app/index.html` — the shell (masthead, contents nav, footer).
- `app/style.css` — the ledger design.
- `app/data.js` — every figure, with its year and WDI code.
- `app/charts.js` — hand-rolled SVG bar, line and comparison charts.
- `app/views.js` — one function per page.
- `app/main.js` — the hash router and the working controls.
- `vendor/makefun-frontend.ts` — the kit's dossier library, unchanged.
