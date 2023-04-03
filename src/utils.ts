export async function exec(executable: string, args: string[]) {
  const cmd = new Deno.Command(executable, {
    stdout: "piped",
    stderr: "piped",
    args,
  });

  const childProcess = cmd.spawn();
  const cmdOut = await childProcess.output();
  const stdout = new TextDecoder().decode(cmdOut.stdout).trim();
  const stderr = new TextDecoder().decode(cmdOut.stderr).trim();
  return `
  stdout: ${stdout}
  stderr: ${stderr}
  `;
}
