#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const updateHtmlDomain = () => {
  // ドメインの決定
  const domain = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://your-domain.com";

  console.log(`🔧 Updating HTML with domain: ${domain}`);

  // index.html の更新
  const htmlPath = path.join(__dirname, "../index.html");
  let html = fs.readFileSync(htmlPath, "utf8");

  // プレースホルダーURLを実際のドメインに置換
  html = html.replace(/https:\/\/your-domain\.com/g, domain);

  fs.writeFileSync(htmlPath, html);

  console.log("✅ HTML updated successfully!");
};

updateHtmlDomain();
