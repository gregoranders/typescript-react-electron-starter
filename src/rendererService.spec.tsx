import { mount, ReactWrapper } from "enzyme";
import * as React from "react";
import * as renderer from "react-test-renderer";

import { IIPCMessage, IPCChannel, IPCMessageType } from "./ipc";

import * as TestSubject from "./rendererService";


describe("RendererService", (): void => {

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
    expect(TestSubject.RendererService).toBeDefined();
  });

  it("ping", (): void => {
    const testSubject: TestSubject.RendererService = new TestSubject.RendererService(ipcMock, "main-channel");
    testSubject.ping();
    expect(ipcMock.send).toHaveBeenCalledTimes(1);
  });

  it("register", (): void => {
    const testSubject: TestSubject.RendererService = new TestSubject.RendererService(ipcMock, "main-channel");
    testSubject.register();
    expect(onMock).toHaveBeenNthCalledWith(1, "main-channel");
  });


  it("event", (): void => {
    const testSubject: TestSubject.RendererService = new TestSubject.RendererService(ipcMock, "main-channel");
    const eventSenderSendMock: jest.Mock<any, any[]> = jest.fn();
    const event: any = {
      sender: {
        send: eventSenderSendMock,
      },
    };
    testSubject.register();
    expect(onMock).toHaveBeenNthCalledWith(1, "main-channel");
    eventCallback(event, "test");
  });

  it("invalid event", (): void => {
    const testSubject: TestSubject.RendererService = new TestSubject.RendererService(ipcMock, "main-channel");
    const eventSenderSendMock: jest.Mock<any, any[]> = jest.fn();
    const event: any = {
      sender: {
        send: eventSenderSendMock,
      },
    };
    testSubject.register();
    expect(onMock).toHaveBeenNthCalledWith(1, "main-channel");
    eventCallback(event, "test", 1);
    eventCallback(event);
  });

  it("ping event", (): void => {
    const testSubject: TestSubject.RendererService = new TestSubject.RendererService(ipcMock, "main-channel");
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
    expect(event.sender.send).toHaveBeenCalledTimes(1);
  });


  it("pong event", (): void => {
    const testSubject: TestSubject.RendererService = new TestSubject.RendererService(ipcMock, "main-channel");
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
});
