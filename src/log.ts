import dayjs from "dayjs";
import chalk from "chalk";

import type { FrulesGenOptions } from "./cli";

type DefaultLog = (content: string) => void;

interface FrulesGenLog {
  readonly default: (content: string, path: string) => void;
  readonly success: DefaultLog;
  readonly error: DefaultLog;
  readonly add: DefaultLog;
  readonly remove: DefaultLog;
  readonly change: DefaultLog;
}

export class Log implements FrulesGenLog {
  private log;
  private pathFormat;
  private timestamp = () => {
    return `[${dayjs().format("MM-DD HH:mm:ss")}]`;
  };

  constructor(options: FrulesGenOptions) {
    this.log = console.log.bind(console);
    this.pathFormat = (path: string) => path.replace(options.src, "");
  }

  readonly default = (content: string, path: string) => {
    this.log(this.timestamp(), content, this.pathFormat(path));
  };

  readonly success = (path: string) => {
    this.default(chalk.bgGreenBright(chalk.black(" SUCCESS ")), path);
  };

  readonly error = (path: string) => {
    this.default(chalk.bgRed(chalk.black(" ERROR ")), path);
  };

  readonly add = (path: string) => {
    this.default(chalk.bgMagenta(chalk.black(" ADD ")), path);
  };

  readonly remove = (path: string) => {
    this.default(chalk.bgGray(chalk.black(chalk.black(" REMOVE "))), path);
  };

  readonly change = (path: string) => {
    this.default(chalk.bgYellowBright(chalk.black(" ADD ")), path);
  };
}
