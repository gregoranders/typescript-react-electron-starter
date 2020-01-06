import { mount, ReactWrapper } from "enzyme";
import * as React from "react";
import * as renderer from "react-test-renderer";

import * as TestSubject from "./mainService";

describe("MainService", (): void => {

  it("MainService export exists", (): void => {
    expect(TestSubject.MainService).toBeDefined();
  });

  it("register", (): void => {
    const ipc: any = {
      on: jest.fn(),
    };

    const testSubject: TestSubject.MainService = new TestSubject.MainService(ipc, "main-channel");
    testSubject.register();
    expect(ipc.on).toHaveBeenCalledTimes(1);
  });

  it("callback", (): void => {
    const ipc: any = {
      on: jest.fn(),
    };

    const testSubject: TestSubject.MainService = new TestSubject.MainService(ipc, "main-channel");
    testSubject.register();
    expect(ipc.on).toHaveBeenCalledTimes(1);
  });
});
