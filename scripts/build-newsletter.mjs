#!/usr/bin/env node
/**
 * Newsletter Builder
 * Converts markdown newsletters to styled HTML matching LoreWeaver website
 * 
 * Usage: node scripts/build-newsletter.mjs newsletters/2026-03-newsletter.md
 * Output: newsletters/dist/2026-03-newsletter.html
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { marked } from 'marked';
import { dirname, basename, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// LoreWeaver brand colors (from website CSS)
const BRAND = {
  primaryBg: '#000000',
  secondaryBg: '#0a0a0a',
  surface: '#1a1a1a',
  surfaceAlt: '#2a2a2a',
  textPrimary: '#ffffff',
  textSecondary: 'rgba(255, 255, 255, 0.8)',
  textTertiary: 'rgba(255, 255, 255, 0.7)',
  textMuted: 'rgba(255, 255, 255, 0.6)',
  accentOrange: '#FF5F3F',
  accentOrangeDark: '#CC4C32',
  accentBlue: '#00aaff',
  borderColor: 'rgba(255, 255, 255, 0.1)',
};

// HTML template matching LoreWeaver website style
const htmlTemplate = (title, content, preheader = '') => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${title}</title>
  
  <!-- Preheader text (hidden, shows in email preview) -->
  <span style="display:none;font-size:1px;color:#000000;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
    ${preheader}
  </span>
  
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
    
    /* Reset */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    html {
      background: ${BRAND.primaryBg};
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: ${BRAND.primaryBg};
      color: ${BRAND.textPrimary};
      line-height: 1.6;
      font-size: 14px;
      -webkit-font-smoothing: antialiased;
    }
    
    /* Email wrapper */
    .email-wrapper {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px 16px;
      background: ${BRAND.primaryBg};
    }
    
    /* Header */
    .header {
      text-align: center;
      padding-bottom: 16px;
      border-bottom: 1px solid ${BRAND.borderColor};
      margin-bottom: 16px;
    }
    
    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: ${BRAND.textPrimary};
      text-decoration: none;
      letter-spacing: -0.02em;
    }
    
    .logo-icon {
      display: inline-block;
      margin-right: 8px;
    }
    
    /* Content */
    .content {
      color: ${BRAND.textSecondary};
    }
    
    .content h1 {
      font-size: 1.5rem;
      font-weight: 800;
      color: ${BRAND.textPrimary};
      margin-bottom: 4px;
      letter-spacing: -0.03em;
      line-height: 1.2;
    }
    
    .content h1 .accent {
      color: ${BRAND.accentOrange};
    }
    
    .content h2 {
      font-size: 1rem;
      font-weight: 700;
      color: ${BRAND.textPrimary};
      margin-top: 16px;
      margin-bottom: 6px;
      padding-bottom: 4px;
      border-bottom: 2px solid ${BRAND.accentOrange};
      display: inline-block;
    }
    
    .content h3 {
      font-size: 0.9rem;
      font-weight: 600;
      color: ${BRAND.textPrimary};
      margin-top: 12px;
      margin-bottom: 4px;
    }
    
    .content p {
      margin-bottom: 8px;
      color: ${BRAND.textSecondary};
      font-size: 0.85rem;
    }
    
    /* Images */
    .content img {
      max-width: 70%;
      height: auto;
      border-radius: 6px;
      margin: 12px 0;
      display: block;
    }
    
    .content strong {
      color: ${BRAND.textPrimary};
      font-weight: 600;
    }
    
    .content em {
      color: ${BRAND.textTertiary};
      font-style: italic;
    }
    
    .content a {
      color: ${BRAND.accentOrange};
      text-decoration: none;
      border-bottom: 1px solid transparent;
      transition: border-color 0.2s;
    }
    
    .content a:hover {
      border-bottom-color: ${BRAND.accentOrange};
    }
    
    /* Lists */
    .content ul, .content ol {
      margin: 10px 0;
      padding-left: 20px;
    }
    
    .content li {
      margin-bottom: 4px;
      color: ${BRAND.textSecondary};
      font-size: 0.9rem;
    }
    
    .content li strong {
      color: ${BRAND.accentOrange};
    }
    
    /* Blockquotes */
    .content blockquote {
      border-left: 3px solid ${BRAND.accentOrange};
      padding-left: 16px;
      margin: 14px 0;
      color: ${BRAND.textTertiary};
      font-style: italic;
      font-size: 0.9rem;
    }
    
    /* Code */
    .content code {
      background: ${BRAND.surface};
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'SF Mono', Monaco, 'Courier New', monospace;
      font-size: 0.9em;
      color: ${BRAND.accentOrange};
    }
    
    .content pre {
      background: ${BRAND.surface};
      padding: 20px;
      border-radius: 8px;
      overflow-x: auto;
      margin: 24px 0;
      border: 1px solid ${BRAND.borderColor};
    }
    
    .content pre code {
      background: none;
      padding: 0;
      color: ${BRAND.textSecondary};
    }
    
    /* Tables */
    .content table {
      width: 100%;
      border-collapse: collapse;
      margin: 14px 0;
      font-size: 0.8rem;
    }
    
    .content th {
      background: ${BRAND.surface};
      color: ${BRAND.textPrimary};
      font-weight: 600;
      text-align: left;
      padding: 8px 10px;
      border-bottom: 2px solid ${BRAND.accentOrange};
    }
    
    .content td {
      padding: 6px 10px;
      border-bottom: 1px solid ${BRAND.borderColor};
      color: ${BRAND.textSecondary};
    }
    
    .content tr:hover td {
      background: ${BRAND.secondaryBg};
    }
    
    /* Horizontal rules */
    .content hr {
      border: none;
      height: 1px;
      background: ${BRAND.borderColor};
      margin: 16px 0;
    }
    
    /* CTA Buttons */
    .cta-button {
      display: inline-block;
      background: ${BRAND.accentOrange};
      color: ${BRAND.primaryBg} !important;
      padding: 14px 28px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.95rem;
      margin: 8px 8px 8px 0;
      transition: background 0.2s;
      border-bottom: none !important;
    }
    
    .cta-button:hover {
      background: ${BRAND.accentOrangeDark};
    }
    
    .cta-button-secondary {
      background: transparent;
      border: 1px solid ${BRAND.textMuted};
      color: ${BRAND.textPrimary} !important;
    }
    
    .cta-button-secondary:hover {
      border-color: ${BRAND.textPrimary};
      background: transparent;
    }
    
    /* Feature cards */
    .feature-card {
      background: ${BRAND.surface};
      border: 1px solid ${BRAND.borderColor};
      border-radius: 12px;
      padding: 24px;
      margin: 16px 0;
    }
    
    .feature-card h4 {
      color: ${BRAND.accentOrange};
      font-weight: 600;
      margin-bottom: 8px;
    }
    
    /* Metrics highlight */
    .metric {
      display: inline-block;
      background: ${BRAND.surface};
      border: 1px solid ${BRAND.accentOrange};
      border-radius: 8px;
      padding: 8px 16px;
      margin: 4px;
    }
    
    .metric-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: ${BRAND.accentOrange};
    }
    
    .metric-label {
      font-size: 0.85rem;
      color: ${BRAND.textMuted};
    }
    
    /* Footer */
    .footer {
      margin-top: 20px;
      padding-top: 16px;
      border-top: 1px solid ${BRAND.borderColor};
      text-align: center;
      color: ${BRAND.textMuted};
      font-size: 0.8rem;
    }
    
    .footer a {
      color: ${BRAND.textTertiary};
    }
    
    .social-links {
      margin: 20px 0;
    }
    
    .social-links a {
      display: inline-block;
      margin: 0 12px;
      color: ${BRAND.textMuted};
    }
    
    .social-links a:hover {
      color: ${BRAND.accentOrange};
    }
    
    /* Responsive */
    @media (max-width: 600px) {
      .email-wrapper {
        padding: 24px 16px;
      }
      
      .content h1 {
        font-size: 2rem;
      }
      
      .content h2 {
        font-size: 1.3rem;
      }
      
      .content table {
        font-size: 0.85rem;
      }
      
      .content th, .content td {
        padding: 8px 12px;
      }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <!-- Header -->
    <div class="header">
      <a href="https://loreweaver.ink" class="logo">
        <span class="logo-icon">📖</span>LoreWeaver
      </a>
    </div>
    
    <!-- Content -->
    <div class="content">
      ${content}
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <div class="social-links">
        <a href="https://linkedin.com/company/loreweaver">LinkedIn</a>
        <a href="https://twitter.com/laborare_ink">Twitter</a>
        <a href="https://loreweaver.ink">Website</a>
      </div>
      <p>
        LoreWeaver B.V. — Amsterdam, Netherlands<br>
        <a href="mailto:rijk@loreweaver.ink">rijk@loreweaver.ink</a>
      </p>
      <p style="margin-top: 16px; font-size: 0.8rem;">
        <a href="#">Unsubscribe</a> · <a href="#">View in browser</a>
      </p>
    </div>
  </div>
</body>
</html>
`;

// Configure marked for better output
marked.setOptions({
  breaks: true,
  gfm: true,
});

// Custom renderer for special formatting
const renderer = {
  // Make h1 with accent color on last word
  heading({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    if (depth === 1) {
      const words = text.split(' ');
      if (words.length > 1) {
        const lastWord = words.pop();
        return `<h1>${words.join(' ')} <span class="accent">${lastWord}</span></h1>\n`;
      }
      return `<h1>${text}</h1>\n`;
    }
    return `<h${depth}>${text}</h${depth}>\n`;
  }
};

marked.use({ renderer });

// Main build function
function buildNewsletter(inputPath) {
  // Read markdown
  let markdown = readFileSync(inputPath, 'utf-8');
  
  // Get the directory of the input file for resolving relative paths
  const inputDir = resolve(dirname(inputPath));
  
  // Convert relative image paths to absolute file:// URLs
  markdown = markdown.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
    // Skip if already absolute URL
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('file://')) {
      return match;
    }
    // Convert to absolute file:// URL
    const absolutePath = resolve(inputDir, src).replace(/\\/g, '/');
    return `![${alt}](file:///${absolutePath})`;
  });
  
  // Extract title from first h1
  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : 'LoreWeaver Newsletter';
  
  // Extract preheader from first paragraph or subtitle
  const preheaderMatch = markdown.match(/^\*\*(.+)\*\*$/m) || markdown.match(/^#\s+.+\n+(.+)$/m);
  const preheader = preheaderMatch ? preheaderMatch[1].substring(0, 150) : '';
  
  // Convert to HTML
  const htmlContent = marked.parse(markdown);
  
  // Build full HTML
  const fullHtml = htmlTemplate(title, htmlContent, preheader);
  
  // Ensure output directory exists
  const outputDir = join(dirname(inputPath), 'dist');
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }
  
  // Write output
  const outputFilename = basename(inputPath).replace('.md', '.html');
  const outputPath = join(outputDir, outputFilename);
  writeFileSync(outputPath, fullHtml);
  
  console.log(`✅ Built: ${outputPath}`);
  return outputPath;
}

// CLI
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
📧 LoreWeaver Newsletter Builder

Usage:
  node scripts/build-newsletter.mjs <markdown-file>
  node scripts/build-newsletter.mjs newsletters/2026-03-newsletter.md

Options:
  --all    Build all newsletters in newsletters/
  `);
  process.exit(0);
}

if (args[0] === '--all') {
  // Build all newsletters
  const { readdirSync } = await import('fs');
  const newsletterDir = join(__dirname, '..', 'newsletters');
  const files = readdirSync(newsletterDir).filter(f => f.endsWith('.md'));
  
  for (const file of files) {
    buildNewsletter(join(newsletterDir, file));
  }
} else {
  // Build single file
  buildNewsletter(args[0]);
}
