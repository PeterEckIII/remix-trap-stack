/*eslint-disable no-console */
import { promises as fs } from "fs";
import { glob } from "glob";
import { parse } from "node-html-parser";
import path from "path";

const cwd = process.cwd();
const inputDir = path.join(cwd, "resources", "icons");
const inputDirRelative = path.relative(cwd, inputDir);
const outputDir = path.join(cwd, "app", "components", "icon", "icons");

const files = glob.sync("**/*.svg", {
  cwd: inputDir,
});
if (files.length === 0) {
  console.log(`No SVG files found in ${inputDirRelative}`);
  process.exit(0);
}
// The relative paths are just for cleaner logs
console.log(`Generating sprite for ${inputDirRelative}`);

generateSvgSprite({
  files,
  inputDir,
  outputPath: path.join(outputDir, "icon.svg"),
}).then(() => {
  generateTypes({
    names: files.map((file: string) =>
      fileNameToCamelCase(file.replace(/\.svg$/, ""))
    ),
    outputPath: path.join(outputDir, "types.ts"),
  });
});
function fileNameToCamelCase(fileName: string): string {
  const words = fileName.split("-");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join("");
}
/**
 * Creates a single SVG file that contains all the icons
 */
async function generateSvgSprite({
  files,
  inputDir,
  outputPath,
}: {
  files: string[];
  inputDir: string;
  outputPath: string;
}) {
  // Each SVG becomes a symbol and we wrap them all in a single SVG
  const symbols = await Promise.all(
    files.map(async (file) => {
      const fileName = fileNameToCamelCase(file.replace(/\.svg$/, ""));
      const input = await fs.readFile(path.join(inputDir, file), "utf8");

      const root = parse(input);
      const svg = root.querySelector("svg");
      if (!svg) throw new Error("No SVG element found");
      svg.tagName = "symbol";
      svg.setAttribute("id", fileName);
      svg.removeAttribute("xmlns");
      svg.removeAttribute("xmlns:xlink");
      svg.removeAttribute("version");
      svg.removeAttribute("width");
      svg.removeAttribute("height");
      return svg.toString().trim();
    })
  );
  const output = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0" height="0">`,
    `<defs>`, // for semantics: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs
    ...symbols,
    `</defs>`,
    `</svg>`,
  ].join("\n");
  return fs.writeFile(outputPath, output, "utf8");
}

async function generateTypes({
  names,
  outputPath,
}: {
  names: string[];
  outputPath: string;
}) {
  const output = [
    `// This file is generated by npm run build:icons`,
    "",
    `export type IconName =`,
    ...names.map((name) => `\t| "${name}"`),
    "",
    `export const iconNames = [`,
    ...names.map((name) => `\t  "${name}",`),
    "] as const",
    "",
  ].join("\n");

  return fs.writeFile(outputPath, output, "utf8");
}
