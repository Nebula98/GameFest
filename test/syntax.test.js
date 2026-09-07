const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const sourceDirectory = path.join(__dirname, "..", "src");

const getJavaScriptFiles = (directory) => {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? getJavaScriptFiles(entryPath) : [entryPath];
  }).filter((filePath) => filePath.endsWith(".js"));
};

test("todos los archivos JavaScript del backend tienen sintaxis válida", () => {
  const sourceFiles = getJavaScriptFiles(sourceDirectory);

  assert.ok(sourceFiles.length > 0);

  sourceFiles.forEach((filePath) => {
    execFileSync(process.execPath, ["--check", filePath], { stdio: "pipe" });
  });
});