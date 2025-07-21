#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateStaticFiles = () => {
  // ドメインの決定（環境変数の優先順位）
  const domain = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://your-domain.com"; // フォールバック

  const lastMod = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  console.log(`🔧 Generating static files with domain: ${domain}`);

  // sitemap.xml の生成
  const sitemapTemplate = fs.readFileSync(
    path.join(__dirname, "../templates/sitemap.xml.template"),
    "utf8"
  );
  const sitemap = sitemapTemplate
    .replace(/{{DOMAIN}}/g, domain)
    .replace(/{{LAST_MOD}}/g, lastMod);

  fs.writeFileSync(path.join(__dirname, "../public/sitemap.xml"), sitemap);

  // robots.txt の生成
  const robotsTemplate = fs.readFileSync(
    path.join(__dirname, "../templates/robots.txt.template"),
    "utf8"
  );
  const robots = robotsTemplate.replace(/{{DOMAIN}}/g, domain);

  fs.writeFileSync(path.join(__dirname, "../public/robots.txt"), robots);

  console.log("✅ Static files generated successfully!");
  console.log(`   - sitemap.xml (${domain})`);
  console.log(`   - robots.txt (${domain})`);
};

generateStaticFiles();
