import { Command } from "./deps/cliffy.ts";
import { VERSION } from "./VERSION.ts";

await new Command()
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
  .parse(Deno.args);
