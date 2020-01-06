import * as log from "fancy-log";

import { ipcMain } from "electron";

import { IIPCMessage, IPCMessageType,  mainChannel, renderChannel } from "./ipc";

export class MainService {

  public register(): void {
    ipcMain.on(mainChannel, (event: Electron.IpcMainEvent, ...args: any[]): void => {
      if (args && args.length === 1) {
        const ipcMessage: IIPCMessage<any> = args[0];
        this.handleMainChannel(event, ipcMessage);
      } else {
        log.warn(event, args);
      }
    });
  }

  private handleMainChannel<T>(event: Electron.IpcMainEvent, message: IIPCMessage<T>): void {
    switch (message.type) {
      case "ping":
        log.info(message);
        this.send(event.sender, "pong", message.data);
        this.send(event.sender, "ping", message.data);
        break;
      case "pong":
          log.info(message);
          break;
      default:
        log.warn(message);
    }
  }

  private send<T>(sender: Electron.WebContents, type: IPCMessageType, data: T): void {
    sender.send(renderChannel, {
      data,
      timestamp: new Date(),
      type,
    } as IIPCMessage<T>);
  }
}
