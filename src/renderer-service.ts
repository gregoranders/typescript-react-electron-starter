import { IPCMessage } from './ipc';

import { IpcService } from './ipc-service';

export class RendererService extends IpcService<Electron.IpcRenderer> {
  public ping(): void {
    this.send(this.ipc, this.channel, 'ping', [1, 2, 3]);
  }

  protected handleMessage<MT>(event: Electron.IpcRendererEvent, message: IPCMessage<MT>): void {
    switch (message.type) {
      case 'ping':
        this.send(event.sender, this.channel, 'pong', message.data);
        break;
      case 'pong':
        console.log(message);
        break;
      default:
        console.warn(message);
    }
  }
}
