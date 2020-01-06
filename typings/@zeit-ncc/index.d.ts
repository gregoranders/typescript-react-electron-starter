/// <reference types="node"/>

declare module "@zeit/ncc" {

    interface INCCOptions {
      cache?: string | boolean;
      debugLog?: boolean;
      externals?: string[];
      filterAssetBase?: string;
      minify?: boolean;
      sourceMap?: boolean;
      sourceMapBasePrefix?: string;
      sourceMapRegister?: boolean;
      watch?: boolean;
      v8cache?: boolean;
      quiet?: boolean;
    }

    interface INCCResult {
      code: string;
      map: {};
      assets: {};
      symlinks: {};
    }

    interface NCC {
      (path: string, options?: INCCOptions): Promise<INCCResult>;
    }

    const _tmp: NCC;
    export = _tmp;

}
