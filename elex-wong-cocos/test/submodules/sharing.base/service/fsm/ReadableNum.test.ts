import { readableNum } from '../../../../../assets/submodules/sharing.base/helper/ReadableNum';
test('readableNum', () => {
    expect(readableNum(1000)).toBe('1,000');
    expect(readableNum(10000)).toBe('10,000');
    expect(readableNum(416506250)).toBe('416,506,250');
    expect(readableNum(416506250, '.')).toBe('416.506.250');
    expect(readableNum(416506250, '')).toBe('416506250');
    expect(readableNum(-600 * 1000, '.')).toBe('-600.000');
    expect(readableNum(-600 * 1000 * 1000, '.')).toBe('-600.000.000');
    expect(readableNum(-121892262728, '.')).toBe('-121.892.262.728');
    expect(readableNum(0)).toBe('0');
});
