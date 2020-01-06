import { mount, ReactWrapper } from "enzyme";
import * as React from "react";
import * as renderer from "react-test-renderer";

import * as TestSubject from "./application";

import { RendererService } from "./rendererService";

describe("Application", (): void => {

  const pingMock: jest.Mock<any, any[]> = jest.fn();
  const RendererServiceMock: jest.Mock<RendererService, any[]>
    = jest.fn().mockImplementation((props: TestSubject.IApplicationProperties, context?: any) => {
      return {
        ping: pingMock,
      };
  });

  const service: RendererService = new RendererServiceMock();

  beforeEach((): void => {
    RendererServiceMock.mockClear();
  });
  it("export exists", (): void => {
    expect(TestSubject.Application).toBeDefined();
  });

  it("snapshot", (): void => {
    const snapshot: renderer.ReactTestRenderer = renderer.create(<TestSubject.Application service={ service } />);
    snapshot.toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it("header", (): void => {
    const testSubject: ReactWrapper<TestSubject.IApplicationProperties, {}, TestSubject.Application>
      = mount(<TestSubject.Application service={ service } />);

    expect(testSubject.find("h1").text()).toBe("Application loaded");
  });

  it("button clicked", (): void => {
    const testSubject: ReactWrapper<TestSubject.IApplicationProperties, {}, TestSubject.Application>
      = mount(<TestSubject.Application service={ service } />);

    expect(pingMock).toBeCalledTimes(0);
    testSubject.find("Button").find("button").simulate("click");
    expect(pingMock).toBeCalledTimes(1);
  });

});
