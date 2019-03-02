import Box from '.';

describe('Box Class Testing', () => {
  test('box render', () => {
    const testBox = new Box();
    expect(testBox).exist();
  });
});