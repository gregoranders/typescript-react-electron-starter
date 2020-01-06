import { ipcMain, ipcRenderer } from "electron";

export type IPCMessageType = "ping" | "pong";

export type IPCChannel = "main-channel";

export interface IIPCMessage<T> {
  data: T;
  timestamp: Date;
  type: IPCMessageType;
}

