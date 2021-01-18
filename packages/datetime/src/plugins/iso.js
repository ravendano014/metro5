import {DEFAULT_FORMAT} from "../const";
import {Datetime, datetime} from "../type";

const fnFormat = Datetime.prototype.format;
const fnAlign = Datetime.align;
const fnAlignEnd = Datetime.alignEnd;

Datetime.align = (d, align) => {
    let date = datetime(d), result, temp;

    switch(align) {
        case "isoWeek":
            temp = date.isoWeekDay();
            result = fnAlign(date, 'day').addDay(-temp + 1);
            break; // isoWeek

        default: result = fnAlign.apply(this, [date, align]);
    }

    return result;
}

Datetime.alignEnd = (d, align) => {
    let date = datetime(d), result, temp;

    switch(align) {
        case "isoWeek":
            temp = date.isoWeekDay();
            result = fnAlignEnd(date, 'day').addDay(7 - temp);
            break; // isoWeek

        default: result = fnAlignEnd.apply(this, [date, align]);
    }

    return result;
}

Object.assign(Datetime.prototype, {
    isoWeekDay(val){
        let wd = (this.weekDay() + 6) % 7 + 1;

        if (!arguments.length || (Datetime.not(val))) {
            return wd;
        }

        return this.addDay(val - wd);
    },

    format(format, locale){
        format = format || DEFAULT_FORMAT;
        const matches = {
            I: this.isoWeekDay()
        }
        let result = format.replace(/(\[[^\]]+])|I{1,2}/g, (match, $1) => $1 || matches[match])
        return fnFormat.bind(this)(result, locale)
    }
})
