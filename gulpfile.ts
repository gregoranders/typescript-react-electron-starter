import * as del from "del";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

import * as archiver from "archiver";
import * as packager from "electron-packager";
import * as log from "fancy-log";
import * as gulp from "gulp";
import * as git from "gulp-git";
import { default as jest } from "gulp-jest";
import * as sass from "gulp-sass";
import * as sourcemaps from "gulp-sourcemaps";
import tslint from "gulp-tslint";
import { createProject, Project } from "gulp-typescript";

import * as sassLint from "gulp-sass-lint";

const now: Date = new Date();

const basePath: fs.PathLike = fs.realpathSync(path.resolve(__dirname));

const srcPath: fs.PathLike = fs.realpathSync(path.resolve(basePath, "src/"));
const itSrcPath: fs.PathLike = fs.realpathSync(path.resolve(basePath, "it/"));

const buildPath: fs.PathLike = path.join(basePath, "app/");
const stylesBuildPath: fs.PathLike = path.join(buildPath, "styles/");

const distPath: fs.PathLike = path.join(basePath, "dist/");

import * as PackageJsonImported from "./package.json";

const typeScriptProject: Project = createProject(path.join(srcPath, "tsconfig.json"));

interface IProperties {
  branch: string;
  commit: string;
}

interface IPackageJson {
  author: string;
  name: string;
  version: string;
}

const gitProperties: IProperties = {
  branch: "",
  commit: "",
};

const PackageJson: IPackageJson = JSON.parse(process.env.PACKAGE_JSON || JSON.stringify(PackageJsonImported));

const version: () => string = (): string => {
  if (gitProperties.branch === "master" || gitProperties.branch.startsWith("v")) {
    return "" + PackageJson.version;
  }
  return "" + PackageJson.version + "-" + gitProperties.branch + "-" + gitProperties.commit;
};

const arch: () => packager.arch = (): packager.arch => {
  switch (os.arch()) {
    case "ia32":
      return "x64";
    default:
      return "x64";
  }
};

const pkgName: () => string = (): string => {
  return "" + PackageJson.name + "-" + os.platform + "-x64-" + version();
};

const gitBranch: (branch?: string) => string = (branch?: string): string => {
  if (branch && branch.length && branch !== "HEAD") {
    const index: number = branch.lastIndexOf("/");
    if (index >= 0) {
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

gulp.task("init", (): Promise<IProperties> => {
  return new Promise<IProperties>((resolve: (properties: IProperties) => void,
    reject: (reason: any) => void): void => {
    git.revParse({ args: "--abbrev-ref HEAD", quiet: true }, (errorBranch: string, branch: string): void => {
      if (errorBranch) {
        reject(errorBranch);
      } else {
        git.revParse({ args: "--short HEAD", quiet: true }, (errorCommit: string, commit: string): void => {
          if (errorCommit) {
            reject(errorCommit);
          } else {
            gitProperties.branch = gitBranch(branch);
            gitProperties.commit = gitCommit(commit);
            log("OS:", os.platform(), "Arch:", os.arch());
            log("Branch:", gitProperties.branch, "Commit:", gitProperties.commit);
            log("Package:", pkgName(), "Version:", version());
            log("Now:", now.toUTCString(), now.toDateString(), now.toTimeString());
            resolve(gitProperties);
          }
        });
      }
    });
  });
});

gulp.task("typescriptLint", (): NodeJS.ReadWriteStream => {
  return typeScriptProject.src()
    .pipe(tslint({
      configuration: fs.realpathSync(path.resolve(basePath, "tslint.json")),
      formatter: "verbose",
    }))
    .pipe(tslint.report({
      allowWarnings: true,
      emitError: true,
    }));
});

gulp.task("stylesLint", (): NodeJS.ReadWriteStream => {
  return gulp.src(path.join(srcPath, "*.s+(a|c)ss"))
    .pipe(sassLint({
      configFile: fs.realpathSync(path.resolve(basePath, ".sass-lint.yml")),
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

gulp.task("lint", gulp.parallel("stylesLint", "typescriptLint"));

gulp.task("html", (): NodeJS.ReadWriteStream => {
  return gulp.src(path.join(srcPath, "*.html"))
    .pipe(gulp.dest(buildPath));
});

gulp.task("styles", (): NodeJS.ReadWriteStream => {
  return gulp.src(path.join(srcPath, "*.scss"))
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(path.join(stylesBuildPath)));
});

gulp.task("typescript", (): NodeJS.ReadWriteStream => {
  return typeScriptProject.src()
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(typeScriptProject())
    .js.pipe(sourcemaps.write("./", {
      includeContent: false,
      sourceRoot: "",
    }))
    .pipe(gulp.dest(buildPath))
    ;
});

gulp.task("test", (): NodeJS.ReadWriteStream => {
  return gulp.src(srcPath).pipe(jest({
    testPathDirs: [
      srcPath,
    ],
  }));
});

gulp.task("it", (): NodeJS.ReadWriteStream => {
  return gulp.src(itSrcPath).pipe(jest({
    testPathDirs: [
      itSrcPath,
    ],
  }));
});

gulp.task("electron", (): Promise<void> => {
  return new Promise<void>((resolve: () => void, reject: (error: any) => void): void => {
    const buildVersion: string = version();
    packager({
      appCopyright: PackageJson.author,
      appVersion: buildVersion,
      arch: arch(),
      asar: true,
      buildVersion,
      dir: basePath,
      out: distPath,
      overwrite: true,
      platform: os.platform().toString() as packager.platform,
      quiet: false,
    }).then((paths: string | string[]): void => {
      fs.mkdirSync(path.join(distPath, "/pkg/"));

      const archiveFormat: archiver.Format = os.platform().toString() !== "win32" ? "tar" : "zip";
      const fileExtension: string = os.platform().toString() !== "win32" ? "tar.gz" : "zip";
      const filePath: string = path.join(distPath, "/pkg/", pkgName() + "." + fileExtension);
      const srcDirPath: string = paths && typeof paths === "string" ? paths as string : paths[0];
      const output: NodeJS.WritableStream = fs.createWriteStream(filePath);

      const archive: archiver.Archiver = archiver(archiveFormat, {
        zlib: { level: 9 },
      });
      output.on("close", (): void => {
        log("Created", filePath, archive.pointer(), "bytes");
      });
      archive.on("error", (reason: any): void => { reject(reason); });
      archive.pipe(output);
      archive.directory(srcDirPath, pkgName());
      archive.finalize().then((): void => {
        process.env.PACKAGE_PATH = filePath;
        resolve();
      }).catch((reason: any): void => {
        log("Failed", reason);
        reject(reason);
      });
    }).catch((reason: any): void => {
      log("Failed", reason);
      reject(reason);
    });
  });
});

gulp.task("clear", (): Promise<string[]> => {
  return del([path.join(basePath, ".github", "**/*.js"),
  path.join(basePath, "src", "**/*.js"),
  path.join(basePath, "it", "**/*.js")]);
});

gulp.task("build", gulp.series("init", gulp.parallel("html", "styles", "typescript")));

gulp.task("dist", gulp.series("init", gulp.series("lint", "build", "electron")));

gulp.task("default", gulp.series("init", gulp.series("lint", "build")));
