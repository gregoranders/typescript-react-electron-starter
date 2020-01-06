import { ipcMain, ipcRenderer } from "electron";

export type IPCMessageType = "ping" | "pong";

export type IPCChannel = "main-channel" | "render-channel";

export interface IIPCMessage<T> {
  data: T;
  timestamp: Date;
  type: IPCMessageType;
}

