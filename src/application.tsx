import * as React from "react";

import { RendererService } from "./rendererService";

import { Button } from "./button";

interface IApplicationProperties {
  service: RendererService;
}

export class Application extends React.Component<IApplicationProperties> {

  public render(): React.ReactNode {
    return (<div className="section container">
      <h1>Application loaded</h1>
      <Button label="Toggle" onClick={(): void => { this.handleButtonClick(); }}/>
    </div>);
  }

  private handleButtonClick(): void {
    this.props.service.ping();
  }
}
