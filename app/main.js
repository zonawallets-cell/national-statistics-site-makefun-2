// NusaData — router and page renderers. One hash route per topic; every page
// is built from data.js and drawn with charts.js. No network request is made
// by this file: all figures are local and all links are hash routes.

import {
  YEARS, POPULATION, GDP_GROWTH, INFLATION, UNEMPLOYMENT, POVERTY, HDI,
  HEADLINE_2024, SECTORS, AGE_STRUCTURE, LABOUR, TRADE, HDI_PARTS,
  PROVINCES, ISLAND_GROUPS, QUICK_FACTS, SOURCES,
} from './data.js';
import { lineChart, barChart, donutChart, hbarChart } from './charts.js';

const app = document.getElementById('app');
const fmtId = (n, digits = 2) => n.toFixed(digits).replace('.', ',');
const fmtInt = (n) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const density = (p) => Math.round((p.pop * 1e6) / p.area);

let selectedYear = 2024;
let provSort = { key: 'pop', dir: -1 };
let provQuery = '';
let provIsland = 'Semua';

// ---- shared bits ----------------------------------------------------------

function statCard(value, label, src) {
  return `<div class="card stat"><div class="value">${value}</div><div class="label">${label}</div><div class="src">${src}</div></div>`;
}

function yearIndex(year) {
  return YEARS.indexOf(year);
}

function yearPanel(year) {
  const i = yearIndex(year);
  return `<div class="grid cols-6">
    ${statCard(fmtId(POPULATION[i], 1) + ' jt', 'Penduduk', 'BPS, ' + year)}
    ${statCard(fmtId(GDP_GROWTH[i]) + '%', 'Pertumbuhan PDB', 'BPS, ' + year)}
    ${statCard(fmtId(INFLATION[i]) + '%', 'Inflasi', 'BPS, ' + year)}
    ${statCard(fmtId(UNEMPLOYMENT[i]) + '%', 'Pengangguran', 'BPS, Agu ' + year)}
    ${statCard(fmtId(POVERTY[i]) + '%', 'Kemiskinan', 'BPS, Sep ' + year)}
    ${statCard(fmtId(HDI[i]), 'Indeks Pembangunan Manusia', 'BPS, ' + year)}
  </div>`;
}

function yearButtons() {
  return `<div class="year-bar" role="group" aria-label="Pilih tahun">${YEARS.map((y) => `<button type="button" data-year="${y}" class="${y === selectedYear ? 'active' : ''}">${y}</button>`).join('')}</div>`;
}

function bindYearButtons() {
  app.querySelectorAll('[data-year]').forEach((b) => {
    b.addEventListener('click', () => {
      selectedYear = Number(b.dataset.year);
      app.querySelectorAll('[data-year]').forEach((x) => x.classList.toggle('active', Number(x.dataset.year) === selectedYear));
      const panel = document.getElementById('year-panel');
      if (panel) panel.innerHTML = yearPanel(selectedYear);
      const chart = document.getElementById('pop-chart');
      if (chart) chart.innerHTML = lineChart({ labels: YEARS, values: POPULATION, unit: ' jt', highlightIndex: yearIndex(selectedYear) });
    });
  });
}

function topProvinces(n = 5) {
  return [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, n);
}

// ---- pages ----------------------------------------------------------------

