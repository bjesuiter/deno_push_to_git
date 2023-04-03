import {
  Command,
  Confirm,
  DenoLandProvider,
  HelpCommand,
  UpgradeCommand,
  ValidationError,
} from "./deps/cliffy.ts";
import { $ } from "./deps/execa.ts";
import { exec } from "./src/utils.ts";

import { VERSION } from "./VERSION.ts";

const { options, cmd } = await new Command()
  .name("push-to-git")
  .description(`
    Pushes the current branch to an arbitrary branch 
    in the same or in another repository for deployment.
  `)
  .version(VERSION)
  .versionOption(
    " -v, --version",
    "Print version info.",
  )
  .option(
    "-t --target <target>",
    "Git Target to push to, this can be a full git address or a registered git remote name",
  )
  .option(
    "-b --branch <branch>",
    "Target branch name to push to, defaults to the same name like input branch",
  )
  .option(
    "-e --extra <extra>",
    "A string value with extra git options which should be used",
  )
  .option("-m --master", "Sets the target branch to master per default")
  .option("-M --main", "Sets the target branch to main per default")
  .option(
    "-d --dry-run",
    "Emulates the upload - useful for checking input params",
  )
  .option(
    "-p --production",
    "Sets the production flag which triggers additional checks when uploading",
  )
  .option("-f --force", "Forces git push")
  .error((error, cmd) => {
    if (error instanceof ValidationError) {
      cmd.showHelp();
    }
    console.error(error);
    Deno.exit(error instanceof ValidationError ? error.exitCode : 1);
  })
  .command("help", new HelpCommand().global())
  // TODO: Figure out how this upgrade command works
  // .command(
  //   "upgrade",
  //   new UpgradeCommand({
  //     main: "cli.ts",
  //     args: [
  //       `-f`,
  //       `--allow-run=git`,
  //       "--allow-read",
  //       "--allow-env",
  //       "--allow-net",
  //     ],
  //     provider: new DenoLandProvider(),
  //   }),
  // )
  .parse(Deno.args);

// Show Help when no option was passed
if (Object.keys(options).length < 1) {
  cmd.showHelp();
  Deno.exit(0);
}

// Run the code for push-to-git

// Git address like or git remote name
// Format: protocol://user@git-repo.address/path.git OR remote-name (like "origin")
const gitTarget = options.target;
let gitTargetBranch = options.branch;
const targetBranchDefault = options.master ? options.master : false;
const extraOptions = options.extra;
const force = options.force;
const dryRun = options.dryRun;
const isProduction = options.production;

if (gitTarget === undefined) {
  console.error("Git target address or remote name is missing");
  Deno.exit(1);
}

async function runGitPush(gitParameters: string[]) {
  if (dryRun) {
    console.log("Dry Run finished");
    Deno.exit(0);
  }

  // const { stdout } = await $`git ${gitParameters.join(" ")}`;
  const stdout = await exec("git", gitParameters);
  return stdout;
}

// Detect the current branch name
const { stdout } = await $`git rev-parse --abbrev-ref HEAD`;
const currGitBranch = stdout.trim();

if (!currGitBranch || currGitBranch.length < 1) {
  console.error("Current git branch is undefined!");
  Deno.exit(2);
}

if (gitTargetBranch === undefined) {
  gitTargetBranch = targetBranchDefault ? "master" : currGitBranch;
}

console.log(
  `Push current git branch [${currGitBranch}] to ${gitTargetBranch} of: \n ${gitTarget}`,
);

const gitParameters = ["push"];

if (force) {
  gitParameters.push("-f");
}

if (typeof extraOptions === "string") {
  gitParameters.push(extraOptions);
}

gitParameters.push(`${gitTarget}`);
gitParameters.push(`${currGitBranch}:${gitTargetBranch}`);

console.log(`The exact command is: 
        git ${gitParameters.join(" ")}`);

if (isProduction) {
  const proceed = await Confirm.prompt(
    `CAUTION: You are updating a production branch! Proceed? (yes | NO) `,
  );

  if (!proceed) {
    console.log("Push canceled by user");
    Deno.exit(0);
  }
}

const childOut = runGitPush(gitParameters);
console.log(await childOut);
