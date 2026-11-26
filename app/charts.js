// NusaData — hand-drawn SVG charts. No libraries, no network: every chart is
// built from the data in data.js and rendered as inline SVG, so the page works
// with no external request. Numbers use Indonesian formatting (comma decimals).

const fmt = (n, digits = 2) => n.toFixed(digits).replace('.', ',');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// A line chart with axes, gridlines and year labels. highlightIndex marks one
// point (the year the visitor picked in the year explorer) with a ring.
export function lineChart({ labels, values, width = 640, height = 260, color = '#0f766e', unit = '', highlightIndex = -1, min = null, max = null }) {
  const padL = 52;
  const padR = 14;
  const padT = 14;
  const padB = 28;
  const w = width - padL - padR;
  const h = height - padT - padB;
  const lo = min ?? Math.min(...values);
  const hi = max ?? Math.max(...values);
  const span = hi - lo || 1;
  const x = (i) => padL + (i / (values.length - 1)) * w;
  const y = (v) => padT + (1 - (v - lo) / span) * h;
  const ticks = 4;
  let grid = '';
  for (let t = 0; t <= ticks; t++) {
    const v = lo + (span * t) / ticks;
    const yy = y(v);
    grid += `<line x1="${padL}" y1="${yy}" x2="${padL + w}" y2="${yy}" stroke="#e2e8f0" stroke-width="1"/>`;
    grid += `<text x="${padL - 8}" y="${yy + 4}" text-anchor="end" font-size="11" fill="#64748b">${fmt(v, 1)}${unit}</text>`;
  }
  const points = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  let dots = '';
  values.forEach((v, i) => {
    const hot = i === highlightIndex;
    dots += `<circle cx="${x(i)}" cy="${y(v)}" r="${hot ? 6 : 3.5}" fill="${hot ? '#f59e0b' : color}" stroke="#fff" stroke-width="1.5"/>`;
    if (hot) dots += `<circle cx="${x(i)}" cy="${y(v)}" r="11" fill="none" stroke="#f59e0b" stroke-width="1.5" opacity="0.5"/>`;
  });
  let years = '';
  labels.forEach((lab, i) => {
    years += `<text x="${x(i)}" y="${height - 8}" text-anchor="middle" font-size="11" fill="#64748b">${lab}</text>`;
  });
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="Grafik garis">${grid}<polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>${dots}${years}</svg>`;
}

// A vertical bar chart. Negative bars (the 2020 GDP contraction) draw in red
// below the zero line, with their label moved above the zero line so it never
// overlaps the year label.
export function barChart({ labels, values, width = 640, height = 260, color = '#0f766e', negColor = '#dc2626', unit = '%', highlightIndex = -1 }) {
  const padL = 52;
  const padR = 14;
  const padT = 22;
  const padB = 28;
  const w = width - padL - padR;
  const h = height - padT - padB;
  const lo = Math.min(0, ...values);
  const hi = Math.max(0, ...values);
  const span = hi - lo || 1;
  const y = (v) => padT + (1 - (v - lo) / span) * h;
  const zeroY = y(0);
  const slot = w / values.length;
  const bw = Math.min(34, slot * 0.62);
  let out = `<line x1="${padL}" y1="${zeroY}" x2="${padL + w}" y2="${zeroY}" stroke="#94a3b8" stroke-width="1.5"/>`;
  values.forEach((v, i) => {
    const cx = padL + slot * i + slot / 2;
    const top = v >= 0 ? y(v) : zeroY;
    const bh = Math.abs(y(v) - zeroY);
    const hot = i === highlightIndex;
    out += `<rect x="${(cx - bw / 2).toFixed(1)}" y="${top.toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(bh, 1).toFixed(1)}" rx="3" fill="${v < 0 ? negColor : hot ? '#f59e0b' : color}"/>`;
    // Value label: above the bar for positives, above the zero line for
    // negatives (never below, where it would collide with the year label).
    const ly = v >= 0 ? top - 6 : zeroY - 6;
    out += `<text x="${cx}" y="${ly.toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="${v < 0 ? negColor : '#334155'}">${fmt(v)}${unit}</text>`;
    out += `<text x="${cx}" y="${height - 8}" text-anchor="middle" font-size="11" fill="#64748b">${labels[i]}</text>`;
  });
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="Grafik batang">${out}</svg>`;
}

// A donut chart with a centre total and a legend list beside it.
export function donutChart({ segments, size = 260, hole = 0.62 }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 6;
  const total = segments.reduce((a, s) => a + s.share, 0);
  const palette = ['#0f766e', '#0ea5a5', '#f59e0b', '#2563eb', '#7c3aed', '#db2777', '#65a30d', '#ea580c', '#0891b2', '#4f46e5', '#a16207', '#be185d', '#15803d', '#64748b'];
  let angle = -Math.PI / 2;
  let paths = '';
  segments.forEach((s, i) => {
    const a0 = angle;
    const a1 = angle + (s.share / total) * Math.PI * 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const ir = r * hole;
    const ix1 = cx + ir * Math.cos(a1);
    const iy1 = cy + ir * Math.sin(a1);
    const ix0 = cx + ir * Math.cos(a0);
    const iy0 = cy + ir * Math.sin(a0);
    paths += `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${ix1.toFixed(1)} ${iy1.toFixed(1)} A ${ir.toFixed(1)} ${ir.toFixed(1)} 0 ${large} 0 ${ix0.toFixed(1)} ${iy0.toFixed(1)} Z" fill="${palette[i % palette.length]}"/>`;
    angle = a1;
  });
  const legend = segments.map((s, i) => `<li><span class="sw" style="background:${palette[i % palette.length]}"></span>${esc(s.name)} <b>${fmt(s.share)}%</b></li>`).join('');
  return `<div class="donut-wrap"><svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="Diagram donat">${paths}<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="22" font-weight="700" fill="#0f172a">100%</text><text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="11" fill="#64748b">PDB 2024</text></svg><ul class="legend">${legend}</ul></div>`;
}

// Horizontal bars, used for the age-structure split.
export function hbarChart({ rows, width = 640, height = 150, color = '#0f766e' }) {
  const padL = 110;
  const padR = 60;
  const w = width - padL - padR;
  const max = Math.max(...rows.map((r) => r.share));
  let out = '';
  rows.forEach((r, i) => {
    const y = 18 + i * 42;
    const bw = (r.share / max) * w;
    out += `<text x="${padL - 10}" y="${y + 14}" text-anchor="end" font-size="12" fill="#334155">${esc(r.group)}</text>`;
    out += `<rect x="${padL}" y="${y}" width="${bw.toFixed(1)}" height="22" rx="4" fill="${color}"/>`;
    out += `<text x="${padL + bw + 8}" y="${y + 15}" font-size="12" font-weight="600" fill="#0f172a">${fmt(r.share, 1)}%</text>`;
  });
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="Grafik batang horizontal">${out}</svg>`;
}
