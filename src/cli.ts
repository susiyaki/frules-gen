import commandLineArgs, { OptionDefinition } from "command-line-args";
import commandLineUsage, { Section } from "command-line-usage";
import { exit } from "process";

export interface FrulesGenOptions {
  srcDir: string;
  srcFileName: string;
  outDir: string;
  outFileName: string;
  watch?: boolean;
  help?: null;
  ignore: string[];
}

const optionDefinitions: OptionDefinition[] = [
  { name: "srcDir", alias: "s", type: String, defaultValue: "./firestore" },
  { name: "srcFileName", type: String, defaultValue: "./index.rules" },
  { name: "outDir", alias: "o", type: String, defaultValue: "./" },
  { name: "outFileName", type: String, defaultValue: "firestore.rules" },
  {
    name: "ignore",
    type: String,
    multiple: true,
    defaultValue: ["**/__tests__/**", "**/tests/**"],
  },
  {
    name: "watch",
    alias: "w",
    type: Boolean,
  },
  { name: "help", alias: "h" },
];

const getOptions = () => {
  const options = commandLineArgs(optionDefinitions) as FrulesGenOptions;

  if (Object.keys(options).includes("help")) {
    console.log(usage);
    exit(0);
  }

  return options;
};

const sections: Section[] = [
  {
    header: "frules-gen",
    content: "Generate firebase.rules from multiple .rules files",
  },
  {
    header: "Main options",
    optionList: [
      { name: "help", alias: "h", description: "Display this usage guide." },
      {
        name: "srcDir",
        typeLabel: "{underline string}",
        defaultValue: "./firestore",
        description:
          "Set root directory path where {underline index.rules} is located. (default: {underline <rootDir>/firestore})",
      },
      {
        name: "srcRootFile",
        typeLabel: "{underline string}",
        defaultValue: "./index.rules",
        description:
          "Set entry file name of *.rules. (default: {underline <srcDir>/index.rules})",
      },
      {
        name: "out",
        alias: "o",
        typeLabel: "{underline string}",
        defaultValue: "./",
        description:
          "Set export {underline firestore.rules} file (default: {underline <rootDir>})",
      },
      {
        name: "outFileName",
        typeLabel: "{underline string}",
        defaultValue: "firestore.rules",
        description:
          "Set to rename {underline firestore.rules}. (default: {underline firestore.rules})",
      },
      {
        name: "ignore",
        typeLabel: "{underline Array<string>}",
        description:
          'In watch mode, When include without .rules extention files in <srcDir>, pass ignore regex cases. (default: ["**/__tests__/**", "**/tests/**"])',
      },
      {
        name: "watch",
        alias: "w",
        defaultValue: "false",
        description: "Run watch mode.",
      },
    ],
  },
  {
    header: "",
    content: "Project home: https://github.com/susiyaki/frules-gen",
  },
];

const usage = commandLineUsage(sections);

export { getOptions };
