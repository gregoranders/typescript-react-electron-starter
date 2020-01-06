import * as React from "react";
import * as renderer from "react-test-renderer";

import * as TestSubject from "./application";

import { RendererService } from "./rendererService";

describe("Application", (): void => {

  const service: RendererService = new RendererService(undefined as any, undefined as any);

  it("Application export exists", (): void => {
    expect(TestSubject.Application).toBeDefined();
  });

  it("Application snapshot", (): void => {
    const snapshot: renderer.ReactTestRenderer = renderer.create(<TestSubject.Application service={ service } />);
    snapshot.toJSON();
    expect(snapshot).toMatchSnapshot();
  });

});
