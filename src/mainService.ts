import { ipcMain } from "electron";

import * as log from "fancy-log";

import { IpcService } from "./ipcService";

import { IIPCMessage } from "./ipc";


export class MainService extends IpcService<Electron.IpcMainEvent> {

  public constructor() {
    super();
    this.register(ipcMain, "main-channel");
  }

  protected handleMessage<T>(event: Electron.IpcMainEvent, message: IIPCMessage<T>): void {
    switch (message.type) {
      case "ping":
        log.info(message);
        this.send(event.sender, "main-channel", "pong", message.data);
        this.send(event.sender, "main-channel", "ping", message.data);
        break;
      case "pong":
          log.info(message);
          break;
      default:
        log.warn(message);
    }
  }
}
