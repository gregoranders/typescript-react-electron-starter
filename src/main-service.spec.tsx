jest.mock('fancy-log');

import { IPCChannel, IPCMessage } from './ipc';

import * as TestSubject from './main-service';

describe('MainService', (): void => {
  const sendMock = jest.fn();
  const onMock = jest.fn();
  let eventCallback: (event: Electron.IpcMainEvent | Electron.IpcRendererEvent, ...args: unknown[]) => void;

  const handler: (
    channel: IPCChannel,
    callback: (event: Electron.IpcMainEvent | Electron.IpcRendererEvent, ...args: unknown[]) => void,
  ) => void = (
    channel: IPCChannel,
    callback: (event: Electron.IpcMainEvent | Electron.IpcRendererEvent, ...args: unknown[]) => void,
  ): void => {
    eventCallback = callback;
    onMock(channel);
  };

  const ipcMock = jest.fn<Electron.IpcMain, unknown[]>(() => {
    return ({
      on: handler,
      send: sendMock,
    } as unknown) as Electron.IpcMain;
  })();

  beforeEach((): void => {
    onMock.mockClear();
  });

  it('export exists', (): void => {
    expect(TestSubject.MainService).toBeDefined();
  });

  it('register', (): void => {
    const testSubject: TestSubject.MainService = new TestSubject.MainService(ipcMock, 'main-channel');
    testSubject.register();
    expect(onMock).toHaveBeenNthCalledWith(1, 'main-channel');
  });

  it('invalid event', (): void => {
    const testSubject: TestSubject.MainService = new TestSubject.MainService(ipcMock, 'main-channel');
    const eventSenderSendMock = jest.fn();
    const event = ({
      sender: {
        send: eventSenderSendMock,
      },
    } as unknown) as Electron.IpcMainEvent;
    testSubject.register();
    expect(onMock).toHaveBeenNthCalledWith(1, 'main-channel');
    eventCallback(event, 1, 2, 3);
    expect(event.sender.send).toHaveBeenCalledTimes(0);
  });

  it('ping event', (): void => {
    const testSubject: TestSubject.MainService = new TestSubject.MainService(ipcMock, 'main-channel');
    const eventSenderSendMock = jest.fn();
    const event = ({
      sender: {
        send: eventSenderSendMock,
      },
    } as unknown) as Electron.IpcMainEvent;
    testSubject.register();
    expect(onMock).toHaveBeenNthCalledWith(1, 'main-channel');
    eventCallback(event, {
      data: 'test',
      timestamp: new Date(),
      type: 'ping',
    } as IPCMessage<string>);
    expect(event.sender.send).toHaveBeenCalledTimes(2);
  });

  it('pong event', (): void => {
    const testSubject: TestSubject.MainService = new TestSubject.MainService(ipcMock, 'main-channel');
    const eventSenderSendMock = jest.fn();
    const event = ({
      sender: {
        send: eventSenderSendMock,
      },
    } as unknown) as Electron.IpcMainEvent;
    testSubject.register();
    expect(onMock).toHaveBeenNthCalledWith(1, 'main-channel');
    eventCallback(event, {
      data: 'test',
      timestamp: new Date(),
      type: 'pong',
    } as IPCMessage<string>);
    expect(event.sender.send).toHaveBeenCalledTimes(0);
  });

  it('unknown event', (): void => {
    const testSubject: TestSubject.MainService = new TestSubject.MainService(ipcMock, 'main-channel');
    const eventSenderSendMock = jest.fn();
    const event = ({
      sender: {
        send: eventSenderSendMock,
      },
    } as unknown) as Electron.IpcMainEvent;
    testSubject.register();
    expect(onMock).toHaveBeenNthCalledWith(1, 'main-channel');
    eventCallback(event, {
      data: 'test',
      timestamp: new Date(),
      type: 'test',
    });
    expect(event.sender.send).toHaveBeenCalledTimes(0);
  });
});