function homePage() {
  const h = HEADLINE_2024;
  return `
  <div class="hero">
    <h2>Indonesia dalam angka, tanpa pusing.</h2>
    <p>281,6 juta penduduk di 38 provinsi, ekonomi terbesar di Asia Tenggara, dan satu dekade perubahan — diringkas dari data resmi BPS, Bank Dunia, IMF, dan Kemendagri.</p>
    <p class="updated">Data terbaru: 2024 · Diperbarui November 2026</p>
  </div>

  <section class="block">
    <h2>Indonesia 2024, sekilas</h2>
    <div class="grid cols-6">
      ${statCard(h.population.value, h.population.label, h.population.source)}
      ${statCard(h.gdp.value, h.gdp.label, h.gdp.source)}
      ${statCard(h.gdpGrowth.value, h.gdpGrowth.label, h.gdpGrowth.source)}
      ${statCard(h.inflation.value, h.inflation.label, h.inflation.source)}
      ${statCard(h.unemployment.value, h.unemployment.label, h.unemployment.source)}
      ${statCard(h.hdi.value, h.hdi.label, h.hdi.source)}
    </div>
  </section>

  <section class="block">
    <h2>Jelajahi satu dekade</h2>
    <p class="lede">Pilih tahun untuk melihat enam indikator utama tahun itu — dan titiknya di grafik penduduk.</p>
    ${yearButtons()}
    <div id="year-panel">${yearPanel(selectedYear)}</div>
  </section>

  <section class="block">
    <h2>Penduduk terus tumbuh</h2>
    <p class="lede">Dari 255,5 juta pada 2015 menjadi 281,6 juta pada 2024 — tambah 26,1 juta orang dalam sepuluh tahun.</p>
    <div class="card"><div id="pop-chart">${lineChart({ labels: YEARS, values: POPULATION, unit: ' jt', highlightIndex: yearIndex(selectedYear) })}</div>
    <p class="src-note">Sumber: BPS, Proyeksi Penduduk 2015–2024.</p></div>
  </section>

  <section class="block">
    <h2>Ekonomi: tumbuh, sempat jatuh, bangkit lagi</h2>
    <p class="lede">Pertumbuhan PDB sempat −2,07% pada 2020 (pandemi), lalu kembali di atas 5% sejak 2022.</p>
    <div class="card">${barChart({ labels: YEARS, values: GDP_GROWTH })}
    <p class="src-note">Sumber: BPS, Pertumbuhan Ekonomi 2015–2024.</p></div>
  </section>

  <section class="block">
    <h2>Provinsi terpadat</h2>
    <div class="grid cols-3">
      ${topProvinces(3).map((p) => statCard(fmtId(p.pop, 1) + ' jt', p.name, 'Ibu kota: ' + p.capital)).join('')}
    </div>
    <p class="src-note">Lima besar: ${topProvinces(5).map((p) => p.name).join(', ')}. <a href="#/provinsi">Lihat semua 38 provinsi →</a></p>
  </section>

  <section class="block">
    <h2>Sekilas 2024</h2>
    <div class="grid cols-3">
      ${QUICK_FACTS.map((f) => `<div class="card fact"><div class="value">${f.value}</div><div class="label">${f.label}</div><div class="src">${f.source}</div></div>`).join('')}
    </div>
  </section>

  <section class="block">
    <h2>Jelajahi topik</h2>
    <div class="grid cols-3">
      <a class="card explore" href="#/penduduk"><h3>Penduduk</h3><p>Pertumbuhan, struktur umur, dan kepadatan.</p><span class="go">Buka →</span></a>
      <a class="card explore" href="#/ekonomi"><h3>Ekonomi</h3><p>PDB, inflasi, sektor, dan perdagangan.</p><span class="go">Buka →</span></a>
      <a class="card explore" href="#/provinsi"><h3>Provinsi</h3><p>Tabel 38 provinsi yang bisa dicari dan diurutkan.</p><span class="go">Buka →</span></a>
      <a class="card explore" href="#/tenaga-kerja"><h3>Tenaga Kerja</h3><p>Pengangguran, formal vs informal.</p><span class="go">Buka →</span></a>
      <a class="card explore" href="#/sosial"><h3>Sosial</h3><p>IPM, kemiskinan, dan pendidikan.</p><span class="go">Buka →</span></a>
      <a class="card explore" href="#/metodologi"><h3>Metodologi</h3><p>Sumber data dan catatan pembulatan.</p><span class="go">Buka →</span></a>
    </div>
  </section>`;
}

function pendudukPage() {
  return `
  <section class="block">
    <h2>Penduduk</h2>
    <p class="lede">281,6 juta jiwa pada 2024 — negara keempat terpadat di dunia. Pertumbuhan melambat, penduduk menua perlahan.</p>
    <div class="grid cols-3">
      ${statCard('281,6 jt', 'Penduduk 2024', 'BPS')}
      ${statCard('148/km²', 'Kepadatan', 'BPS, 2024')}
      ${statCard('58,6%', 'Penduduk perkotaan', 'BPS, 2024')}
    </div>
  </section>
  <section class="block">
    <h2>Pertumbuhan penduduk 2015–2024</h2>
    <div class="card">${lineChart({ labels: YEARS, values: POPULATION, unit: ' jt' })}
    <p class="src-note">Sumber: BPS, Proyeksi Penduduk. Kenaikan 2015–2024: +26,1 juta (+10,2%).</p></div>
  </section>
  <section class="block">
    <h2>Struktur umur 2024</h2>
    <p class="lede">Dua pertiga penduduk berada di usia produktif — jendela bonus demografi yang masih terbuka.</p>
    <div class="card">${hbarChart({ rows: AGE_STRUCTURE })}
    <p class="src-note">Sumber: BPS, 2024. Kelompok 15–64 tahun: 68,0% — sekitar 191,5 juta orang.</p></div>
  </section>
  <section class="block">
    <h2>Di mana orang tinggal</h2>
    <div class="grid cols-3">
      ${statCard('56%', 'di Pulau Jawa', 'BPS, 2024 — 156,4 jt dari 281,6 jt')}
      ${statCard('10.600/km²', 'DKI Jakarta, terpadat', 'BPS, 2024')}
      ${statCard('7/km²', 'Papua Selatan, terjarang', 'BPS, 2024')}
    </div>
    <p class="src-note">Jawa menampung lebih dari separuh penduduk di kurang dari 7% luas daratan. <a href="#/provinsi">Bandingkan semua provinsi →</a></p>
  </section>`;
}

