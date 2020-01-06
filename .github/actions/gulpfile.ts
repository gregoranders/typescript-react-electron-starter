import * as fs from "fs";
import * as os from "os";
import * as path from "path";

import * as gulp from "gulp";

import * as through from "through2";

import * as ncc from "@zeit/ncc";

const basePath: fs.PathLike = fs.realpathSync(path.resolve(__dirname, "../.."));

function nccCompile(): any {
  return through.obj((chunk: any, encoding: string, callback: through.TransformCallback): any => {
    if (chunk.isBuffer()) {
      ncc(chunk.path, {
        cache: false,
        minify: false,
        quiet: false,
        sourceMap: false,
        sourceMapRegister: false,
      }).then((result: any): void => {
      chunk.path = chunk.path.replace(".ts", ".js");
      chunk.contents = Buffer.from(result.code);
      callback(undefined, chunk);
    }).catch((reason: any): void => {
      callback(reason, undefined);
    });
    }
  });
}

gulp.task("default", (): NodeJS.ReadWriteStream => {
  return gulp.src(path.join(basePath, ".github/actions/**/index.ts"))
            .pipe(nccCompile())
            .pipe(gulp.dest(path.resolve(basePath, ".github/actions/")));
});
