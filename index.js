#!/usr/bin/env node
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import figlet from "figlet";
import inquirer from "inquirer";
import fs from "fs-extra";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let ptypeApi = "An api server";
let ptypeWeb = "A fullstack website";
let ptypeBasic = "A basic project";
let ltypeJs = "Javascript";
let ltypeTs = "Typescript";

let projectType;
let projectDir;
let langType;

const createProject = async () => {
  const cwd = process.cwd();
  const projectPath = path.join(cwd, projectDir);
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath);
    console.log(`Creating project on ${projectPath} directory...`);
    let template;

    if (projectType === ptypeApi && langType === ltypeJs) {
      template = "api-js";
    } else if (projectType === ptypeApi && langType === ltypeTs) {
      template = "api-ts";
    } else if (projectType === ptypeWeb && langType === ltypeJs) {
      template = "web-js";
    } else if (projectType === ptypeWeb && langType === ltypeTs) {
      template = "web-ts";
    } else if (projectType === ptypeBasic && langType === ltypeJs) {
      template = "js";
    } else if (projectType === ptypeBasic && langType === ltypeTs) {
      template = "ts";
    }
    const templatePath = path.join(__dirname, "templates", template);
    try {
      await fs.copy(templatePath, projectPath);
      console.log(
        `-Project created successfully!🎉
        -------------------------------
        cd ${projectDir}
        npm install
        npm run dev
        `
      );
    } catch (err) {
      console.error(err);
    }
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
      choices: [ptypeBasic, ptypeApi, ptypeWeb],
      default: ptypeBasic,
    },
    {
      type: "list",
      name: "langType",
      message: "Would you like to use Javascript or Typescript?",
      choices: [ltypeJs, ltypeTs],
      default: ltypeJs,
    },
    {
      type: "input",
      name: "projectDir",
      message: "Where should I place the project?",
      default: "./",
    },
  ];

  inquirer.prompt(questions).then((answers) => {
    projectType = answers.projectType;
    projectDir = answers.projectDir;
    langType = answers.langType;
    createProject();
  });
})();
