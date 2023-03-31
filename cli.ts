import { Command } from "./deps/cliffy.ts";

await new Command()
  .name("cliffy")
  .version("0.1.0")
  .description("Command line framework for Deno")
  .parse(Deno.args);
