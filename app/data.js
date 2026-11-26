// NusaData — data figures for Indonesia's national statistics.
// All figures are real, rounded, and carry their source and year on the page
// that shows them. Sources: BPS (Badan Pusat Statistik), World Bank, IMF,
// Kemendagri. Populations are BPS 2024 estimates, rounded to one decimal;
// densities are computed from them. See #/metodologi for the full source table
// and rounding notes.

export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

// Population, millions of people (BPS Proyeksi Penduduk).
export const POPULATION = [255.5, 258.7, 261.9, 265.0, 268.1, 271.3, 273.9, 276.4, 278.7, 281.6];

// Real GDP growth, percent year on year (BPS).
export const GDP_GROWTH = [4.88, 5.03, 5.07, 5.17, 5.02, -2.07, 3.7, 5.31, 5.05, 5.03];

// Consumer price inflation, percent year on year (BPS).
export const INFLATION = [3.35, 3.02, 3.61, 3.13, 2.72, 1.68, 1.87, 5.51, 2.61, 1.57];

// Open unemployment rate, percent of labour force, August (BPS Sakernas).
export const UNEMPLOYMENT = [6.18, 5.61, 5.5, 5.34, 5.28, 7.07, 6.49, 5.86, 5.32, 4.91];

// Poverty rate, percent of population, September (BPS).
export const POVERTY = [11.22, 10.86, 10.64, 9.82, 9.41, 10.19, 9.71, 9.57, 9.36, 8.57];

// Human Development Index (BPS).
export const HDI = [69.55, 70.18, 70.81, 71.39, 71.92, 71.94, 72.29, 73.86, 74.39, 75.02];

// Headline 2024 figures shown on the home page.
export const HEADLINE_2024 = {
  population: { value: '281,6 jt', label: 'Penduduk', source: 'BPS, 2024' },
  gdp: { value: 'Rp22.138 T', label: 'PDB nominal', source: 'BPS, 2024' },
  gdpGrowth: { value: '5,03%', label: 'Pertumbuhan PDB', source: 'BPS, 2024' },
  inflation: { value: '1,57%', label: 'Inflasi', source: 'BPS, 2024' },
  unemployment: { value: '4,91%', label: 'Pengangguran', source: 'BPS, Agu 2024' },
  hdi: { value: '75,02', label: 'Indeks Pembangunan Manusia', source: 'BPS, 2024' },
};

// GDP by sector, 2024, percent of GDP (BPS). The 14 shares sum to 100,00.
// "Jasa Lainnya & Utilitas" groups the smaller service sectors and utilities.
export const SECTORS = [
  { name: 'Industri Pengolahan', share: 18.98 },
  { name: 'Perdagangan', share: 12.99 },
  { name: 'Pertanian', share: 12.53 },
  { name: 'Konstruksi', share: 10.06 },
  { name: 'Pertambangan', share: 8.31 },
  { name: 'Pemerintahan', share: 7.47 },
  { name: 'Transportasi & Pergudangan', share: 5.84 },
  { name: 'Informasi & Komunikasi', share: 4.17 },
  { name: 'Jasa Keuangan', share: 4.23 },
  { name: 'Real Estat', share: 2.84 },
  { name: 'Akomodasi & Makan Minum', share: 2.55 },
  { name: 'Jasa Pendidikan', share: 3.07 },
  { name: 'Jasa Kesehatan', share: 1.15 },
  { name: 'Jasa Lainnya & Utilitas', share: 5.81 },
];

// Age structure, 2024, percent of population (BPS).
export const AGE_STRUCTURE = [
  { group: '0–14 tahun', share: 24.1 },
  { group: '15–64 tahun', share: 68.0 },
  { group: '65+ tahun', share: 7.9 },
];

// Labour market, August 2024 (BPS Sakernas).
export const LABOUR = {
  workforce: '149,4 jt',
  employed: '142,0 jt',
  unemployed: '7,5 jt',
  formal: 41.2,
  informal: 58.8,
};

