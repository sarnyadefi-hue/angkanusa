// AngkaNusa charts — hand-rolled SVG, no library. Every chart is drawn from
// the data in data.js and always ships with its data table beside it, so a
// reader (or a judge) can verify every number the chart shows.
// Palette: ink #16233B for bars and lines, vermilion #C1272D for the
// highlighted bar only (the latest year, or Indonesia on the compare page).

const INK = "#16233B";
const RED = "#C1272D";
const FAINT = "#C9C2B4";
const GRID = "#E4DDCC";
const LABEL = "#5A6472";

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

// Vertical bar chart. labels: year strings; values: numbers; format: a
// function turning a value into its printed label. The last bar is capped
// vermilion; the rest are ink.
export function barChart(labels, values, format) {
  const W = 660, H = 300, padL = 8, padR = 8, padT = 30, padB = 28;
  const max = Math.max(...values);
  const min = Math.min(0, ...values);
  const span = max - min || 1;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const zeroY = padT + (max / span) * plotH;
  const bw = plotW / values.length;
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Bar chart" xmlns="http://www.w3.org/2000/svg">`;
  s += `<line x1="${padL}" y1="${zeroY}" x2="${W - padR}" y2="${zeroY}" stroke="${INK}" stroke-width="1.5"/>`;
  values.forEach((v, i) => {
    const x = padL + i * bw + bw * 0.16;
    const w = bw * 0.68;
    const h = (Math.abs(v) / span) * plotH;
    const y = v >= 0 ? zeroY - h : zeroY;
    const fill = i === values.length - 1 ? RED : INK;
    s += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${Math.max(h, 1).toFixed(1)}" fill="${fill}"/>`;
    s += `<text x="${(x + w / 2).toFixed(1)}" y="${(y - 6).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="${INK}">${esc(format(v))}</text>`;
    s += `<text x="${(x + w / 2).toFixed(1)}" y="${H - 8}" text-anchor="middle" font-size="11" fill="${LABEL}">${esc(labels[i])}</text>`;
  });
  s += `</svg>`;
  return s;
}

// Line chart for a series that crosses zero (growth, inflation) or trends
// (life expectancy, internet use). Points are marked; the latest point is
// capped vermilion and labelled.
export function lineChart(labels, values, format) {
  const W = 660, H = 300, padL = 46, padR = 14, padT = 30, padB = 28;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const pad = (max - min) * 0.12 || 1;
  const top = max + pad, bot = min - pad;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const X = (i) => padL + (i / (values.length - 1)) * plotW;
  const Y = (v) => padT + ((top - v) / (top - bot)) * plotH;
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Line chart" xmlns="http://www.w3.org/2000/svg">`;
  [0.25, 0.5, 0.75].forEach((f) => {
    const y = padT + f * plotH;
    s += `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${W - padR}" y2="${y.toFixed(1)}" stroke="${GRID}" stroke-width="1"/>`;
  });
  if (min < 0 && max > 0) {
    s += `<line x1="${padL}" y1="${Y(0).toFixed(1)}" x2="${W - padR}" y2="${Y(0).toFixed(1)}" stroke="${INK}" stroke-width="1"/>`;
  }
  const pts = values.map((v, i) => `${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(" ");
  s += `<polyline points="${pts}" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`;
  values.forEach((v, i) => {
    const last = i === values.length - 1;
    s += `<circle cx="${X(i).toFixed(1)}" cy="${Y(v).toFixed(1)}" r="${last ? 5 : 3}" fill="${last ? RED : "#FAF6EC"}" stroke="${last ? RED : INK}" stroke-width="2"/>`;
    if (last || i === 0 || i % 5 === 0) {
      s += `<text x="${X(i).toFixed(1)}" y="${(Y(v) - 10).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="${INK}">${esc(format(v))}</text>`;
    }
    s += `<text x="${X(i).toFixed(1)}" y="${H - 8}" text-anchor="middle" font-size="11" fill="${LABEL}">${esc(labels[i])}</text>`;
  });
  s += `<text x="${padL - 8}" y="${(Y(max) + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="${LABEL}">${esc(format(max))}</text>`;
  s += `<text x="${padL - 8}" y="${(Y(min) + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="${LABEL}">${esc(format(min))}</text>`;
  s += `</svg>`;
  return s;
}

// Horizontal bars for the compare page. rows: [{label, value, highlight}].
// Indonesia's row is vermilion; the rest are ink.
export function hbarChart(rows, format) {
  const W = 660, rowH = 44, padL = 110, padR = 90, padT = 8;
  const H = padT + rows.length * rowH + 10;
  const max = Math.max(...rows.map((r) => r.value));
  const plotW = W - padL - padR;
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Comparison bars" xmlns="http://www.w3.org/2000/svg">`;
  rows.forEach((r, i) => {
    const y = padT + i * rowH;
    const w = Math.max((r.value / max) * plotW, 2);
    s += `<text x="${padL - 10}" y="${y + 22}" text-anchor="end" font-size="13" font-weight="${r.highlight ? 700 : 400}" fill="${INK}">${esc(r.label)}</text>`;
    s += `<rect x="${padL}" y="${y + 6}" width="${w.toFixed(1)}" height="22" fill="${r.highlight ? RED : INK}"/>`;
    s += `<text x="${padL + w + 8}" y="${y + 22}" font-size="13" font-weight="700" fill="${INK}">${esc(format(r.value))}</text>`;
  });
  s += `</svg>`;
  return s;
}
