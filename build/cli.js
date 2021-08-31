"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptions = void 0;
const command_line_args_1 = __importDefault(require("command-line-args"));
const command_line_usage_1 = __importDefault(require("command-line-usage"));
const process_1 = require("process");
const optionDefinitions = [
    { name: "src", type: String, defaultValue: "./firestore" },
    { name: "out", alias: "o", type: String, defaultValue: "./firestore.rules" },
    {
        name: "watch",
        alias: "w",
        type: Boolean,
    },
    { name: "help", alias: "h" },
];
const getOptions = () => {
    const options = (0, command_line_args_1.default)(optionDefinitions);
    if (Object.keys(options).includes("help")) {
        console.log(usage);
        (0, process_1.exit)(0);
    }
    return options;
};
exports.getOptions = getOptions;
const sections = [
    {
        header: "frules-gen",
        content: "Generate firebase.rules from multiple .rules files",
    },
    {
        header: "options",
        optionList: [
            {
                name: "src",
                typeLabel: "{underline path}",
                defaultOption: true,
                defaultValue: "./firestore",
                description: "Root directory where {underline index.rules} is located",
            },
            {
                name: "out",
                alias: "o",
                typeLabel: "{underline path}",
                defaultValue: "./",
                description: "Output destination directory",
            },
            {
                name: "watch",
                alias: "w",
                defaultValue: "false",
                description: "Run watch mode",
            },
        ],
    },
];
const usage = (0, command_line_usage_1.default)(sections);
