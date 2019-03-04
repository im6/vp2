import Box from './Box';

describe('Box Class function', () => {
  test('render a color box with classname', () => {
    const mockLikeCb = jest.fn();
    const mockUnlikeCb = jest.fn();
    const mockRedirectCb = jest.fn();
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

    expect(testBox.classList.contains('box')).toBeTruthy();
  });

  test('test box click event', () => {
    const mockLikeCb = jest.fn();
    const mockUnlikeCb = jest.fn();
    const mockRedirectCb = jest.fn();

    const mockColorId = 473;
    const testBox = new Box({
      id: mockColorId,
      color: "64638f#9795cf#aba9e9#cbc9ff",
      like: 17, 
      isLiked: true,
      animDelay: '10ms',
      onLike: mockLikeCb,
      onUnlike: mockUnlikeCb,
      onRedir: mockRedirectCb,
    });
    
    const likeBtn = testBox.querySelector('.btn');
    const canvasElem = testBox.querySelector('.canvas');
    
    likeBtn.click();
    likeBtn.click();
    canvasElem.click();

    expect(mockUnlikeCb).toBeCalled();
    expect(mockLikeCb).toBeCalled();
    expect(mockLikeCb.mock.calls[0][0]).toEqual(mockColorId);
    expect(mockUnlikeCb.mock.calls[0][0]).toEqual(mockColorId);
    expect(mockRedirectCb).toBeCalled();
    expect(mockRedirectCb.mock.calls[0][0]).toEqual(mockColorId);
  });
});