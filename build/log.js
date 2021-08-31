"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const chalk_1 = __importDefault(require("chalk"));
class Log {
    constructor(options) {
        this.timestamp = () => {
            return `[${(0, dayjs_1.default)().format("MM-DD HH:mm:ss")}]`;
        };
        this.default = (content, path) => {
            this.log(this.timestamp(), content, this.pathFormat(path));
        };
        this.success = (path) => {
            this.default(chalk_1.default.bgGreenBright(chalk_1.default.black(" SUCCESS ")), path);
        };
        this.error = (path) => {
            this.default(chalk_1.default.bgRed(chalk_1.default.black(" ERROR ")), path);
        };
        this.add = (path) => {
            this.default(chalk_1.default.bgMagenta(chalk_1.default.black(" ADD ")), path);
        };
        this.remove = (path) => {
            this.default(chalk_1.default.bgGray(chalk_1.default.black(chalk_1.default.black(" REMOVE "))), path);
        };
        this.change = (path) => {
            this.default(chalk_1.default.bgYellowBright(chalk_1.default.black(" CHANGE ")), path);
        };
        this.log = console.log.bind(console);
        this.pathFormat = (path) => path.replace(options.srcDir, "");
    }
}
exports.Log = Log;