function ekonomiPage() {
  return `
  <section class="block">
    <h2>Ekonomi</h2>
    <p class="lede">PDB Rp22.138 triliun pada 2024 — ekonomi terbesar di Asia Tenggara, ke-16 di dunia.</p>
    <div class="grid cols-3">
      ${statCard('Rp22.138 T', 'PDB nominal', 'BPS, 2024')}
      ${statCard('US$4.960', 'PDB per kapita', 'Bank Dunia, 2024')}
      ${statCard('5,03%', 'Pertumbuhan 2024', 'BPS, 2024')}
    </div>
  </section>
  <section class="block">
    <h2>Pertumbuhan PDB 2015–2024</h2>
    <div class="card">${barChart({ labels: YEARS, values: GDP_GROWTH })}
    <p class="src-note">Sumber: BPS. Satu-satunya tahun negatif dalam dekade ini: 2020 (−2,07%), saat pandemi COVID-19.</p></div>
  </section>
  <section class="block">
    <h2>Inflasi 2015–2024</h2>
    <p class="lede">Inflasi 2024 hanya 1,57% — terendah dalam satu dekade, setelah sempat 5,51% pada 2022.</p>
    <div class="card">${lineChart({ labels: YEARS, values: INFLATION, unit: '%', color: '#2563eb' })}
    <p class="src-note">Sumber: BPS, Indeks Harga Konsumen.</p></div>
  </section>
  <section class="block">
    <h2>Dari mana PDB berasal</h2>
    <p class="lede">Industri pengolahan tetap penyumbang terbesar, diikuti perdagangan dan pertanian.</p>
    <div class="card">${donutChart({ segments: SECTORS })}
    <p class="src-note">Sumber: BPS, PDB menurut Lapangan Usaha 2024. 14 sektor, total 100,00%.</p></div>
  </section>
  <section class="block">
    <h2>Perdagangan 2024</h2>
    <div class="grid cols-3">
      ${statCard('US$264,7 M', 'Ekspor', 'BPS, 2024')}
      ${statCard('US$233,7 M', 'Impor', 'BPS, 2024')}
      ${statCard('US$31,0 M', 'Surplus', 'BPS, 2024')}
    </div>
  </section>`;
}

function filteredProvinces() {
  let rows = [...PROVINCES];
  if (provIsland !== 'Semua') rows = rows.filter((p) => p.island === provIsland);
  if (provQuery) {
    const q = provQuery.toLowerCase();
    rows = rows.filter((p) => p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q));
  }
  const { key, dir } = provSort;
  rows.sort((a, b) => {
    const av = key === 'density' ? density(a) : a[key];
    const bv = key === 'density' ? density(b) : b[key];
    if (typeof av === 'string') return dir * av.localeCompare(bv, 'id');
    return dir * (av - bv);
  });
  return rows;
}

function provinceRows() {
  const rows = filteredProvinces();
  if (rows.length === 0) {
    return {
      body: `<tr><td colspan="6" class="empty">Tidak ada provinsi yang cocok dengan pencarian Anda.</td></tr>`,
      foot: '',
    };
  }
  const totalPop = rows.reduce((a, p) => a + p.pop, 0);
  const totalArea = rows.reduce((a, p) => a + p.area, 0);
  const body = rows.map((p) => `<tr><td>${p.name}</td><td class="num">${fmtId(p.pop, 1)}</td><td class="num">${fmtInt(p.area)}</td><td class="num">${fmtInt(density(p))}</td><td>${p.capital}</td><td>${p.island}</td></tr>`).join('');
  const foot = `<tr><td>Total (${rows.length} provinsi)</td><td class="num">${fmtId(totalPop, 1)}</td><td class="num">${fmtInt(totalArea)}</td><td class="num">${fmtInt((totalPop * 1e6) / totalArea)}</td><td></td><td></td></tr>`;
  return { body, foot };
}

