import {Datetime, datetime} from "../src"
import "../src/plugins/calendar"
import "../src/plugins/iso"

describe('Calendar plugin', function() {
    it ('Should be 42', () => {
        expect(Datetime.calendar("2020").days.length).toBe( 42);
    })
    it ('Should be 42', () => {
        expect(datetime("2020").calendar().days.length).toBe( 42);
    })
    it ('Should be 42', () => {
        expect(datetime("2020").calendar().weekdays.length).toBe( 7);
    })
    it ('Should be 42', () => {
        expect(datetime("2020").calendar(true).weekdays.length).toBe( 7);
    })
})