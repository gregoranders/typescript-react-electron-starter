import * as React from "react";
import { render } from "react-dom";

import { ipcRenderer } from "electron";

import { Application } from "./application";

import { RendererService } from "./rendererService";

const service: RendererService = new RendererService();
service.register(ipcRenderer, "render-channel");

render(<Application service={ service }/>, document.getElementById("content"));
