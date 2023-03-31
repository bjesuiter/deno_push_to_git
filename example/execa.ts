import { $ } from "npm:execa@latest";

const { stdout: gitVersion } = await $`git -v`;
console.log(gitVersion);

const { stdout: currBranch } = await $`git rev-parse --abbrev-ref HEAD`;
console.log(currBranch);
// "tag": "",
