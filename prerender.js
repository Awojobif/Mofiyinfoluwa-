import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = __dirname;

async function prerender() {
  const templatePath = path.resolve(rootDir, 'dist/index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('dist/index.html not found. Run client build first.');
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, 'utf-8');

  // Import the SSR entry
  const { render } = await import(path.resolve(rootDir, 'dist-ssr/entry-server.js'));

  const routes = [
    {
      url: '/',
      outPath: path.resolve(rootDir, 'dist/index.html'),
      title: 'Mofiyinfoluwa - Product Designer',
      description: 'Product Designer specializing in AI-driven experiences, systems design, and craft. Featured works include MailMint and Poise.',
    },
    {
      url: '/projects/mailmint',
      outPath: path.resolve(rootDir, 'dist/projects/mailmint/index.html'),
      title: 'MailMint Case Study — Mofiyinfoluwa',
      description: 'MailMint case study: An AI-powered email marketing platform designed to simplify campaign creation, onboarding, automation, and analytics.',
    },
    {
      url: '/projects/poise',
      outPath: path.resolve(rootDir, 'dist/projects/poise/index.html'),
      title: 'Poise Case Study — Mofiyinfoluwa',
      description: 'Poise case study: An AI wardrobe web app that turns clothes you already own into daily outfit combinations.',
    },
  ];

  for (const route of routes) {
    console.log(`Prerendering ${route.url}...`);
    const appHtml = render(route.url);

    let html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    // Update title
    html = html.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);

    // Ensure meta description
    if (html.includes('<meta name="description"')) {
      html = html.replace(/<meta name="description" content=".*?"\s*\/?>/, `<meta name="description" content="${route.description}" />`);
    } else {
      html = html.replace('</head>', `  <meta name="description" content="${route.description}" />\n  </head>`);
    }

    const outDir = path.dirname(route.outPath);
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    fs.writeFileSync(route.outPath, html, 'utf-8');
    console.log(`✓ Wrote ${route.outPath}`);
  }

  // Clean up dist-ssr
  const ssrDir = path.resolve(rootDir, 'dist-ssr');
  if (fs.existsSync(ssrDir)) {
    fs.rmSync(ssrDir, { recursive: true, force: true });
  }

  console.log('Prerender complete!');
}

prerender().catch((err) => {
  console.error('Prerender error:', err);
  process.exit(1);
});
