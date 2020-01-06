import * as core from "@actions/core";
import { GitHub } from "@actions/github";

import * as Octokit from "@octokit/rest";

import * as fs from "fs";
import { getType } from "mime";
import * as path from "path";

async function upload(github: GitHub, filePath: fs.PathLike,
                      name: string, url: string): Promise<Octokit.ReposUploadReleaseAssetResponseValue> {
  const headers: Octokit.ReposUploadReleaseAssetParamsHeaders = {
    "content-length": fs.statSync(filePath).size,
    "content-type": getType(filePath.toString()) || "application/zip",
  };

  const response: Octokit.Response<Octokit.ReposUploadReleaseAssetResponse> = await github.repos.uploadReleaseAsset({
    file: fs.readFileSync(filePath),
    headers,
    name,
    url,
  });

  return response.data as any;
}

async function run(): Promise<void> {
  const assetUploadURL: string = core.getInput("url", {required: true});
  const assetName: string = core.getInput("name", {required: true});
  const assetPath: string = core.getInput("path", {required: true});

  if (!process.env.GITHUB_TOKEN) {
    core.setFailed("Missing GitHub token");
    return;
  }

  const github: GitHub = new GitHub(process.env.GITHUB_TOKEN);

  const fullPathChecked: fs.PathLike = path.resolve(fs.realpathSync(assetPath));

  if (!fs.existsSync(fullPathChecked)) {
    core.setFailed("Asset path not found " + assetName);
  }

  try {
    const data: Octokit.ReposUploadReleaseAssetResponseValue
      = await upload(github, fullPathChecked, assetName, assetUploadURL);

    core.setOutput("url", data.browser_download_url);
  } catch (error) {
    core.setFailed("Error");
    return;
  }
}

run();
