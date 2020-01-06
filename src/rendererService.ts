import { ipcMain, ipcRenderer } from "electron";

import { IIPCMessage, IPCMessageType, mainChannel, renderChannel } from "./ipc";

export class RendererService {

  public ping(): void {
    this.send("ping", [1, 2, 3]);
  }

  public register(): void {
    ipcRenderer.on(renderChannel, (event: Electron.IpcRendererEvent, ...args: any[]): void => {
      if (args && args.length === 1) {
        const ipcMessage: IIPCMessage<any> = args[0];
        this.handleRenderChannel(event, ipcMessage);
      } else {
        console.log(event, args);
      }
    });
  }

  private handleRenderChannel<T>(event: Electron.IpcRendererEvent, message: IIPCMessage<T>): void {
    switch (message.type) {
      case "ping":
        console.log(message);
        this.send("pong", message.data);
        break;
      case "pong":
        console.log(message);
        break;
      default:
        console.log(message);
    }
  }

  private send<T>(type: IPCMessageType, data: T): void {
    ipcRenderer.send(mainChannel, {
      data,
      timestamp: new Date(),
      type,
    } as IIPCMessage<T>);
  }
}
