import { mount, ReactWrapper } from "enzyme";
import * as React from "react";
import * as renderer from "react-test-renderer";

import { IIPCMessage, IPCChannel, IPCMessageType } from "./ipc";

import * as TestSubject from "./mainService";

describe("MainService", (): void => {

  const sendMock: jest.Mock<any, any[]> = jest.fn();
  const onMock: jest.Mock<any, any[]> = jest.fn();
  let eventCallback: (event: Electron.IpcMainEvent | Electron.IpcRendererEvent, ...args: any[]) => void;

  const handler: (channel: IPCChannel,
                  callback: (event: Electron.IpcMainEvent | Electron.IpcRendererEvent, ...args: any[]) => void)
                  => void = (channel: IPCChannel, callback: (event: Electron.IpcMainEvent | Electron.IpcRendererEvent,
                                                             ...args: any[]) => void): void => {
    eventCallback = callback;
    onMock(channel);
  };

  const ipcMock: any = {
    on: handler,
    send: sendMock,
  };

  beforeEach((): void => {
    onMock.mockClear();
  });

  it("export exists", (): void => {
    expect(TestSubject.MainService).toBeDefined();
  });

  it("register", (): void => {
    const testSubject: TestSubject.MainService = new TestSubject.MainService(ipcMock, "main-channel");
    testSubject.register();
    expect(onMock).toHaveBeenNthCalledWith(1, "main-channel");
  });

  it("invalid event", (): void => {
    const testSubject: TestSubject.MainService = new TestSubject.MainService(ipcMock, "main-channel");
    const eventSenderSendMock: jest.Mock<any, any[]> = jest.fn();
    const event: any = {
      sender: {
        send: eventSenderSendMock,
      },
    };
    testSubject.register();
    expect(onMock).toHaveBeenNthCalledWith(1, "main-channel");
    eventCallback(event, 1, 2, 3);
    expect(event.sender.send).toHaveBeenCalledTimes(0);
  });

  it("ping event", (): void => {
    const testSubject: TestSubject.MainService = new TestSubject.MainService(ipcMock, "main-channel");
    const eventSenderSendMock: jest.Mock<any, any[]> = jest.fn();
    const event: any = {
      sender: {
        send: eventSenderSendMock,
      },
    };
    testSubject.register();
    expect(onMock).toHaveBeenNthCalledWith(1, "main-channel");
    eventCallback(event, {
      data: "test",
      timestamp: new Date(),
      type: "ping",
    } as IIPCMessage<string>);
    expect(event.sender.send).toHaveBeenCalledTimes(2);
  });


  it("pong event", (): void => {
    const testSubject: TestSubject.MainService = new TestSubject.MainService(ipcMock, "main-channel");
    const eventSenderSendMock: jest.Mock<any, any[]> = jest.fn();
    const event: any = {
      sender: {
        send: eventSenderSendMock,
      },
    };
    testSubject.register();
    expect(onMock).toHaveBeenNthCalledWith(1, "main-channel");
    eventCallback(event, {
      data: "test",
      timestamp: new Date(),
      type: "pong",
    } as IIPCMessage<string>);
    expect(event.sender.send).toHaveBeenCalledTimes(0);
  });

  it("unknown event", (): void => {
    const testSubject: TestSubject.MainService = new TestSubject.MainService(ipcMock, "main-channel");
    const eventSenderSendMock: jest.Mock<any, any[]> = jest.fn();
    const event: any = {
      sender: {
        send: eventSenderSendMock,
      },
    };
    testSubject.register();
    expect(onMock).toHaveBeenNthCalledWith(1, "main-channel");
    eventCallback(event, {
      data: "test",
      timestamp: new Date(),
      type: "test",
    } as any);
    expect(event.sender.send).toHaveBeenCalledTimes(0);
  });
});
