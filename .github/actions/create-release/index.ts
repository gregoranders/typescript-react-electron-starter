import * as core from "@actions/core";
import { context, GitHub } from "@actions/github";

import * as Octokit from "@octokit/rest";

async function run(): Promise<void> {
  const tag: string = core.getInput("tag", {required: true});
  const name: string = core.getInput("name", {required: true});
  const body: string = core.getInput("body");
  const draft: boolean = core.getInput("draft") === "true";
  const prerelease: boolean = core.getInput("prerelease") === "true";
  const target_commitish: string = core.getInput("target");

  const { owner, repo } = context.repo;

  if (!process.env.GITHUB_TOKEN) {
    core.setFailed("Missing GitHub token");
    return;
  }

  const github: GitHub = new GitHub(process.env.GITHUB_TOKEN);

  let releaseID: number = -1;
  let releaseURL: string = "";
  let releaseUploadURL: string = "";

  try {
    const response: Octokit.Response<Octokit.ReposGetLatestReleaseResponse> = await github.repos.getReleaseByTag({
      owner,
      repo,
      tag,
    });
    releaseID = response.data.id;
    releaseURL = response.data.html_url;
    releaseUploadURL = response.data.upload_url;
  } catch (error) {
    try {
      const response: Octokit.Response<Octokit.ReposCreateReleaseResponse> = await github.repos.createRelease({
        body,
        draft,
        name,
        owner,
        prerelease,
        repo,
        tag_name: tag,
        target_commitish,
      });

      releaseID = response.data.id;
      releaseURL = response.data.html_url;
      releaseUploadURL = response.data.assets_url;
    } catch (createError) {
      core.setFailed("Error");
      return;
    }
  }

  if (releaseID < 0) {
    core.setFailed("Invalid release id " + releaseID);
    return;
  }

  if (!releaseURL || !releaseURL.length) {
    core.setFailed("Invalid release URL");
    return;
  }

  if (!releaseUploadURL || !releaseUploadURL.length) {
    core.setFailed("Invalid release URL");
    return;
  }

  core.setOutput("id", releaseID.toString());
  core.setOutput("url", releaseURL);
  core.setOutput("upload_url", releaseUploadURL);
}

run();
