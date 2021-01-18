import {Datetime, datetime} from "../src"
import "../src/plugins/century"

describe('century()', () => {
    test ('Should be 20 for 2021', () => {
        expect(datetime("2021").century()).toBe( 20);
    })
    test ('Should be 19 for 1972', () => {
        expect(datetime("1972").format('C')).toBe( '19');
    })
    test ('Should be 19 for 1972', () => {
        expect(datetime("1972").format()).toBe( '1972-01-01T03:00:00.000');
    })
});
