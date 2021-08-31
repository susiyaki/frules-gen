import commandLineArgs, { OptionDefinition } from "command-line-args";
import commandLineUsage, { Section } from "command-line-usage";
import { exit } from "process";

export interface FrulesGenOptions {
  srcDir: string;
  srcRootFile: string;
  out: string;
  outFileName: string;
  watch?: boolean;
  help?: null;
  ignoreSrc?: string; // TODO
}

const optionDefinitions: OptionDefinition[] = [
  { name: "srcDir", type: String, defaultValue: "./firestore" },
  { name: "srcRootFile", type: String, defaultValue: "./index.rules" },
  { name: "out", alias: "o", type: String, defaultValue: "./" },
  { name: "outFileName", type: String, defaultValue: "firestore.rules" },
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
    header: "options",
    optionList: [
      {
        name: "srcDir",
        typeLabel: "{underline string}",
        defaultValue: "./firestore",
        description: "Root directory where {underline index.rules} is located",
      },
      {
        name: "srcRootFile",
        typeLabel: "{underline string}",
        defaultOption: true,
        defaultValue: "./index.rules",
      },
      {
        name: "out",
        alias: "o",
        typeLabel: "{underline string}",
        defaultValue: "./",
        description: "Output destination directory",
      },
      {
        name: "outFileName",
        typeLabel: "{underline string}",
        defaultValue: "firestore.rules",
      },
      {
        name: "ignoreSrc",
        typeLabel: "{underline string}",
        description: "TODO",
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

const usage = commandLineUsage(sections);

export { getOptions };
