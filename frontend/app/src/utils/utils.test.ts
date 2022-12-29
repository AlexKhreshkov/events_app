import { reformatDateFullDate } from './utils';

describe('reformatDateFullDate', () => {
    test('Correct date', () => {
        expect(reformatDateFullDate('2022-12-15T10:05:07.105521Z'))
            .toBe('2022-12-15:10:05:07')
    })
    test('Incorrect date', () => {
        expect(reformatDateFullDate('2022-12-'))
            .toBe('WRONG DATE')
    })
})
// describe('reformatDate', () => {
// })