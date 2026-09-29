import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const dist = resolve('dist');
const htmlPath = resolve(dist, 'index.html');
if (!existsSync(htmlPath)) throw new Error('dist/index.html was not generated.');

const html = readFileSync(htmlPath, 'utf8');
const assets = [...html.matchAll(/(?:src|href)="([^"?#]+\.(?:js|css))"/g)].map((match) => match[1]);
if (assets.length < 2) throw new Error('Built index.html does not reference both JavaScript and CSS assets.');

for (const asset of assets) {
  const localPath = resolve(dist, asset.replace(/^\.\//, ''));
  if (!existsSync(localPath)) throw new Error(`Built asset is missing: ${asset}`);
}

if (html.includes('/src/main.js')) throw new Error('Built index.html still points to the unbundled source entry.');
console.log(`Verified dist/index.html and ${assets.length} referenced assets.`);
