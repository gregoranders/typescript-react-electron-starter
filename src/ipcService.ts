import * as log from "fancy-log";

import { IIPCMessage, IPCChannel, IPCMessageType } from "./ipc";

type IpcEventType<T> = T extends Electron.IpcMain ? Electron.IpcMainEvent : Electron.IpcRendererEvent;

type IpcSenderType<T> = T extends Electron.IpcMain ? Electron.WebContents : Electron.IpcRenderer;


export abstract class IpcService<T extends Electron.IpcMain | Electron.IpcRenderer> {

  public constructor(protected ipc: T, protected channel: IPCChannel) {}

  public register(): void {
    this.ipc.on(this.channel, (event: Electron.IpcMainEvent | Electron.IpcRendererEvent, ...args: any[]): void => {
      if (args && args.length === 1) {
        const ipcMessage: IIPCMessage<any> = args[0];
        this.handleMessage(event, ipcMessage);
      } else {
        log.warn(event, args);
      }
    });
  }

  protected abstract handleMessage<MT>(event: Electron.IpcMainEvent | Electron.IpcRendererEvent,
                                       message: IIPCMessage<MT>): void;

  protected send<MT>(sender: IpcSenderType<T>, channel: IPCChannel, type: IPCMessageType, data: MT): void {
    sender.send(channel, {
      data,
      timestamp: new Date(),
      type,
    } as IIPCMessage<MT>);
  }
}
