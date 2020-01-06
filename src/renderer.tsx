import * as React from "react";
import { render } from "react-dom";

import { Application } from "./application";

import { RendererService } from "./rendererService";

const service: RendererService = new RendererService();
service.register();

render(<Application service={ service }/>, document.getElementById("content"));
