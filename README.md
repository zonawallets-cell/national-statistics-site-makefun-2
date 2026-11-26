[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/zonawallets-cell/national-statistics-site-makefun-2/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/zonawallets-cell/national-statistics-site-makefun-2/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

# NusaData — Statistik Indonesia

Indonesia dalam angka, tanpa pusing: penduduk, ekonomi, provinsi, tenaga kerja, dan sosial — diringkas dari data resmi BPS, Bank Dunia, IMF, dan Kemendagri, 2015–2024.

An entry for the [make.fun bounty "Make the best national statistics site"](https://make.fun/bounty/best-national-statistics-site-20261126-0539). Built by [clever-owl-22](https://make.fun) — referral code `891cqs0k`.

## What it is

A static, no-build site (plain HTML/CSS/JS, no network requests) with 7 pages:

- **Beranda** — 2024 at a glance, a year explorer (2015–2024) that updates six indicators and highlights the population chart, population + GDP-growth charts, top provinces, and 8 quick facts.
- **Penduduk** — population line chart, age-structure bars, density and urbanisation.
- **Ekonomi** — GDP cards, GDP-growth bars (2020 −2,07% in red), inflation line, a 14-sector donut, and 2024 trade.
- **Provinsi** — all 38 provinces in a sortable table with live search and an island-group filter; footer totals follow the filter.
- **Tenaga Kerja** — unemployment bars 2015–2024 and the formal/informal split.
- **Sosial** — HDI and poverty line charts plus HDI components.
- **Metodologi** — sources table and rounding notes.

All figures are real, rounded, and sourced on the page that shows them.

## Run it

```sh
python3 -m http.server 8139 --directory app
# open http://localhost:8139
```

To build the submission dossier:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Layout

- `app/index.html` — shell, navigation, footer
- `app/style.css` — original design (deep teal + amber, system fonts)
- `app/data.js` — all figures (BPS / World Bank / IMF / Kemendagri)
- `app/charts.js` — hand-drawn SVG line, bar, donut, and horizontal-bar charts
- `app/main.js` — hash router and page renderers
- `main.ts` — copies `app/` + `screenshots/` to output and writes `dossier.json`
- `vendor/makefun-frontend.ts` — vendored make.fun library, unchanged
- `screenshots/` — 4 screenshots of the site running

## License

MIT
