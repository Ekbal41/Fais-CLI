#!/usr/bin/env node
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import figlet from "figlet";
import inquirer from "inquirer";
import fs from "fs-extra";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let projectName;
let projectDir;
let langType;

const createProject = async () => {
  const cwd = process.cwd();
  const projectPath = path.join(cwd, projectDir);
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath);
    console.log("Creating project...");

    let lang;
    if (langType === "Javascript") {
      lang = "js";
    }
    if (langType === "Typescript") {
      lang = "ts";
    }

    const templatePath = path.join(__dirname, "templates", lang);
    fs.copySync(templatePath, projectPath);
  }
};

(async () => {
  figlet("Fais Framework", function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
  });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const questions = [
    {
      type: "list",
      name: "projectType",
      message: "What do you want to build today?",
      choices: ["An api server", "A fullstack website"],
      default: "A fullstack website",
    },
    {
      type: "list",
      name: "langType",
      message: "Would you like to use Javascript or Typescript?",
      choices: ["Javascript", "Typescript"],
      default: "Javascript",
    },
    {
      type: "input",
      name: "projectDir",
      message: "Where should I place the project?",
      default: "./",
    },
  ];

  inquirer.prompt(questions).then((answers) => {
    projectName = answers.projectType;
    projectDir = answers.projectDir;
    langType = answers.langType;
    createProject();
  });
})();
