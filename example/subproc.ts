const cmd = new Deno.Command("git", {
    args: ['-v']
});

cmd.spawn();
