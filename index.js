import figlet from "figlet";
import inquirer from "inquirer";
import path from "path";
//import filesystem module
import fs from "fs-extra";
let projectName;
let projectDir;
let langType;

const createProject = async () => {
  //get the current working directory
  const cwd = process.cwd();
  //see if projectDir is exist
  const projectPath = path.join(cwd, projectDir);
  //if not exist, create one
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath);
    //copy the templates/js/ to the projectDir
    console.log("Creating project...");
    const __dirname = path.resolve(path.dirname(""));
    let lang;
    if (langType === "Javascript") {
      lang = "js";
    }
    if (langType === "Typescript") {
      lang = "ts";
    }
    fs.copySync(path.join(__dirname, `templates/${lang}`), projectPath);
  }
};

const init = async () => {
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
      message: "Where should i place the project?",
      default: "./",
    },
  ];

  inquirer.prompt(questions).then((answers) => {
    projectName = answers.projectType;
    projectDir = answers.projectDir;
    langType = answers.langType;
    createProject();
  });
};

init();
