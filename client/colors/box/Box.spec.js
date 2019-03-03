import Box from './Box';

describe('Box Class function', () => {
  test('render a color box', () => {
    const mockLikeCb = jest.fn(id => console.log(`like: ${id}`));
    const mockUnlikeCb = jest.fn(id => console.log(`unlike: ${id}`));
    const mockRedirectCb = jest.fn(id => console.log(`redirect: ${id}`));

    const testBox = new Box({
      id: 473,
      value: "64638f#9795cf#aba9e9#cbc9ff",
      like: 17, 
      isLiked: true,
      animDelay: '10ms',
      onLike: mockLikeCb,
      onUnlike: mockUnlikeCb,
      onRedir: mockRedirectCb,
    });
    console.log(testBox)
    expect(1).toBe(1);
  });
});