/// <reference types="node"/>

declare module "gulp-sass-lint" {

    interface GulpSassLintOptions {
        configFile?: string;
    }

    interface GulpSassLint {
        (options?: GulpSassLintOptions): NodeJS.ReadWriteStream;

        format(writeable?: NodeJS.WriteStream): NodeJS.ReadWriteStream;
        failOnError(): NodeJS.ReadWriteStream;
    }

    const _tmp: GulpSassLint;
    export = _tmp;

}