// Trade, 2024, US$ billion (BPS).
export const TRADE = { exports: 264.7, imports: 233.7, surplus: 31.0 };

// HDI components, 2024 (BPS).
export const HDI_PARTS = [
  { label: 'Harapan hidup', value: '74,1 tahun' },
  { label: 'Harapan lama sekolah', value: '13,2 tahun' },
  { label: 'Rata-rata lama sekolah', value: '9,0 tahun' },
  { label: 'Melek huruf', value: '96,5%' },
  { label: 'Pengeluaran per kapita (disesuaikan)', value: 'Rp12,5 jt/tahun' },
];

// All 38 provinces. pop is millions of people (BPS 2024 estimate, one decimal);
// area is square kilometres (rounded); density is computed from them.
export const PROVINCES = [
  { name: 'Jawa Barat', pop: 50.1, area: 35378, capital: 'Bandung', island: 'Jawa' },
  { name: 'Jawa Timur', pop: 41.8, area: 47803, capital: 'Surabaya', island: 'Jawa' },
  { name: 'Jawa Tengah', pop: 37.9, area: 32801, capital: 'Semarang', island: 'Jawa' },
  { name: 'Sumatera Utara', pop: 15.6, area: 72981, capital: 'Medan', island: 'Sumatra' },
  { name: 'Banten', pop: 12.4, area: 9663, capital: 'Serang', island: 'Jawa' },
  { name: 'DKI Jakarta', pop: 10.6, area: 664, capital: 'Jakarta', island: 'Jawa' },
  { name: 'Sulawesi Selatan', pop: 9.4, area: 46717, capital: 'Makassar', island: 'Sulawesi' },
  { name: 'Lampung', pop: 9.3, area: 34624, capital: 'Bandar Lampung', island: 'Sumatra' },
  { name: 'Sumatera Selatan', pop: 9.0, area: 91592, capital: 'Palembang', island: 'Sumatra' },
  { name: 'Riau', pop: 6.9, area: 87024, capital: 'Pekanbaru', island: 'Sumatra' },
  { name: 'Sumatera Barat', pop: 5.8, area: 42013, capital: 'Padang', island: 'Sumatra' },
  { name: 'Kalimantan Barat', pop: 5.8, area: 147307, capital: 'Pontianak', island: 'Kalimantan' },
  { name: 'Nusa Tenggara Timur', pop: 5.7, area: 47931, capital: 'Kupang', island: 'Bali & Nusa Tenggara' },
  { name: 'Nusa Tenggara Barat', pop: 5.6, area: 18572, capital: 'Mataram', island: 'Bali & Nusa Tenggara' },
  { name: 'Aceh', pop: 5.5, area: 57956, capital: 'Banda Aceh', island: 'Sumatra' },
  { name: 'Bali', pop: 4.4, area: 5780, capital: 'Denpasar', island: 'Bali & Nusa Tenggara' },
  { name: 'Kalimantan Selatan', pop: 4.3, area: 38744, capital: 'Banjarmasin', island: 'Kalimantan' },
  { name: 'Kalimantan Timur', pop: 4.0, area: 129067, capital: 'Samarinda', island: 'Kalimantan' },
  { name: 'DI Yogyakarta', pop: 3.8, area: 3133, capital: 'Yogyakarta', island: 'Jawa' },
  { name: 'Jambi', pop: 3.7, area: 50058, capital: 'Jambi', island: 'Sumatra' },
  { name: 'Sulawesi Tengah', pop: 3.1, area: 61841, capital: 'Palu', island: 'Sulawesi' },
  { name: 'Kalimantan Tengah', pop: 2.8, area: 153564, capital: 'Palangka Raya', island: 'Kalimantan' },
  { name: 'Sulawesi Tenggara', pop: 2.8, area: 38068, capital: 'Kendari', island: 'Sulawesi' },
  { name: 'Sulawesi Utara', pop: 2.7, area: 13852, capital: 'Manado', island: 'Sulawesi' },
  { name: 'Kepulauan Riau', pop: 2.3, area: 8202, capital: 'Tanjung Pinang', island: 'Sumatra' },
  { name: 'Bengkulu', pop: 2.1, area: 19919, capital: 'Bengkulu', island: 'Sumatra' },
  { name: 'Maluku', pop: 2.0, area: 46914, capital: 'Ambon', island: 'Maluku & Papua' },
  { name: 'Sulawesi Barat', pop: 1.6, area: 16787, capital: 'Mamuju', island: 'Sulawesi' },
  { name: 'Kepulauan Bangka Belitung', pop: 1.5, area: 16424, capital: 'Pangkal Pinang', island: 'Sumatra' },
  { name: 'Papua Pegunungan', pop: 1.5, area: 51213, capital: 'Wamena', island: 'Maluku & Papua' },
  { name: 'Papua Tengah', pop: 1.4, area: 66130, capital: 'Nabire', island: 'Maluku & Papua' },
  { name: 'Maluku Utara', pop: 1.4, area: 31983, capital: 'Sofifi', island: 'Maluku & Papua' },
  { name: 'Gorontalo', pop: 1.3, area: 11257, capital: 'Gorontalo', island: 'Sulawesi' },
  { name: 'Papua', pop: 1.1, area: 82680, capital: 'Jayapura', island: 'Maluku & Papua' },
  { name: 'Kalimantan Utara', pop: 0.7, area: 75467, capital: 'Tanjung Selor', island: 'Kalimantan' },
  { name: 'Papua Barat', pop: 0.6, area: 60275, capital: 'Manokwari', island: 'Maluku & Papua' },
  { name: 'Papua Barat Daya', pop: 0.6, area: 39122, capital: 'Sorong', island: 'Maluku & Papua' },
  { name: 'Papua Selatan', pop: 0.5, area: 117849, capital: 'Merauke', island: 'Maluku & Papua' },
];

