export type IPCMessageType = 'ping' | 'pong';

export type IPCChannel = 'main-channel';

export interface IPCMessage<T> {
  data: T;
  timestamp: Date;
  type: IPCMessageType;
}
