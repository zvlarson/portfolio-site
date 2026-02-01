/* eslint-disable no-undef */
import sharp from 'sharp';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// Colors
const BG_COLOR = '#0a0a0b';
const DOT_COLOR = '#6366f1';

// Generate apple-touch-icon (180x180)
async function generateAppleTouchIcon() {
  const svg = `
    <svg width="180" height="180" xmlns="http://www.w3.org/2000/svg">
      <rect width="180" height="180" fill="${BG_COLOR}"/>
      <circle cx="90" cy="90" r="45" fill="${DOT_COLOR}"/>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(join(publicDir, 'apple-touch-icon.png'));

  console.log('Created apple-touch-icon.png');
}

// Generate favicon.ico (multi-size)
async function generateFavicon() {
  const sizes = [16, 32, 48];
  const pngs = [];

  for (const size of sizes) {
    const r = size / 4;
    const svg = `
      <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${size}" height="${size}" fill="${BG_COLOR}"/>
        <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="${DOT_COLOR}"/>
      </svg>
    `;

    const png = await sharp(Buffer.from(svg))
      .png()
      .toBuffer();

    pngs.push({ size, buffer: png });
  }

  // For ICO, we'll just use the 32x32 as a PNG fallback
  // Sharp doesn't support ICO output, so we'll create a simple one
  await sharp(pngs.find(p => p.size === 32).buffer)
    .toFile(join(publicDir, 'favicon.ico'));

  console.log('Created favicon.ico');
}

// Generate OG image (1200x630)
async function generateOGImage() {
  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="${BG_COLOR}"/>

      <!-- Decorative dot -->
      <circle cx="100" cy="315" r="40" fill="${DOT_COLOR}"/>

      <!-- Title -->
      <text x="600" y="260" text-anchor="middle" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="42" font-weight="600" fill="white">
        Zachary Larson, MBA, SHRM-SCP
      </text>

      <!-- Subtitle -->
      <text x="600" y="320" text-anchor="middle" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="32" font-weight="500" fill="${DOT_COLOR}">
        Strategy &amp; Operations Leader
      </text>

      <!-- Description line 1 -->
      <text x="600" y="400" text-anchor="middle" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="22" fill="#a1a1aa">
        Strategy and operations leader driving measurable outcomes
      </text>

      <!-- Description line 2 -->
      <text x="600" y="435" text-anchor="middle" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="22" fill="#a1a1aa">
        through technology optimization, transformation, and operational excellence.
      </text>

      <!-- URL -->
      <text x="600" y="540" text-anchor="middle" font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="20" fill="#71717a">
        zvlarson.com
      </text>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(join(publicDir, 'og.png'));

  console.log('Created og.png');
}

// Run all
async function main() {
  try {
    await generateAppleTouchIcon();
    await generateFavicon();
    await generateOGImage();
    console.log('All images generated successfully!');
  } catch (error) {
    console.error('Error generating images:', error);
    process.exit(1);
  }
}

main();
