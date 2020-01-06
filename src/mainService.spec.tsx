import { mount, ReactWrapper } from "enzyme";
import * as React from "react";
import * as renderer from "react-test-renderer";

import * as TestSubject from "./mainService";

describe("MainService", (): void => {

  it("MainService export exists", (): void => {
    expect(TestSubject.MainService).toBeDefined();
  });
});
