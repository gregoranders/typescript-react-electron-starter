describe('Preload', (): void => {
  beforeEach(() => {
    Object.keys(require.cache).forEach((key) => {
      delete require.cache[key];
    });
  });

  it('should assign global exports to window.exports if undefined', async () => {
    window.exports = false;
    await require('./preload');
    expect(window.exports).toStrictEqual(exports);
  });

  it('should do nothing if window.exports exists', async () => {
    const exports = { a: 1 };
    global.exports = { a: 2 };
    window.exports = exports;
    await require('./preload');
    expect(window.exports).toStrictEqual(exports);
  });
});
