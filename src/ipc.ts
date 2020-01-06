import { ipcMain, ipcRenderer } from "electron";

export const mainChannel: string = "main-channel";

export const renderChannel: string = "render-channel";

export type IPCMessageType = "ping" | "pong";

export interface IIPCMessage<T> {
  data: T;
  timestamp: Date;
  type: IPCMessageType;
}

