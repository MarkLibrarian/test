import { parseExit } from '../index';

describe('parseExit', function() {
  test('"enter the library"', () => {
    expect(parseExit('enter the library')).toEqual({
      title: 'enter the library',
      text: 'enter the library'
    });
  });

  test('"enter the library|saunter inside"', () => {
    expect(parseExit('enter the library|saunter inside')).toEqual({
      title: 'enter the library',
      text: 'saunter inside'
    });
  });

  test('"  enter the library | saunter inside   "', () => {
    expect(parseExit('  enter the library | saunter inside   ')).toEqual({
      title: 'enter the library',
      text: 'saunter inside'
    });
  });
});
