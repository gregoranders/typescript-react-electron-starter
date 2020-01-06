import { ipcRenderer } from "electron";

import { IIPCMessage } from "./ipc";

import { IpcService } from "./ipcService";

export class RendererService extends IpcService<Electron.IpcRendererEvent> {

  public ping(): void {
    this.send(ipcRenderer, "render-channel", "ping", [1, 2, 3]);
  }

  protected handleMessage<MT>(event: Electron.IpcRendererEvent, message: IIPCMessage<MT>): void {
    switch (message.type) {
      case "ping":
        console.log(message);
        this.send(event.sender, "render-channel", "pong", message.data);
        break;
      case "pong":
        console.log(message);
        break;
      default:
        console.log(message);
    }
  }
}
