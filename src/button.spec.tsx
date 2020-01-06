import { mount, ReactWrapper } from "enzyme";
// import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import * as renderer from "react-test-renderer";

import * as TestSubject from "./button";

describe("Button", (): void => {

  // beforeAll((): void => {
  //   configure({ adapter: new Adapter() });
  // });

  it("Button export exists", (): void => {
    expect(TestSubject.Button).toBeDefined();
  });

  it("Button snapshot", (): void => {
    const snapshot: renderer.ReactTestRenderer
      = renderer.create(<TestSubject.Button label="button" onClick={ (): void => { return; } } />);
    snapshot.toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it("Button clicked mount", (): void => {
    let counter: number = 0;
    const func: jest.Mock<void, any[]> = jest.fn( (): void => {
      counter = counter + 1;
    });
    const testSubject: ReactWrapper<TestSubject.IButtonProperties, TestSubject.IButtonState, TestSubject.Button>
      = mount(<TestSubject.Button label="button" onClick={ func } />);

    expect(testSubject.text()).toBe("1button");
    expect(counter).toBe(0);
    expect(testSubject.state().toggle).toBeFalsy();
    expect(func.mock.calls.length).toBe(0);

    testSubject.find("button").simulate("click");

    expect(testSubject.text()).toBe("2button");
    expect(counter).toBe(1);
    expect(testSubject.state().toggle).toBeTruthy();
    expect(func.mock.calls.length).toBe(1);
  });
});
