import { app, BrowserWindow, dialog, ipcMain, ipcRenderer } from "electron";

import { MainService } from "./mainService";

import * as log from "fancy-log";
import * as path from "path";

app.whenReady()
  .then((): void => {
    const debug: boolean = process.env.DEBUG !== undefined;
    const browserWindow: BrowserWindow = new BrowserWindow({
      webPreferences: {
        defaultEncoding: "UTF-8",
        devTools: debug,
        nodeIntegration: true,
        nodeIntegrationInSubFrames: true,
        nodeIntegrationInWorker: true,
        preload: __dirname + "/preload",
      },
    });

    if (browserWindow) {
      browserWindow.hide();
      browserWindow.setMenuBarVisibility(false);
      browserWindow.loadFile(path.join(__dirname, "index.html"))
        .then((result: void): void => {
          if (debug) {
            browserWindow.webContents.openDevTools({
              mode: "right",
            });
          }
          const service: MainService = new MainService();
          service.register();
          browserWindow.show();
        })
        .catch((reason: any): void => {
          dialog.showErrorBox("Error", JSON.stringify(reason));
        });
    }
  }).catch((reason: any): void => {
    log.error(reason);
  });
