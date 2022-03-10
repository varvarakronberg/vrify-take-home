import { mapRegionName } from './utils.js'

test('A B C to be mapped to abc', () => {
    expect(mapRegionName("A B C")).toBe("abc");
});

// test('A B C to be mapped to abc', () => {
//     expect(mapRegionName("A ")).toBe("a");
// });
