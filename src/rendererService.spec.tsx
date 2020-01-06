import { mount, ReactWrapper } from "enzyme";
import * as React from "react";
import * as renderer from "react-test-renderer";

import * as TestSubject from "./rendererService";

describe("RendererService", (): void => {

  it("RendererService export exists", (): void => {
    expect(TestSubject.RendererService).toBeDefined();
  });

  it("ping", (): void => {
    const ipc: any = {
      send: jest.fn(),
    };

    const testSubject: TestSubject.RendererService = new TestSubject.RendererService(ipc, "main-channel");
    testSubject.ping();
    expect(ipc.send).toHaveBeenCalledTimes(1);
  });

  it("register", (): void => {
    const ipc: any = {
      on: jest.fn(),
    };

    const testSubject: TestSubject.RendererService = new TestSubject.RendererService(ipc, "main-channel");
    testSubject.register();
    expect(ipc.on).toHaveBeenCalledTimes(1);
  });

  it("callback", (): void => {
    const ipc: any = {
      on: jest.fn(),
    };

    const testSubject: TestSubject.RendererService = new TestSubject.RendererService(ipc, "main-channel");
    testSubject.register();
    expect(ipc.on).toHaveBeenCalledTimes(1);
  });
});
