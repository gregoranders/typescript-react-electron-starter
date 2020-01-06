import { ipcRenderer } from "electron";

import { IIPCMessage } from "./ipc";

import { IpcService } from "./ipcService";

export class RendererService extends IpcService<Electron.IpcRenderer> {

  public ping(): void {
    this.send(this.ipc, this.channel, "ping", [1, 2, 3]);
  }

  protected handleMessage<MT>(event: Electron.IpcRendererEvent, message: IIPCMessage<MT>): void {
    switch (message.type) {
      case "ping":
        this.send(event.sender, this.channel, "pong", message.data);
        break;
      case "pong":
        console.log(message);
        break;
      default:
        console.log(message);
    }
  }
}
