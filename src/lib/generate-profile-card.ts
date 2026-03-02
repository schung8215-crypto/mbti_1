// lib/generate-profile-card.ts
// Shareable profile card — matches profile page hero design

export interface ProfileCardData {
  mbtiType: string;
  tagline: string;
  yinYang: string;
  element: string;
  elementEmoji: string;
  animal: string;
  animalEmoji: string;
  traits: string[];
}

export async function generateProfileCard(data: ProfileCardData): Promise<Blob> {
  // Load fonts to match the app's typography
  try { await document.fonts.load('bold 52px Lora'); } catch { /* fallback ok */ }
  try { await document.fonts.load('bold 42px Lora'); } catch { /* fallback ok */ }
  try { await document.fonts.load('500 18px "DM Sans"'); } catch { /* fallback ok */ }
  try { await document.fonts.load('600 19px "DM Sans"'); } catch { /* fallback ok */ }

  const W = 1080;
  const H = 1350;  // 4:5 — standard Instagram portrait
  const margin = 56;
  const cardW = W - margin * 2;

  const heroPadX = 44;
  const heroPadY = 96;

  // ── Pre-compute layout heights using a measure canvas ──
  const mc = document.createElement('canvas');
  const mctx = mc.getContext('2d')!;

  // Tagline wrap
  mctx.font = 'bold 42px Lora, Georgia, "Times New Roman", serif';
  const taglineLines = wrapText(mctx, data.tagline, cardW - heroPadX * 2);
  const taglineH = Math.min(taglineLines.length, 2) * 54;

  // Three hero pills widths
  mctx.font = '600 19px "DM Sans", Arial, sans-serif';
  const p3Texts = [
    data.mbtiType,
    `${data.elementEmoji} ${data.yinYang} ${data.element}`,
    `${data.animalEmoji} ${data.animal}`,
  ];
  const p3PX = 20;
  const p3Widths = p3Texts.map(t => mctx.measureText(t).width + p3PX * 2);
  mctx.font = '400 18px "DM Sans", Arial, sans-serif';
  const dotW = mctx.measureText('\u00B7').width;
  const dotGap = 14;
  const totalP3W = p3Widths.reduce((a, b) => a + b, 0) + (dotGap * 2 + dotW) * 2;

  // Section heights
  const iconSize    = 82;
  const logoH       = iconSize + 100;  // generous space below logo row
  const gapLogoHero = 80;              // gap between logo and hero card
  const heroH       = heroPadY + 22 + 22 + taglineH + 56 + 46 + heroPadY;
  const gapHeroSyn  = 80;              // gap between hero card and italic line
  const synLineH    = 44;
  const gapSynBot   = 80;              // gap between italic line and divider
  const bottomH     = 2;               // divider only

  const contentH  = logoH + gapLogoHero + heroH + gapHeroSyn + synLineH + gapSynBot + bottomH;

  // Vertically center content within the fixed 4:5 canvas
  const topMargin = Math.max(margin, Math.round((H - contentH) / 2));

  // ── Draw ──
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  canvas.width = W;
  canvas.height = H;

  ctx.fillStyle = '#f5f3ef';
  ctx.fillRect(0, 0, W, H);

  let cy = topMargin;

  // ── Logo: HaruIcon + "Haru" wordmark ──
  ctx.fillStyle = '#c67d5c';
  roundRect(ctx, margin, cy, iconSize, iconSize, iconSize * 0.22);
  ctx.fill();
  // iconSize * 0.221 = iconSize × 0.545 (SVG inner size ratio) × (19.5/48) (outer ray ratio)
  // This matches HaruIcon.tsx where inner = size * 0.545 and SVG outer ray = 19.5/48 of SVG size
  drawHaruSun(ctx, margin + iconSize / 2, cy + iconSize / 2, iconSize * 0.221);

  ctx.fillStyle = '#c67d5c';
  ctx.font = 'bold 52px Lora, Georgia, "Times New Roman", serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('Haru', margin + iconSize + 20, cy + 8);

  ctx.fillStyle = '#8a7e78';
  ctx.font = '500 18px "DM Sans", Arial, sans-serif';
  ctx.fillText('YOUR DAY, REVEALED', margin + iconSize + 20, cy + 57);

  cy += logoH + gapLogoHero;

  // ── Gradient hero block — full width, no rounded corners, matching profile page ──
  const grad = ctx.createLinearGradient(0, cy, W, cy + heroH);
  grad.addColorStop(0, '#c67d5c');
  grad.addColorStop(1, '#5a8a7a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, cy, W, heroH);

  const heroStartY = cy;
  cy += heroPadY;

  // "✦ YOUR HARU ARCHETYPE" label
  ctx.fillStyle = 'rgba(255,255,255,0.68)';
  ctx.font = '500 19px "DM Sans", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('\u2726 YOUR HARU ARCHETYPE', W / 2, cy);
  cy += 22 + 22;

  // Tagline — hero text
  ctx.fillStyle = 'white';
  ctx.font = 'bold 42px Lora, Georgia, "Times New Roman", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  taglineLines.slice(0, 2).forEach((line, i) => {
    ctx.fillText(line, W / 2, cy + i * 54);
  });
  cy += taglineH + 56;

  // Three equal pills: [MBTI] · [Element] · [Animal]
  const p3H = 46;
  let p3X = (W - totalP3W) / 2;
  const p3Y = cy;

  p3Texts.forEach((text, i) => {
    const pw = p3Widths[i];

    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    ctx.strokeStyle = 'rgba(255,255,255,0.28)';
    ctx.lineWidth = 1.5;
    roundRect(ctx, p3X, p3Y, pw, p3H, p3H / 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = 'white';
    ctx.font = '600 19px "DM Sans", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, p3X + pw / 2, p3Y + p3H / 2);

    p3X += pw;
    if (i < 2) {
      ctx.fillStyle = 'rgba(255,255,255,0.42)';
      ctx.font = '400 18px "DM Sans", Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('\u00B7', p3X + dotGap + dotW / 2, p3Y + p3H / 2);
      p3X += dotGap * 2 + dotW;
    }
  });

  cy = heroStartY + heroH + gapHeroSyn;

  // ── Synthesized tagline — italic, no box ──
  const synTagline = synthesizeTagline(data.element, data.animal);
  ctx.fillStyle = '#8a7e78';
  ctx.font = 'italic 24px Georgia, "Times New Roman", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText(`\u201C${synTagline}\u201D`, W / 2, cy);
  cy += synLineH + gapSynBot;

  // ── Bottom: divider only ──
  ctx.strokeStyle = '#e0dad4';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(margin, cy);
  ctx.lineTo(margin + cardW, cy);
  ctx.stroke();

  return new Promise(resolve => {
    canvas.toBlob(blob => resolve(blob!), 'image/png');
  });
}

