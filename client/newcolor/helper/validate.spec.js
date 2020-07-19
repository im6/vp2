import validate from './validate'

describe('validate', () => {
  const template = ['f5f5f5', 'ebebeb', 'd9d9d9', 'c7c7c7'];
  test('empty row', () => {
    expect(validate(template, [
      'aaa000',
      'ebebeb',
      'ccb2ff',
      'c7c7c7'
    ])).toEqual([false, {
      badRowNum: 0,
      emptyRowNum: 2,
      dup: 0
    }]);
  });

  test('dup row', () => {
    expect(validate(template, [
      'aaa000',
      '0baa00',
      'ccb2ff',
      '0baa00'
    ])).toEqual([false, {
      badRowNum: 0,
      emptyRowNum: 0,
      dup: 1
    }]);
  });

  test('bad row', () => {
    expect(validate(template, [
      'aaa000',
      '0bsa00',
      'ccb2ff4',
      '0ba00'
    ])).toEqual([false, {
      badRowNum: 3,
      emptyRowNum: 0,
      dup: 0
    }]);
  });

  test('good value', () => {
    expect(validate(template, [
      'aaa000',
      '0a0ba0',
      'ccb2ff',
      '0baa00'
    ])).toEqual([true, {
      badRowNum: 0,
      emptyRowNum: 0,
      dup: 0
    }]);
  });
});
