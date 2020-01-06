import * as core from "@actions/core";

import * as fs from "fs";
import * as path from "path";

async function run(): Promise<void> {
  const assetPath: string = core.getInput("path");

  const basePath: fs.PathLike = path.resolve(fs.realpathSync(assetPath));
  const files: string[] = fs.readdirSync(basePath);

  if (files && files.length === 1) {
    core.setOutput("name", files[0]);
    core.setOutput("path", path.join(basePath, "/", files[0]));
  } else {
    if (!files || files.length === 0) {
      core.setFailed("No files found in " + basePath);
    } else {
      core.setFailed("Found more than one file in " + basePath);
    }
  }
}

run();
