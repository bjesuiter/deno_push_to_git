import { VERSION } from "../VERSION.ts";
import { $ } from "../deps/execa.ts";

// Tags the current commit with the version in VERSION.ts

await $`git tag ${VERSION}`;
await $`git push --tags`;
