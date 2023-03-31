import { VERSION } from "../VERSION.ts";
import { $ } from "../deps/execa.ts";

// Tags the current commit with the version in VERSION.ts

const { stdout: taggingResult } = await $`git tag -a ${VERSION}`;
console.log(taggingResult);