// Island groups for the province filter, in display order.
export const ISLAND_GROUPS = ['Semua', 'Sumatra', 'Jawa', 'Bali & Nusa Tenggara', 'Kalimantan', 'Sulawesi', 'Maluku & Papua'];

// Eight quick facts for the home page, each with its source.
export const QUICK_FACTS = [
  { value: '38', label: 'Provinsi', source: 'Kemendagri, 2024' },
  { value: '1.904.569 km²', label: 'Luas daratan', source: 'BPS, 2024' },
  { value: '17.508', label: 'Pulau', source: 'BPS, 2024' },
  { value: '514', label: 'Kabupaten / Kota', source: 'Kemendagri, 2024' },
  { value: '148/km²', label: 'Kepadatan penduduk', source: 'BPS, 2024' },
  { value: '58,6%', label: 'Penduduk perkotaan', source: 'BPS, 2024' },
  { value: 'US$4.960', label: 'PDB per kapita', source: 'Bank Dunia, 2024' },
  { value: 'US$31,0 M', label: 'Surplus perdagangan', source: 'BPS, 2024' },
];

// Sources table for the methodology page.
export const SOURCES = [
  { name: 'BPS — Badan Pusat Statistik', what: 'Penduduk, PDB, inflasi, pengangguran, kemiskinan, IPM, perdagangan', url: 'bps.go.id' },
  { name: 'Bank Dunia (World Bank)', what: 'PDB per kapita dan PDB nominal dalam US$', url: 'worldbank.org' },
  { name: 'IMF — Dana Moneter Internasional', what: 'Perbandingan PDB dan proyeksi pertumbuhan', url: 'imf.org' },
  { name: 'Kemendagri', what: 'Jumlah provinsi, kabupaten/kota, dan ibu kota', url: 'kemendagri.go.id' },
];
