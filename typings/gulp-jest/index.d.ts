/// <reference types="node"/>
/// <reference types="jest"/>

declare module "gulp-jest" {

    interface GulpJestOptions extends jest.InitialOptions {
    }

    interface GulpJest {
      (options?: GulpJestOptions): NodeJS.ReadWriteStream;
    }

    const _tmp: {
      default: GulpJest;
    }

    export = _tmp;

}
