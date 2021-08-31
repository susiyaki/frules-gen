import chalk from "chalk";
import chokidar from "chokidar";
import path from "path/posix";
import { exit } from "process";
import { getOptions } from "./cli";
import { ArgsError } from "./custom-error";
import { generateRules } from "./generate-rules";
import { Log } from "./log";

const options = getOptions();

const log = new Log(options);

/* Normal mode */
if (!options.watch) {
  try {
    generateRules(options);
    log.success(`Generated ${path.join(options.outDir, options.outFileName)}`);
    exit(0);
  } catch (err) {
    if (err instanceof Error) {
      log.error(err.message);
    }
    exit(1);
  }
}

const _ignorePatterns = () => {
  return options.ignore.map((ign) =>
    ign.replace("**", ".*").replace("*", ".*").replace("/", "/")
  );
};

const ignorePatterns = _ignorePatterns();

/* Watch mode */
const watcher = chokidar.watch(options.srcDir, {
  ignored: (pathname: string) => {
    return !!ignorePatterns.find((ign) => new RegExp(ign).test(pathname));
  },
  ignoreInitial: true,
});

const execGenerateRules = (path?: string) => {
  try {
    generateRules(options);
    path && log.success(path);
  } catch (err) {
    if (err instanceof ArgsError) {
      log.error(err.message);
      exit(1);
    } else if (err instanceof Error) {
      log.error(err.message);
    }
  }
};

watcher
  .on("add", log.success)
  .on("change", log.change)
  .on("unlink", log.remove)
  .on("error", log.error)
  .on("ready", () =>
    log.default(
      `Ready to generate rules. Watching ${chalk.underline(
        `${options.srcDir}/**/*.rules`
      )}`,
      ""
    )
  );

watcher
  .on("ready", execGenerateRules)
  .on("add", execGenerateRules)
  .on("change", execGenerateRules)
  .on("unlink", execGenerateRules);
