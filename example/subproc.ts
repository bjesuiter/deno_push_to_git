const utf8 = new TextDecoder();

const cmd = new Deno.Command("git", {
  args: ["-v"],
});

const cmdOut1 = await cmd.output();
console.log(cmdOut1, utf8.decode(cmdOut1.stdout), utf8.decode(cmdOut1.stderr));

const currBranchCommand = new Deno.Command("git", {
  args: ["rev-parse --abbrev-ref HEAD"],
});

const cmdOut2 = await currBranchCommand.output();
console.log(cmdOut2, utf8.decode(cmdOut2.stdout), utf8.decode(cmdOut2.stderr));
