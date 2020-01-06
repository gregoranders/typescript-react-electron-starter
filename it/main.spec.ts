import * as spectron from "spectron";

import * as fs from "fs";
import * as path from "path";

const screenshotsPath: string = path.join(__dirname, "/screenshots/");

if (!fs.existsSync(screenshotsPath)) {
  fs.mkdirSync(path.join(__dirname, "/screenshots/"));
}

describe("test", (): void => {

  const applicationPath: string = fs.realpathSync(path.join(__dirname, "..", "/app/main.js"));

  let testSubject: spectron.Application;
  let counter: number = 0;


  beforeAll( (): Promise<spectron.Application> => {
    testSubject = new spectron.Application({
      args: [applicationPath],
      path: "node_modules/.bin/electron",
      startTimeout: 10000,
    });

    return testSubject.start();
  });

  afterAll( (): Promise<spectron.Application> | void => {
    if (testSubject && testSubject.isRunning()) {
      return testSubject.stop();
    }
  });

  beforeEach( (): Promise<void> => {
    return testSubject.client.waitUntilTextExists("body > div > div > h1", "Application loaded");
  });

  afterEach( (): Promise<number> => {
    return new Promise<number>( (resolve: (value: number) => void, reject: (error: string) => void): void => {
      testSubject.client.saveScreenshot(path.join(screenshotsPath, `main${counter}.png`));
      counter = counter + 1;
      resolve(counter);
    });
  });

  it("1", (): void => {
    expect(testSubject.browserWindow.isVisible()).toBeTruthy();
  });

  it("2", (): Promise<void> => {
    return expect(testSubject.client.getText("body > div > div > h1")).resolves.toBe("Application loaded");
  });

  it("3", (): Promise<void> => {
    return expect(testSubject.client.getText("h2")).resolves.toBe("1");
  });

  it("4", (): Promise<void> => {
    testSubject.client.element("button").click();
    return expect(testSubject.client.getText("h2")).resolves.toBe("2");
  });

  it("5", (): Promise<void> => {
    testSubject.client.element("button").click();
    return expect(testSubject.client.getText("h2")).resolves.toBe("1");
  });

});
