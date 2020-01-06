import "./preload";

describe("Preload", (): void => {

  it("exports exists on window", (): void => {
    expect(window.exports).not.toBeUndefined();
  });

});
