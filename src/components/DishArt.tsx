import React from 'react';
import { SvgXml } from 'react-native-svg';

const plate = (food: string) =>
  `<circle cx="60" cy="64" r="50" fill="#000" opacity="0.08"/>` +
  `<circle cx="60" cy="60" r="50" fill="#ffffff"/>` +
  `<circle cx="60" cy="60" r="38" fill="#f8f5f0"/>` +
  food;

const chunks = (color: string, spots: [number, number, number][]) =>
  spots
    .map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.75}" fill="${color}"/>`)
    .join('');

const grains = (color: string, count: number, seed: number) => {
  let out = '';
  for (let i = 0; i < count; i += 1) {
    const a = (i * 137.5 + seed) * (Math.PI / 180);
    const d = 6 + ((i * 7 + seed) % 22);
    const x = 60 + Math.cos(a) * d;
    const y = 60 + Math.sin(a) * d;
    out += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="2.6" ry="1.2" transform="rotate(${(i * 47) % 180} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${color}"/>`;
  }
  return out;
};

const ART = {
  choma: plate(
    chunks('#8b4513', [[48, 52, 11], [70, 50, 10], [58, 68, 12], [76, 68, 8]]) +
      chunks('#a0522d', [[46, 50, 6], [68, 48, 5]]) +
      '<circle cx="40" cy="72" r="3" fill="#ef4444"/><circle cx="44" cy="78" r="2.5" fill="#22c55e"/><circle cx="36" cy="66" r="2.5" fill="#ef4444"/>'
  ),
  ugali: plate('<path d="M36 70 Q36 44 60 42 Q84 44 84 70 Z" fill="#fffbeb" stroke="#e7dcc0" stroke-width="2"/>'),
  salad: plate(
    chunks('#16a34a', [[50, 54, 12], [70, 56, 11], [60, 70, 12]]) +
      chunks('#22c55e', [[56, 48, 8], [74, 68, 7]]) +
      '<circle cx="48" cy="68" r="5" fill="#ef4444"/><circle cx="72" cy="46" r="4" fill="#ef4444"/><circle cx="64" cy="58" r="3" fill="#fde68a"/>'
  ),
  githeri: plate(
    '<circle cx="60" cy="60" r="30" fill="#c2410c" opacity="0.25"/>' +
      grains('#facc15', 26, 3) +
      chunks('#7c2d12', [[50, 56, 3.5], [66, 52, 3.5], [58, 70, 3.5], [72, 64, 3.5], [46, 66, 3.5]])
  ),
  biryani: plate(
    '<circle cx="60" cy="60" r="30" fill="#fde68a"/>' +
      grains('#f59e0b', 30, 11) +
      chunks('#b45309', [[52, 56, 8], [68, 64, 8]]) +
      '<circle cx="66" cy="50" r="3" fill="#16a34a"/><circle cx="50" cy="68" r="3" fill="#16a34a"/>'
  ),
  pilau: plate(
    '<circle cx="60" cy="60" r="30" fill="#b45309" opacity="0.55"/>' +
      grains('#78350f', 30, 29) +
      chunks('#7c2d12', [[50, 58, 6], [70, 56, 6], [60, 70, 6]])
  ),
  fish: plate(
    '<path d="M30 60 Q55 38 82 60 Q55 82 30 60 Z" fill="#d97706"/>' +
      '<path d="M82 60 L94 50 L94 70 Z" fill="#b45309"/>' +
      '<circle cx="42" cy="57" r="2.5" fill="#1f2937"/>' +
      '<path d="M50 52 Q58 60 50 68 M60 50 Q68 60 60 70" stroke="#fef3c7" stroke-width="2" fill="none"/>'
  ),
  fries: plate(
    Array.from({ length: 9 }, (_, i) =>
      `<rect x="${40 + i * 5}" y="${44 + ((i * 13) % 12)}" width="5" height="30" rx="2" fill="#facc15" transform="rotate(${(i % 3) * 8 - 8} ${42 + i * 5} 60)"/>`
    ).join('') + '<circle cx="74" cy="72" r="7" fill="#dc2626"/>'
  ),
  chapati: plate(
    '<circle cx="60" cy="60" r="30" fill="#f4c27a"/>' +
      '<circle cx="60" cy="60" r="22" fill="none" stroke="#e0a458" stroke-width="2"/>' +
      '<circle cx="60" cy="60" r="13" fill="none" stroke="#e0a458" stroke-width="2"/>' +
      chunks('#c98a3c', [[50, 50, 3], [70, 56, 3.5], [56, 72, 3], [72, 70, 2.5]])
  ),
  stew: plate(
    '<circle cx="60" cy="60" r="30" fill="#b91c1c" opacity="0.75"/>' +
      chunks('#7f1d1d', [[50, 54, 7], [68, 58, 7], [58, 70, 6]]) +
      chunks('#f97316', [[62, 46, 4], [44, 66, 4]]) +
      chunks('#fde68a', [[74, 70, 5]])
  ),
  pizza: plate(
    '<circle cx="60" cy="60" r="34" fill="#f59e0b"/>' +
      '<circle cx="60" cy="60" r="29" fill="#ef4444"/>' +
      '<circle cx="60" cy="60" r="27" fill="#fde68a" opacity="0.85"/>' +
      chunks('#b91c1c', [[50, 50, 5], [70, 52, 5], [56, 70, 5], [72, 68, 4]]) +
      '<circle cx="62" cy="60" r="3" fill="#16a34a"/><circle cx="46" cy="64" r="3" fill="#16a34a"/>' +
      '<path d="M60 26 L60 94 M26 60 L94 60" stroke="#f59e0b" stroke-width="1.5" opacity="0.6"/>'
  ),
  burger: plate(
    '<path d="M36 56 Q36 36 60 36 Q84 36 84 56 Z" fill="#f59e0b"/>' +
      '<rect x="34" y="56" width="52" height="5" rx="2" fill="#22c55e"/>' +
      '<rect x="34" y="61" width="52" height="5" rx="2" fill="#facc15"/>' +
      '<rect x="36" y="66" width="48" height="9" rx="4" fill="#78350f"/>' +
      '<path d="M36 76 H84 Q84 84 74 84 H46 Q36 84 36 76 Z" fill="#f59e0b"/>' +
      '<circle cx="52" cy="44" r="1.5" fill="#fff7d6"/><circle cx="62" cy="41" r="1.5" fill="#fff7d6"/><circle cx="70" cy="46" r="1.5" fill="#fff7d6"/>'
  ),
  bowl: plate(
    '<circle cx="60" cy="60" r="32" fill="#e7e5e4"/>' +
      '<path d="M60 60 L60 30 A30 30 0 0 1 86 46 Z" fill="#a3e635"/>' +
      '<path d="M60 60 L86 46 A30 30 0 0 1 80 82 Z" fill="#fb923c"/>' +
      '<path d="M60 60 L80 82 A30 30 0 0 1 38 82 Z" fill="#16a34a"/>' +
      '<path d="M60 60 L38 82 A30 30 0 0 1 32 44 Z" fill="#fde68a"/>' +
      '<path d="M60 60 L32 44 A30 30 0 0 1 60 30 Z" fill="#7c2d12" opacity="0.7"/>' +
      '<circle cx="60" cy="60" r="7" fill="#f8f5f0"/>'
  ),
  breakfast: plate(
    '<circle cx="48" cy="52" r="13" fill="#ffffff" stroke="#e5e7eb"/><circle cx="48" cy="52" r="6" fill="#f59e0b"/>' +
      '<rect x="62" y="40" width="22" height="9" rx="4.5" fill="#9a3412"/><rect x="62" y="52" width="22" height="9" rx="4.5" fill="#9a3412"/>' +
      '<rect x="40" y="68" width="22" height="16" rx="4" fill="#f4c27a"/>' +
      chunks('#dc2626', [[72, 74, 4], [78, 70, 3.5], [70, 80, 3.5]])
  ),
  coffee:
    '<ellipse cx="60" cy="96" rx="40" ry="8" fill="#000" opacity="0.08"/>' +
    '<ellipse cx="60" cy="90" rx="44" ry="10" fill="#ffffff"/>' +
    '<path d="M32 40 H84 V74 Q84 90 58 90 Q32 90 32 74 Z" fill="#ffffff" stroke="#e5e7eb" stroke-width="2"/>' +
    '<path d="M84 50 Q100 50 100 62 Q100 74 84 72" fill="none" stroke="#e5e7eb" stroke-width="6"/>' +
    '<ellipse cx="58" cy="42" rx="25" ry="6" fill="#7c2d12"/>' +
    '<ellipse cx="54" cy="41" rx="8" ry="2" fill="#d6a77a" opacity="0.8"/>' +
    '<path d="M48 30 q-4 -8 2 -14 M60 30 q-4 -8 2 -14 M72 30 q-4 -8 2 -14" stroke="#9ca3af" stroke-width="2.5" fill="none" stroke-linecap="round"/>',
  juice:
    '<ellipse cx="60" cy="100" rx="26" ry="6" fill="#000" opacity="0.08"/>' +
    '<path d="M38 26 H82 L76 98 H44 Z" fill="#ffffff" stroke="#e5e7eb" stroke-width="2"/>' +
    '<path d="M41 44 H79 L75 96 H45 Z" fill="#f59e0b"/>' +
    '<path d="M41 44 H79 L78 54 H42 Z" fill="#fbbf24"/>' +
    '<rect x="62" y="12" width="5" height="44" rx="2.5" fill="#ef4444" transform="rotate(14 64 34)"/>' +
    '<circle cx="78" cy="30" r="10" fill="#facc15" stroke="#ca8a04" stroke-width="2"/>',
};

export type ArtKey = keyof typeof ART;

export const artKeys = Object.keys(ART) as ArtKey[];

export default function DishArt({ art, size = 96 }: { art: ArtKey; size?: number }) {
  const xml = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">${ART[art]}</svg>`;
  return <SvgXml xml={xml} width={size} height={size} />;
}
