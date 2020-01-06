import * as core from "@actions/core";
import { context, GitHub } from "@actions/github";

import * as Octokit from "@octokit/rest";

type IResponse = Octokit.Response<Octokit.ReposGetLatestReleaseResponse | Octokit.ReposCreateReleaseResponse>;

async function run(): Promise<void> {
  const tag: string = core.getInput("tag", { required: true });
  const name: string = core.getInput("name", { required: true });
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

  let response: undefined | IResponse;

  try {
    response = await github.repos.getReleaseByTag({
      owner,
      repo,
      tag,
    });
  } catch (error) {
    try {
      response = await github.repos.createRelease({
        body,
        draft,
        name,
        owner,
        prerelease,
        repo,
        tag_name: tag,
        target_commitish,
      });
    } catch (createError) {
      core.setFailed("Error: " + JSON.stringify(createError));
    }
  }

  if (response) {
    core.setOutput("id", response.data.id.toString());
    core.setOutput("url", response.data.html_url);
    core.setOutput("upload_url", response.data.upload_url);
  } else {
    core.setFailed("Invalid release");
  }
}

run();
