import { BrowserWindow, app, dialog, ipcMain } from 'electron';

import { MainService } from './main-service';

import * as log from 'fancy-log';
import * as path from 'path';

app
  .whenReady()
  .then((): void => {
    const debug: boolean = process.env.DEBUG !== undefined;
    const browserWindow: BrowserWindow = new BrowserWindow({
      webPreferences: {
        defaultEncoding: 'UTF-8',
        devTools: debug,
        nodeIntegration: true,
        nodeIntegrationInSubFrames: true,
        nodeIntegrationInWorker: true,
        preload: __dirname + '/preload',
      },
    });

    browserWindow.hide();
    browserWindow.setMenuBarVisibility(false);
    browserWindow
      .loadFile(path.join(__dirname, 'index.html'))
      .then((): void => {
        if (debug) {
          browserWindow.webContents.openDevTools({
            mode: 'right',
          });
        }
        const service: MainService = new MainService(ipcMain, 'main-channel');
        service.register();
        browserWindow.show();
      })
      .catch((error: unknown): void => {
        dialog.showErrorBox('Error', JSON.stringify(error));
      });
  })
  .catch((error: unknown): void => {
    log.error(error);
  });
