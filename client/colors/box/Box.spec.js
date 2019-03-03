import Box from './Box';
jest.mock('./Box');
beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  Box.mockClear();
});

describe('Box Class function', () => {
  test('render a color box', () => {
    const mockLikeCb = jest.fn(id => console.log(`like: ${id}`));
    const mockUnlikeCb = jest.fn(id => console.log(`unlike: ${id}`));
    const mockRedirectCb = jest.fn(id => console.log(`redirect: ${id}`));

    const testBox = new Box({
      id: 473,
      color: "64638f#9795cf#aba9e9#cbc9ff",
      like: 17, 
      isLiked: true,
      animDelay: '10ms',
      onLike: mockLikeCb,
      onUnlike: mockUnlikeCb,
      onRedir: mockRedirectCb,
    });
    expect(testBox).toBeInstanceOf(Box);
  });
});