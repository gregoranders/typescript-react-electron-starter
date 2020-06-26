import * as React from 'react';
import { render } from 'react-dom';

import { ipcRenderer } from 'electron';

import { Application } from './application';

import { RendererService } from './renderer-service';

const service: RendererService = new RendererService(ipcRenderer, 'main-channel');
service.register();

render(<Application service={service} />, document.querySelector('#content'));
