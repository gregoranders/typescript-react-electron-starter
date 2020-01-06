import * as core from "@actions/core";

import * as fs from "fs";
import * as path from "path";

interface IPackageJson {
  name: string;
  version: string;
}

const gitBranch: (branch?: string) => string = (branch?: string): string => {
  if (branch && branch.length && branch !== "HEAD") {
    const index: number = branch.lastIndexOf("/");
    if (index) {
      return branch.substring(index + 1);
    }
    return branch;
  }
  if (process.env.GITHUB_BRANCH) {
    return gitBranch(process.env.GITHUB_BRANCH);
  }
  if (process.env.TRAVIS_BRANCH) {
    return gitBranch(process.env.TRAVIS_BRANCH);
  }
  if (process.env.APPVEYOR_REPO_BRANCH) {
    return gitBranch(process.env.APPVEYOR_REPO_BRANCH);
  }
  return "unknownbranch";
};

const gitCommit: (commit?: string) => string = (commit?: string): string => {
  if (commit && commit.length) {
    return commit;
  }
  if (process.env.GITHUB_COMMIT) {
    return gitBranch(process.env.GITHUB_COMMIT);
  }
  if (process.env.TRAVIS_COMMIT) {
    return gitBranch(process.env.TRAVIS_COMMIT);
  }
  if (process.env.APPVEYOR_REPO_COMMIT) {
    return gitBranch(process.env.APPVEYOR_REPO_COMMIT);
  }
  return "unknowncommit";
};

async function run(): Promise<void> {

  try {
    const basePath: fs.PathLike = path.resolve(fs.realpathSync("."));
    const packageJson: fs.PathLike = path.resolve(fs.realpathSync(path.join(basePath, "package.json")));

    if (!packageJson || !packageJson.length) {
      core.setFailed("Missing package.json");
      return;
    }

    const content: Buffer = fs.readFileSync(packageJson);
    const packageInfo: IPackageJson = JSON.parse(content.toString());

    if (!packageInfo) {
      core.setFailed("Invalid package.json");
      return;
    }

    if (!packageInfo.name || !packageInfo.name.length) {
      core.setFailed("Invalid name");
      return;
    }

    if (!packageInfo.version || !packageInfo.version.length) {
      core.setFailed("Invalid version");
      return;
    }

    core.setOutput("name", packageInfo.name);
    core.setOutput("version", packageInfo.version);
    core.setOutput("branch", gitBranch());
    core.setOutput("commit", gitCommit());

    console.log(gitBranch(), gitCommit(), packageInfo);

  } catch (error) {
    core.setFailed(error);
  }
}

run();
