const {epochTimestamp} = require('../src/utils/epochTimestamp');

describe('epochTimestamp basic tests', () =>{
    test('epochTimestamp exists and can be called', () => {
        expect( typeof( epochTimestamp ) ).toBe('function');
    });
    test('epochTimestamp returns January 1970 epoch start and end if called with no arguements', () => {
        const actual = epochTimestamp();
        expect( actual.startEpoch).toBe(0);
        expect( actual.endEpoch).toBe(2678399);
    });
    test('epochTimestamp returns January 1970 epoch start and end if called with bad arguements', () => {
        const actual = epochTimestamp('hello', 'goodbye');
        expect( actual.startEpoch).toBe(0);
        expect( actual.endEpoch).toBe(2678399);
    });
});

describe('epochTimestamp functional tests', () =>{
    test('epochTimestamp returns January 2022 epoch start and end if called with 2022, 1', () => {
        const actual = epochTimestamp(2022, 1);
        expect( actual.startEpoch).toBe(1640995200);
        expect( actual.endEpoch).toBe(1643673599);
    });
    test('epochTimestamp returns February 2022 epoch start and end if called with 2022, 2', () => {
        const actual = epochTimestamp(2022, 2);
        expect( actual.startEpoch).toBe(1643673600);
        expect( actual.endEpoch).toBe(1646092799);
    });

    test('epochTimestamp returns March 2022 epoch start and end if called with 2022, 3', () => {
        const actual = epochTimestamp(2022, 3);
        expect( actual.startEpoch).toBe(1646092800);
        expect( actual.endEpoch).toBe(1648771199);
    });

    test('epochTimestamp returns December 2022 epoch start and end if called with 2022, 12', () => {
        const actual = epochTimestamp(2022, 12);
        expect( actual.startEpoch).toBe(1669852800);
        expect( actual.endEpoch).toBe(1672531199);
    });
});
