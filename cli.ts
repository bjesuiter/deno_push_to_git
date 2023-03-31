import { Command } from "./deps/cliffy.ts";
import { VERSION } from "./VERSION.ts";

await new Command()
  .name("push-to-git")
  .version(VERSION)
  .description(`
    Pushes the current branch to an arbitrary branch 
    in the same or in another repository for deployment.
  `)
  .parse(Deno.args);
