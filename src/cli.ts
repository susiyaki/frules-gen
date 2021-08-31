import commandLineArgs, { OptionDefinition } from "command-line-args";
import commandLineUsage, { Section } from "command-line-usage";
import { exit } from "process";

export interface FrulesGenOptions {
  src: string;
  out: string;
  watch?: boolean;
  help?: null;
  ignoreSrc?: string // TODO
}

const optionDefinitions: OptionDefinition[] = [
  { name: "src", type: String, defaultValue: "./firestore" },
  { name: "out", alias: "o", type: String, defaultValue: "." },
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

const usage = commandLineUsage(sections);

export { getOptions };
