import * as log from "fancy-log";

import { IIPCMessage, IPCChannel, IPCMessageType } from "./ipc";

export abstract class IpcService<T extends Electron.IpcMainEvent | Electron.IpcRendererEvent> {

  public register(ipc: NodeJS.EventEmitter, channel: string): void {
    ipc.on(channel, (event: T, ...args: any[]): void => {
      if (args && args.length === 1) {
        const ipcMessage: IIPCMessage<any> = args[0];
        this.handleMessage(event, ipcMessage);
      } else {
        log.warn(event, args);
      }
    });
  }

  protected abstract handleMessage<MT>(event: T, message: IIPCMessage<MT>): void;

  protected send<MT>(sender: Electron.WebContents | Electron.IpcRenderer,
                     channel: IPCChannel, type: IPCMessageType, data: MT): void {
    sender.send(channel, {
      data,
      timestamp: new Date(),
      type,
    } as IIPCMessage<MT>);
  }
}
