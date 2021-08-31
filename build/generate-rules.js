"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRules = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const custom_error_1 = require("./custom-error");
const generateRules = (options) => {
    let isInitial = true;
    const srcRoot = path_1.default.join(options.srcDir);
    const srcFile = path_1.default.join(options.srcDir, options.srcRootFile);
    const destFile = path_1.default.join(options.out, options.outFileName);
    try {
        fs_1.default.writeFileSync(destFile, resolveImports(srcFile));
    }
    catch (err) {
        if (err instanceof Error) {
            if (isInitial)
                throw new custom_error_1.ArgsError(err.message);
            throw new Error(err.message);
        }
    }
    function resolveImports(filePath) {
        const rulesFile = fs_1.default.readFileSync(filePath).toString();
        isInitial = false;
        const fileElements = rulesFile.split(/include "([A-Za-z0-9\-\_\/.]+\.rules)";/);
        let resolvedRulesFile = "";
        let isImport = false;
        for (const elem of fileElements) {
            if (isImport) {
                const importPath = path_1.default.join(srcRoot, elem);
                resolvedRulesFile += resolveImports(importPath);
            }
            else {
                resolvedRulesFile += elem;
            }
            isImport = !isImport;
        }
        return resolvedRulesFile;
    }
};
exports.generateRules = generateRules;
