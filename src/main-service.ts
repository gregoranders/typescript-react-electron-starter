import log from 'fancy-log';

import { IpcService } from './ipc-service';

import { IPCMessage } from './ipc';

export class MainService extends IpcService<Electron.IpcMain> {
  protected handleMessage<T>(event: Electron.IpcMainEvent, message: IPCMessage<T>): void {
    switch (message.type) {
      case 'ping':
        log.info(message);
        this.send(event.sender, this.channel, 'pong', message.data);
        this.send(event.sender, this.channel, 'ping', message.data);
        break;
      case 'pong':
        log.info(message);
        break;
      default:
        log.warn(message);
    }
  }
}
