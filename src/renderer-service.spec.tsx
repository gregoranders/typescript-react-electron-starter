jest.mock('fancy-log');

import { IPCChannel, IPCMessage } from './ipc';

import * as TestSubject from './renderer-service';

describe('RendererService', (): void => {
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

  const ipcMock = jest.fn<Electron.IpcRenderer, unknown[]>(() => {
    return ({
      on: handler,
      send: sendMock,
    } as unknown) as Electron.IpcRenderer;
  })();

  beforeEach((): void => {
    onMock.mockClear();
  });

  it('export exists', (): void => {
    expect(TestSubject.RendererService).toBeDefined();
  });

  it('ping', (): void => {
    const testSubject: TestSubject.RendererService = new TestSubject.RendererService(ipcMock, 'main-channel');
    testSubject.ping();
    expect(ipcMock.send).toHaveBeenCalledTimes(1);
  });

  it('register', (): void => {
    const testSubject: TestSubject.RendererService = new TestSubject.RendererService(ipcMock, 'main-channel');
    testSubject.register();
    expect(onMock).toHaveBeenNthCalledWith(1, 'main-channel');
  });

  it('event', (): void => {
    console.warn = jest.fn();
    const testSubject: TestSubject.RendererService = new TestSubject.RendererService(ipcMock, 'main-channel');
    const eventSenderSendMock = jest.fn();
    const event = ({
      sender: {
        send: eventSenderSendMock,
      },
    } as unknown) as Electron.IpcRendererEvent;
    testSubject.register();
    expect(onMock).toHaveBeenNthCalledWith(1, 'main-channel');
    eventCallback(event, 'test');
    expect(console.warn).toHaveBeenCalledTimes(1);
  });

  it('invalid event', (): void => {
    const testSubject: TestSubject.RendererService = new TestSubject.RendererService(ipcMock, 'main-channel');
    const eventSenderSendMock = jest.fn();
    const event = ({
      sender: {
        send: eventSenderSendMock,
      },
    } as unknown) as Electron.IpcRendererEvent;
    testSubject.register();
    expect(onMock).toHaveBeenNthCalledWith(1, 'main-channel');
    eventCallback(event, 'test', 1);
    eventCallback(event);
  });

  it('ping event', (): void => {
    const testSubject: TestSubject.RendererService = new TestSubject.RendererService(ipcMock, 'main-channel');
    const eventSenderSendMock = jest.fn();
    const event = ({
      sender: {
        send: eventSenderSendMock,
      },
    } as unknown) as Electron.IpcRendererEvent;
    testSubject.register();
    expect(onMock).toHaveBeenNthCalledWith(1, 'main-channel');
    eventCallback(event, {
      data: 'test',
      timestamp: new Date(),
      type: 'ping',
    } as IPCMessage<string>);
    expect(event.sender.send).toHaveBeenCalledTimes(1);
  });

  it('pong event', (): void => {
    console.log = jest.fn();
    const testSubject: TestSubject.RendererService = new TestSubject.RendererService(ipcMock, 'main-channel');
    const eventSenderSendMock = jest.fn();
    const event = ({
      sender: {
        send: eventSenderSendMock,
      },
    } as unknown) as Electron.IpcRendererEvent;
    testSubject.register();
    expect(onMock).toHaveBeenNthCalledWith(1, 'main-channel');
    eventCallback(event, {
      data: 'test',
      timestamp: new Date(),
      type: 'pong',
    } as IPCMessage<string>);
    expect(event.sender.send).toHaveBeenCalledTimes(0);
    expect(console.log).toHaveBeenCalledTimes(1);
  });
});
