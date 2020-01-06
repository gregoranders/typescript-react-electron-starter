import * as core from "@actions/core";
import { GitHub } from "@actions/github";

import * as Octokit from "@octokit/rest";

import * as fs from "fs";
import { getType } from "mime";
import * as path from "path";

async function run(): Promise<void> {
  const assetUploadURL: string = core.getInput("url", {required: true});
  const assetName: string = core.getInput("name", {required: true});
  const assetPath: string = core.getInput("path", {required: true});

  const github: GitHub = new GitHub(process.env.GITHUB_TOKEN);

  const fullPathChecked: fs.PathLike = path.resolve(fs.realpathSync(assetPath));

  if (!fs.existsSync(fullPathChecked)) {
    core.setFailed("Asset path not found " + assetName);
  }

  try {
    const headers: Octokit.ReposUploadReleaseAssetParamsHeaders = {
      "content-length": fs.statSync(fullPathChecked).size,
      "content-type": getType(fullPathChecked),
    };

    const response: Octokit.Response<Octokit.ReposUploadReleaseAssetResponse> = await github.repos.uploadReleaseAsset({
      file: fs.readFileSync(fullPathChecked),
      headers,
      name: assetName,
      url: assetUploadURL,
    });

    console.log(response.data);

    core.setOutput("url", "abc");
  } catch (error) {
    core.setFailed("Error");
    return;
  }
}

run();
