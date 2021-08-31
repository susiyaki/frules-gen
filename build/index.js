"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const chokidar_1 = __importDefault(require("chokidar"));
const posix_1 = __importDefault(require("path/posix"));
const process_1 = require("process");
const cli_1 = require("./cli");
const custom_error_1 = require("./custom-error");
const generate_rules_1 = require("./generate-rules");
const log_1 = require("./log");
const options = (0, cli_1.getOptions)();
const log = new log_1.Log(options);
/* Normal mode */
if (!options.watch) {
    try {
        (0, generate_rules_1.generateRules)(options);
        log.success(`Generated ${posix_1.default.join(options.out, options.outFileName)}`);
        (0, process_1.exit)(0);
    }
    catch (err) {
        if (err instanceof Error) {
            log.error(err.message);
        }
        (0, process_1.exit)(1);
    }
}
/* Watch mode */
const watcher = chokidar_1.default.watch(options.srcDir, {
    ignored: (pathname) => pathname.includes("tests"),
    ignoreInitial: true,
});
const execGenerateRules = (path) => {
    try {
        (0, generate_rules_1.generateRules)(options);
        path && log.success(path);
    }
    catch (err) {
        if (err instanceof custom_error_1.ArgsError) {
            log.error(err.message);
            (0, process_1.exit)(1);
        }
        else if (err instanceof Error) {
            log.error(err.message);
        }
    }
};
watcher
    .on("add", log.success)
    .on("change", log.change)
    .on("unlink", log.remove)
    .on("error", log.error)
    .on("ready", () => log.default(`Ready to generate rules. Watching ${chalk_1.default.underline(`${options.srcDir}/**/*.rules`)}`, ""));
watcher
    .on("ready", execGenerateRules)
    .on("add", execGenerateRules)
    .on("change", execGenerateRules)
    .on("unlink", execGenerateRules);
