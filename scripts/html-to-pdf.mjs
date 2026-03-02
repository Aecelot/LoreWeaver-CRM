#!/usr/bin/env node
/**
 * Convert HTML newsletter to PDF
 * Usage: node scripts/html-to-pdf.mjs newsletters/dist/2026-03-newsletter.html
 */

import puppeteer from 'puppeteer';
import { resolve, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const inputPath = process.argv[2];
if (!inputPath) {
  console.log('Usage: node scripts/html-to-pdf.mjs <html-file>');
  process.exit(1);
}

const absolutePath = resolve(inputPath);
const outputPath = absolutePath.replace('.html', '.pdf');

console.log(`Converting: ${absolutePath}`);

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

await page.goto(`file://${absolutePath}`, { waitUntil: 'networkidle0' });

await page.pdf({
  path: outputPath,
  format: 'A4',
  printBackground: true,
  margin: {
    top: '0',
    right: '0',
    bottom: '0',
    left: '0'
  }
});

await browser.close();

console.log(`✅ PDF saved: ${outputPath}`);
