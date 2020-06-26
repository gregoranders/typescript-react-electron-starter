import log from 'fancy-log';

import { IPCChannel, IPCMessage, IPCMessageType } from './ipc';

type IpcSenderType<T> = T extends Electron.IpcMain ? Electron.WebContents : Electron.IpcRenderer;

export abstract class IpcService<T extends Electron.IpcMain | Electron.IpcRenderer> {
  public constructor(protected ipc: T, protected channel: IPCChannel) {}

  public register(): void {
    this.ipc.on(
      this.channel,
      <MT>(event: Electron.IpcMainEvent | Electron.IpcRendererEvent, ...arguments_: IPCMessage<MT>[]): void => {
        if (arguments_ && arguments_.length === 1) {
          const ipcMessage = arguments_[0];
          this.handleMessage(event, ipcMessage);
        } else {
          log.warn(event, arguments_);
        }
      },
    );
  }

  protected abstract handleMessage<MT>(
    event: Electron.IpcMainEvent | Electron.IpcRendererEvent,
    message: IPCMessage<MT>,
  ): void;

  protected send<MT>(sender: IpcSenderType<T>, channel: IPCChannel, type: IPCMessageType, data: MT): void {
    sender.send(channel, {
      data,
      timestamp: new Date(),
      type,
    } as IPCMessage<MT>);
  }
}