// ── Helpers ──

/**
 * Draws the Haru sun icon to match HaruIcon.tsx SVG (viewBox 0 0 48 48, center 24 24).
 * r = outer ray radius from center.
 */
function drawHaruSun(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  // Proportions derived from HaruIcon.tsx SVG (r = outer ray length = 19.5/48 of SVG)
  const circleR  = r * 0.487;  // 9.5/19.5 — circle radius relative to outer ray
  const rInner   = r * 0.641;  // 12.5/19.5 — where ray starts (near circle edge)
  const diagOff  = r * 0.708;  // 13.8/19.5 — diagonal outer x/y offset
  const diagIn   = r * 0.441;  // 8.6/19.5  — diagonal inner x/y offset

  // Center circle
  ctx.fillStyle = 'white';
  ctx.globalAlpha = 0.96;
  ctx.beginPath();
  ctx.arc(cx, cy, circleR, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  ctx.lineCap = 'round';

  // 4 cardinal rays — opacity 0.85
  ctx.strokeStyle = 'white';
  ctx.globalAlpha = 0.85;
  ctx.lineWidth = r * 0.18;
  const cardRays: [number, number, number, number][] = [
    [cx,      cy - r,      cx,      cy - rInner],
    [cx,      cy + rInner, cx,      cy + r     ],
    [cx - r,  cy,          cx - rInner, cy     ],
    [cx + rInner, cy,      cx + r,  cy         ],
  ];
  cardRays.forEach(([x1, y1, x2, y2]) => {
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  });

  // 4 diagonal rays — opacity 0.60, slightly thinner
  ctx.globalAlpha = 0.60;
  ctx.lineWidth = r * 0.14;
  const d = diagOff, d2 = diagIn;
  const diagRays: [number, number, number, number][] = [
    [cx - d,  cy - d,  cx - d2, cy - d2],
    [cx + d2, cy + d2, cx + d,  cy + d ],
    [cx + d,  cy - d,  cx + d2, cy - d2],
    [cx - d2, cy + d2, cx - d,  cy + d ],
  ];
  diagRays.forEach(([x1, y1, x2, y2]) => {
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  });

  ctx.globalAlpha = 1;
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current); current = word;
    } else { current = test; }
  }
  if (current) lines.push(current);
  return lines;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function synthesizeTagline(element: string, animal: string): string {
  const elementTraits: Record<string, string> = {
    Wood: 'creative vision', Fire: 'passionate energy', Earth: 'grounded wisdom',
    Metal: 'refined precision', Water: 'flowing adaptability',
  };
  const animalTraits: Record<string, string> = {
    Rat: 'quick wit', Ox: 'steady determination', Tiger: 'bold courage',
    Rabbit: 'graceful diplomacy', Dragon: 'magnetic ambition', Snake: 'deep wisdom',
    Horse: 'free spirit', Goat: 'artistic sensitivity', Monkey: 'playful innovation',
    Rooster: 'keen observation', Dog: 'loyal sincerity', Pig: 'generous heart',
  };
  const e = elementTraits[element] || 'unique energy';
  const a = animalTraits[animal] || 'special quality';
  return `${e.charAt(0).toUpperCase() + e.slice(1)} meets ${a}`;
}
