import { VERSION } from "../VERSION.ts";
import { $ } from "../deps/execa.ts";

await $`deno install -f --allow-run=git --allow-read --allow-env --allow-net -n push-to-git https://deno.land/x/git_deploy@${VERSION}/cli.ts`;