function sortArrow(key) {
  if (provSort.key !== key) return '';
  return provSort.dir === -1 ? ' ↓' : ' ↑';
}

function provinsiPage() {
  const rows = provinceRows();
  return `
  <section class="block">
    <h2>Provinsi</h2>
    <p class="lede">Semua 38 provinsi, 2024. Klik judul kolom untuk mengurutkan, ketik untuk mencari, atau saring per kepulauan. Total di bawah tabel mengikuti filter Anda.</p>
    <div class="controls">
      <input type="search" id="prov-search" placeholder="Cari provinsi atau ibu kota…" value="${provQuery.replace(/"/g, '&quot;')}" aria-label="Cari provinsi">
      <select id="prov-island" aria-label="Saring kepulauan">
        ${ISLAND_GROUPS.map((g) => `<option value="${g}" ${g === provIsland ? 'selected' : ''}>${g}</option>`).join('')}
      </select>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th><button type="button" data-sort="name">Provinsi${sortArrow('name')}</button></th>
          <th class="num"><button type="button" data-sort="pop">Penduduk (jt)${sortArrow('pop')}</button></th>
          <th class="num"><button type="button" data-sort="area">Luas (km²)${sortArrow('area')}</button></th>
          <th class="num"><button type="button" data-sort="density">Kepadatan (/km²)${sortArrow('density')}</button></th>
          <th><button type="button" data-sort="capital">Ibu Kota${sortArrow('capital')}</button></th>
          <th><button type="button" data-sort="island">Kepulauan${sortArrow('island')}</button></th>
        </tr></thead>
        <tbody id="prov-tbody">${rows.body}</tbody>
        <tfoot id="prov-tfoot">${rows.foot}</tfoot>
      </table>
    </div>
    <p class="src-note">Sumber: BPS Proyeksi Penduduk 2024 dan Kemendagri. Penduduk dibulatkan ke 0,1 juta; kepadatan dihitung dari angka tersebut. Total nasional: 281,6 juta jiwa.</p>
  </section>`;
}

function bindProvince() {
  const search = document.getElementById('prov-search');
  const island = document.getElementById('prov-island');
  const refresh = () => {
    const { body, foot } = provinceRows();
    const tb = document.getElementById('prov-tbody');
    const tf = document.getElementById('prov-tfoot');
    if (tb) tb.innerHTML = body;
    if (tf) tf.innerHTML = foot;
    document.querySelectorAll('[data-sort]').forEach((b) => {
      b.textContent = b.textContent.replace(/ [↑↓]$/, '') + sortArrow(b.dataset.sort);
    });
  };
  if (search) search.addEventListener('input', () => { provQuery = search.value; refresh(); });
  if (island) island.addEventListener('change', () => { provIsland = island.value; refresh(); });
  app.querySelectorAll('[data-sort]').forEach((b) => {
    b.addEventListener('click', () => {
      const key = b.dataset.sort;
      if (provSort.key === key) provSort.dir *= -1;
      else provSort = { key, dir: key === 'pop' || key === 'area' || key === 'density' ? -1 : 1 };
      refresh();
    });
  });
}

function tenagaKerjaPage() {
  return `
  <section class="block">
    <h2>Tenaga Kerja</h2>
    <p class="lede">149,4 juta orang angkatan kerja pada Agustus 2024 — pengangguran 4,91%, terendah dalam satu dekade.</p>
    <div class="grid cols-3">
      ${statCard(LABOUR.workforce, 'Angkatan kerja', 'BPS, Agu 2024')}
      ${statCard(LABOUR.employed, 'Bekerja', 'BPS, Agu 2024')}
      ${statCard(LABOUR.unemployed, 'Menganggur', 'BPS, Agu 2024')}
    </div>
  </section>
  <section class="block">
    <h2>Pengangguran 2015–2024</h2>
    <div class="card">${barChart({ labels: YEARS, values: UNEMPLOYMENT, color: '#2563eb' })}
    <p class="src-note">Sumber: BPS Sakernas, Agustus. Puncak 7,07% pada 2020 (pandemi), turun tiap tahun sejak itu hingga 4,91% pada 2024.</p></div>
  </section>
  <section class="block">
    <h2>Formal vs informal</h2>
    <p class="lede">Mayoritas pekerja Indonesia masih di sektor informal — 58,8% pada 2024.</p>
    <div class="card">${hbarChart({ rows: [{ group: 'Formal', share: LABOUR.formal }, { group: 'Informal', share: LABOUR.informal }], height: 110, color: '#0f766e' })}
    <p class="src-note">Sumber: BPS Sakernas, Agustus 2024. Pekerja informal: 83,5 juta orang; formal: 58,5 juta orang.</p></div>
  </section>`;
}

