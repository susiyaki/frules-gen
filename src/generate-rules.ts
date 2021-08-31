import fs from "fs";
import path from "path";

import { ArgsError } from "./custom-error";
import type { FrulesGenOptions } from "./cli";

export const generateRules = (options: FrulesGenOptions) => {
  const srcRoot = options.src;
  const srcFile = path.join(options.src, "index.rules");
  const destFile = path.join(options.out, "firestore.rules");

  try {
    fs.writeFileSync(destFile, resolveImports(srcFile));
  } catch (err) {
    if (err instanceof Error) {
      throw new ArgsError(err.message);
    }
  }

  function resolveImports(filePath: string) {
    const rulesFile = fs.readFileSync(filePath).toString();

    const fileElements = rulesFile.split(
      /include "([A-Za-z0-9\-\_\/.]+\.rules)";/
    );

    let resolvedRulesFile = "";
    let isImport = false;

    for (const elem of fileElements) {
      if (isImport) {
        const importPath = path.join(srcRoot, elem);
        resolvedRulesFile += resolveImports(importPath);
      } else {
        resolvedRulesFile += elem;
      }
      isImport = !isImport;
    }
    return resolvedRulesFile;
  }
};
