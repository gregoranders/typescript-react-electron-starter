import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import * as archiver from 'archiver';
import * as packager from 'electron-packager';
import * as log from 'fancy-log';
import * as gulp from 'gulp';
import * as git from 'gulp-git';
import * as rimraf from 'rimraf';

const now: Date = new Date();

const basePath: fs.PathLike = fs.realpathSync(path.resolve(__dirname));

const distPath: fs.PathLike = path.join(basePath, 'dist/');

import * as PackageJsonImported from './package.json';

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
  branch: '',
  commit: '',
};

const PackageJson: IPackageJson = JSON.parse(process.env.PACKAGE_JSON || JSON.stringify(PackageJsonImported));

const version: () => string = (): string => {
  if (gitProperties.branch === 'master' || gitProperties.branch.startsWith('v')) {
    return '' + PackageJson.version;
  }
  return '' + PackageJson.version + '-' + gitProperties.branch + '-' + gitProperties.commit;
};

const arch: () => packager.arch = (): packager.arch => {
  switch (os.arch()) {
    case 'ia32':
      return 'x64';
    default:
      return 'x64';
  }
};

const packageName: () => string = (): string => {
  return '' + PackageJson.name + '-' + os.platform + '-x64-' + version();
};

const gitBranch: (branch?: string) => string = (branch?: string): string => {
  if (branch && branch.length > 0 && branch !== 'HEAD') {
    const index: number = branch.lastIndexOf('/');
    if (index >= 0) {
      return branch.slice(Math.max(0, index + 1));
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
  return 'unknownbranch';
};

const gitCommit: (commit?: string) => string = (commit?: string): string => {
  if (commit && commit.length > 0) {
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
  return 'unknowncommit';
};

gulp.task(
  'init',
  (): Promise<IProperties> => {
    return new Promise<IProperties>(
      (resolve: (properties: IProperties) => void, reject: (reason: Error | string) => void): void => {
        git.revParse({ args: '--abbrev-ref HEAD', quiet: true }, (errorBranch: string, branch: string): void => {
          if (errorBranch) {
            reject(errorBranch);
          } else {
            git.revParse({ args: '--short HEAD', quiet: true }, (errorCommit: string, commit: string): void => {
              if (errorCommit) {
                reject(errorCommit);
              } else {
                gitProperties.branch = gitBranch(branch);
                gitProperties.commit = gitCommit(commit);
                log('OS:', os.platform(), 'Arch:', os.arch());
                log('Branch:', gitProperties.branch, 'Commit:', gitProperties.commit);
                log('Package:', packageName(), 'Version:', version());
                log('Now:', now.toUTCString(), now.toDateString(), now.toTimeString());
                resolve(gitProperties);
              }
            });
          }
        });
      },
    );
  },
);

gulp.task(
  'package',
  (): Promise<void> => {
    return new Promise<void>((resolve: () => void, reject: (error: Error) => void): void => {
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
      })
        .then((paths: string | string[]): void => {
          const archiveFormat: archiver.Format = os.platform().toString() !== 'win32' ? 'tar' : 'zip';
          const fileExtension: string = os.platform().toString() !== 'win32' ? 'tar.gz' : 'zip';
          const filePath: string = path.join(distPath, packageName() + '.' + fileExtension);
          const sourceDirectoryPath: string = paths && typeof paths === 'string' ? (paths as string) : paths[0];
          const output: NodeJS.WritableStream = fs.createWriteStream(filePath);

          const archive: archiver.Archiver = archiver(archiveFormat, {
            zlib: { level: 9 },
          });
          output.on('close', (): void => {
            log('Created', filePath, archive.pointer(), 'bytes');
          });
          archive.on('error', (reason): void => {
            reject(reason);
          });
          archive.pipe(output);
          archive.directory(sourceDirectoryPath, packageName());
          archive
            .finalize()
            .then((): void => {
              process.env.PACKAGE_PATH = filePath;
              rimraf(sourceDirectoryPath, (error: Error) => {
                reject(error);
              });
              resolve();
            })
            .catch((error): void => {
              log('Failed', error);
              reject(error);
            });
        })
        .catch((error): void => {
          log('Failed', error);
          reject(error);
        });
    });
  },
);

gulp.task('default', gulp.series('init', 'package'));
