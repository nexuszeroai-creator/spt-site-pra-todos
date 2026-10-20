import { createServer } from "vite";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = path.join(projectRoot, "client", "index.html");
const marker = /<!--SPT_SSR_START-->[\s\S]*?<!--SPT_SSR_END-->/;

if (typeof globalThis.location === "undefined") {
  Object.defineProperty(globalThis, "location", {
    value: new URL("http://localhost/"),
    configurable: true,
  });
}

const vite = await createServer({
  configFile: path.join(projectRoot, "vite.config.ts"),
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
});

try {
  const { default: App } = await vite.ssrLoadModule("/src/App.tsx");
  const rendered = renderToString(createElement(App));
  const html = await readFile(indexPath, "utf8");

  if (!marker.test(html)) {
    throw new Error("Marcadores de renderização SPT não encontrados em client/index.html");
  }

  const nextHtml = html.replace(marker, `<!--SPT_SSR_START-->${rendered}<!--SPT_SSR_END-->`);
  await writeFile(indexPath, nextHtml, "utf8");
  console.log(`HTML inicial SPT atualizado (${rendered.length} caracteres renderizados).`);
} finally {
  await vite.close();
}
