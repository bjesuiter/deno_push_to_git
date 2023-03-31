const cmd = new Deno.Command("/usr/bin/env git -v");

await cmd.output();