function sosialPage() {
  return `
  <section class="block">
    <h2>Sosial</h2>
    <p class="lede">IPM naik 5,47 poin dalam satu dekade; kemiskinan turun ke 8,57% — terendah sepanjang sejarah pengukuran.</p>
    <div class="grid cols-3">
      ${statCard('75,02', 'IPM 2024', 'BPS — kategori Tinggi')}
      ${statCard('8,57%', 'Kemiskinan, Sep 2024', 'BPS')}
      ${statCard('74,1 thn', 'Harapan hidup', 'BPS, 2024')}
    </div>
  </section>
  <section class="block">
    <h2>Indeks Pembangunan Manusia 2015–2024</h2>
    <div class="card">${lineChart({ labels: YEARS, values: HDI, color: '#7c3aed', min: 68, max: 76 })}
    <p class="src-note">Sumber: BPS. IPM menembus 75,00 pada 2024 — pertama kalinya Indonesia masuk kategori "Tinggi" di ambang atas.</p></div>
  </section>
  <section class="block">
    <h2>Kemiskinan 2015–2024</h2>
    <div class="card">${lineChart({ labels: YEARS, values: POVERTY, unit: '%', color: '#dc2626', min: 8, max: 12 })}
    <p class="src-note">Sumber: BPS, September. Turun 2,65 poin dalam satu dekade; sempat naik pada 2020 saat pandemi.</p></div>
  </section>
  <section class="block">
    <h2>Komponen IPM 2024</h2>
    <div class="grid cols-3">
      ${HDI_PARTS.map((p) => statCard(p.value, p.label, 'BPS, 2024')).join('')}
    </div>
  </section>`;
}

function metodologiPage() {
  return `
  <section class="block">
    <h2>Metodologi</h2>
    <p class="lede">Dari mana angka-angka di situs ini berasal, dan bagaimana angka itu dibulatkan.</p>
    <h3>Sumber data</h3>
    <div class="table-wrap">
      <table class="sources">
        <thead><tr><th>Sumber</th><th>Data yang dipakai</th><th>Situs</th></tr></thead>
        <tbody>
          ${SOURCES.map((s) => `<tr><td>${s.name}</td><td>${s.what}</td><td>${s.url}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
  </section>
  <section class="block">
    <h3>Catatan pembulatan</h3>
    <div class="note-box">
      <p><b>Angka dibulatkan agar mudah dibaca.</b> Penduduk provinsi dibulatkan ke 0,1 juta jiwa; kepadatan dihitung dari angka bulat itu, sehingga total provinsi (281,6 juta) sama dengan angka nasional. Persen ditampilkan dua desimal; 14 sektor PDB berjumlah tepat 100,00%.</p>
      <p>Seri 2015–2024 memakai angka resmi tahun berjalan; tahun 2020 mencerminkan dampak pandemi COVID-19 pada pertumbuhan PDB (−2,07%), pengangguran (7,07%), dan kemiskinan (10,19%).</p>
      <p>Situs ini statis: semua angka tersimpan di dalam file data, tidak ada permintaan jaringan, dan tidak ada pelacakan.</p>
    </div>
  </section>`;
}

// ---- router -----------------------------------------------------------------

const PAGES = {
  '': homePage,
  penduduk: pendudukPage,
  ekonomi: ekonomiPage,
  provinsi: provinsiPage,
  'tenaga-kerja': tenagaKerjaPage,
  sosial: sosialPage,
  metodologi: metodologiPage,
};

function render() {
  const route = (location.hash || '#/').replace(/^#\/?/, '').split('?')[0];
  const page = PAGES[route] || homePage;
  app.innerHTML = page();
  document.querySelectorAll('nav.main a').forEach((a) => {
    a.classList.toggle('active', a.dataset.route === (PAGES[route] ? route : ''));
  });
  if (route === '' || route === undefined) bindYearButtons();
  if (route === 'provinsi') bindProvince();
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
render();
