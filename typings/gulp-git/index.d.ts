/// <reference types="node"/>

declare module "gulp-git" {

    interface GulpGit {
        revParse(arguments: {}, callback: (error: string, branch: string) => void): void;
    }

    const _tmp: GulpGit;
    export = _tmp;

}
