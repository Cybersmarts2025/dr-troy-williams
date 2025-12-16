const fs = require("fs");
const path = require("path");

const distAssets = path.join(process.cwd(), "dist", "assets");
const jsFile = fs.readdirSync(distAssets).find(f => f.endsWith(".js") && f.startsWith("index-"));

if (!jsFile) {
  console.error("No index-*.js found in dist/assets");
  process.exit(1);
}

const jsPath = path.join(distAssets, jsFile);
const js = fs.readFileSync(jsPath, "utf8");
const idx = js.indexOf("Lovable");

console.log("JS_FILE:", jsFile);
console.log("LOVABLE_INDEX:", idx);

if (idx === -1) {
  console.log("Lovable string not found in JS");
  process.exit(0);
}

const mapPath = jsPath + ".map";
if (!fs.existsSync(mapPath)) {
  console.error("No sourcemap found at:", mapPath);
  process.exit(1);
}

const map = JSON.parse(fs.readFileSync(mapPath, "utf8"));

console.log("SOURCES_COUNT:", map.sources.length);
console.log("FIRST_20_SOURCES:");
map.sources.slice(0, 20).forEach(s => console.log("  ", s));

console.log("POSSIBLE_MATCH_SOURCES:");
const sourcesContent = map.sourcesContent || [];
let shown = 0;

for (let i = 0; i < sourcesContent.length; i++) {
  const content = sourcesContent[i] || "";
  if (content.includes("Lovable")) {
    console.log("  ", map.sources[i]);
    shown++;
    if (shown >= 20) break;
  }
}
