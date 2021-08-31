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
    const srcRoot = path_1.default.join(__dirname, options.src);
    const srcFile = path_1.default.join(__dirname, options.src, "index.rules");
    const destFile = path_1.default.join(__dirname, options.out);
    try {
        fs_1.default.writeFileSync(destFile, resolveImports(srcFile));
    }
    catch (err) {
        if (err instanceof Error) {
            throw new custom_error_1.ArgsError(err.message);
        }
    }
    function resolveImports(filePath) {
        const rulesFile = fs_1.default.readFileSync(filePath).toString();
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
