import {REGEX_FORMAT_STRFTIME, DEFAULT_FORMAT_STRFTIME} from "../const"
import {Datetime, datetime} from "../type";
import {lpad} from "@metro5/cake";

import "./century"
import "./dayofyear"
import "./hour12"
import "./weeknumber"
import "./timezone"
import "./iso"

Datetime.use({
    strftime(fmt, locale){
        const format = fmt || DEFAULT_FORMAT_STRFTIME;
        const names = Datetime.getLocale(locale || this.locale);
        const year = this.year(), year2 = this.year2(), month = this.month(), day = this.day(), weekDay = this.weekDay();
        const hour = this.hour(), hour12 = this.hour12(), minute = this.minute(), second = this.second(), ms = this.ms(), time = this.time();
        const aDay = lpad(day, 2, "0"),
            aMonth = lpad(month + 1, 2, "0"),
            aHour = lpad(hour, 2, "0"),
            aHour12 = lpad(hour12, 2, "0"),
            aMinute = lpad(minute, 2, "0"),
            aSecond = lpad(second, 2, "0"),
            aMs = lpad(ms, 3, "0");

        const that = this;

        const thursday = function(){
            return datetime(that.value).day(that.day() - ((that.weekDay() + 6) % 7) + 3);
        };

        const matches = {
            '%a': names.weekdaysShort[weekDay],
            '%A': names.weekdays[weekDay],
            '%b': names.monthsShort[month],
            '%h': names.monthsShort[month],
            '%B': names.months[month],
            '%c': this.toString().substring(0, this.toString().indexOf(" (")),
            '%C': this.century(),
            '%d': aDay,
            '%D': [aDay, aMonth, year].join("/"),
            '%e': day,
            '%F': [year, aMonth, aDay].join("-"),
            '%G': thursday().year(),
            '%g': (""+thursday().year()).slice(2),
            '%H': aHour,
            '%I': aHour12,
            '%j': lpad(this.dayOfYear(), 3,"0"),
            '%k': aHour,
            '%l': aHour12,
            '%m': aMonth,
            '%n': month + 1,
            '%M': aMinute,
            '%p': this.ampm(),
            '%P': this.ampm(true),
            '%s': Math.round(time / 1000),
            '%S': aSecond,
            '%u': this.isoWeekDay(),
            '%V': this.isoWeekNumber(),
            '%w': weekDay,
            '%x': this.toLocaleDateString(),
            '%X': this.toLocaleTimeString(),
            '%y': year2,
            '%Y': year,
            '%z': this.timezone().replace(":", ""),
            '%Z': this.timezoneName(),
            '%r': [aHour12, aMinute, aSecond].join(":") + " " + this.ampm(),
            '%R': [aHour, aMinute].join(":"),
            "%T": [aHour, aMinute, aSecond].join(":"),
            "%Q": aMs,
            "%q": ms,
            "%t": this.timezone()
        };

        return format.replace(
            REGEX_FORMAT_STRFTIME,
            (match) => (matches[match] === 0 || matches[match] ? matches[match] : match)
        );
    }
});
