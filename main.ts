// NusaData — a national statistics site for Indonesia (Node 22, standard
// library only). The site is this directory's app/ folder: plain static files
// a browser opens at app/index.html (ES modules, CSS, no build step), all
// figures held in app/data.js, charts drawn as inline SVG by app/charts.js.
// Nothing the site runs, styles or shows loads over the network. This program
// hands it in: it copies app/ and screenshots/ from beside this file to
// /output and writes /output/dossier.json, the summary the judge reads (the
// screenshots, the first load's files and bytes, and the source), with the
// vendored make.fun library. Leave vendor/makefun-frontend.ts as it is: the
// scorer requires dossier.json to be byte for byte what its own copy writes.
//
// Serve it locally with `python3 -m http.server 8139 --directory app`,
// then open http://localhost:8139. Outside the grader's container,
// MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// The scorer's own caps (reference/gate.json): only text_max_bytes shapes the
// bytes; the others refuse an entry the scorer would refuse (more than 4
// screenshots or one over 256 KiB; more than 993 files and directories in app/
// or 16 MiB of app files: app/ counts beside /output's own 1000-entry cap, its
// screenshots/ and dossier.json).
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);

// Report what was produced, so a local run confirms the dossier landed.
console.log(`NusaData -> ${out} (dossier.json ${statSync(join(out, 'dossier.json')).size} B)`);
