import * as Const from './const'
import {C, M} from "./const"
import {isNull} from "@metro5/utils";
import {lpad} from "@metro5/cake";

class Datetime {
    constructor() {
        let args = [].slice.call(arguments);

        this.value = new (Function.prototype.bind.apply(Date,  [this].concat(args) ) );

        if (isNaN(this.value.getTime())) {
            throw new Error(Const.INVALID_DATE);
        }

        this.locale = "en";
        this.weekStart = Datetime.getLocale().weekStart;
        this.utcMode = false;
        this.mutable = true;
    }

    immutable(v){
        this.mutable = !(isNull(v) ? true : v)
        return this
    }

    utc(){
        this.utcMode = true
        return this;
    }

    local(){
        this.utcMode = false
        return this
    }

    useLocale(val){
        if (!Datetime.getLocale(val)) {
            console.warn("Locale " + val + " is not defined!")
            return this
        }
        this.locale = val
        this.weekStart = Datetime.getLocale(val).weekStart
        return this
    }

    clone(){
        let c = datetime(this.value)

        c.locale = this.locale
        c.weekStart = this.weekStart
        c.mutable = this.mutable

        return c
    }

    align(to){
        if (this.mutable) {
            this.value = Datetime.align(this, to).val();
            return this;
        }

        return this
            .clone()
            .immutable(false)
            .align(to)
            .immutable(!this.mutable);
    }

    alignEnd(to){
        if (this.mutable) {
            this.value = Datetime.alignEnd(this, to).val();
            return this;
        }

        return this
            .clone()
            .immutable(false)
            .alignEnd(to)
            .immutable(!this.mutable);
    }

    val(val){
        if (!val || !(val instanceof Date) || !(val instanceof Datetime))
            return this.value

        if (this.mutable) {
            this.value = val
            return this
        }

        return datetime(val)
    }

    year2(){
        return +(""+this.year()).substr(-2)
    }

    /* Get + Set */

    _set(m, v){
        let fn = "set" + (this.utcMode && m !== "t" ? "UTC" : "") + M[m]

        if (this.mutable) {
            this.value[fn](v)
            return this
        }

        let clone = this.clone()
        clone.value[fn](v)
        return clone
    }

    _get(m){
        let fn = "get" + (this.utcMode && m !== "t" ? "UTC" : "") + M[m]

        return this.value[fn]()
    }

    _work(part, val){
        if (!arguments.length || isNull(val)) {
            return this._get(part)
        }

        return this._set(part, val)
    }

    ms(val){ return this._work("ms", val)}
    second(val){return this._work("s", val)}
    minute(val){return this._work("m", val)}
    hour(val){return this._work("h", val)}
    day(val){return this._work("D", val)}
    month(val){return this._work("M", val)}
    year(val){return this._work("Y", val)}
    time(val){return this._work("t", val)}

    weekDay(val){
        if (!arguments.length || (isNull(val))) {
            return this.utcMode ? this.value.getUTCDay() : this.value.getDay();
        }

        let curr = this.weekDay();
        let diff = val - curr;

        this.day(this.day() + diff);

        return this;
    }

    get(unit){
        return typeof this[unit] !== "function" ? this : this[unit]();
    }

    set(unit, val){
        return typeof this[unit] !== "function" ? this : this[unit](val);
    }

    add(val, to){
        switch (to) {
            case C.h: return this.time(this.time() + (val * 60 * 60 * 1000));
            case C.m: return this.time(this.time() + (val * 60 * 1000));
            case C.s: return this.time(this.time() + (val * 1000));
            case C.ms: return this.time(this.time() + (val));
            case C.D: return this.day(this.day() + val);
            case C.W: return this.day(this.day() + val * 7);
            case C.M: return this.month(this.month() + val);
            case C.Y: return this.year(this.year() + val);
        }
    }

    addHour(v){return this.add(v,C.h)}
    addMinute(v){return this.add(v,C.m)}
    addSecond(v){return this.add(v, C.s)}
    addMs(v){return this.add(v, C.ms)}
    addDay(v){return this.add(v,C.D)}
    addWeek(v){return this.add(v,C.W)}
    addMonth(v){return this.add(v, C.M)}
    addYear(v){return this.add(v, C.Y)}

    format(fmt, locale){
        const format = fmt || Const.DEFAULT_FORMAT;
        const names = Datetime.getLocale(locale || this.locale);
        const year = this.year(), year2 = this.year2(), month = this.month(), day = this.day(), weekDay = this.weekDay();
        const hour = this.hour(), minute = this.minute(), second = this.second(), ms = this.ms();
        const matches = {
            YY: year2,
            YYYY: year,
            M: month + 1,
            MM: lpad(month + 1, "0", 2),
            MMM: names.monthsShort[month],
            MMMM: names.months[month],
            D: day,
            DD: lpad(day, "0", 2),
            d: weekDay,
            dd: names.weekdaysMin[weekDay],
            ddd: names.weekdaysShort[weekDay],
            dddd: names.weekdays[weekDay],
            H: hour,
            HH: lpad(hour, "0", 2),
            m: minute,
            mm: lpad(minute,"0", 2),
            s: second,
            ss: lpad(second,"0", 2),
            sss: lpad(ms,"0", 3)
        };

        return format.replace(Const.REGEX_FORMAT, (match, $1) => $1 || matches[match]);
    }

    valueOf(){
        return this.value.valueOf();
    }

    toString(){
        return this.value.toString();
    }
}

Datetime.isDatetime = (v) => v instanceof Datetime
Datetime.now = (t) => datetime()[t ? "val" : "time"]()
Datetime.locales = {
    "en": {
        months: "January February March April May June July August September October November December".split(" "),
        monthsShort: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
        weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
        weekdaysShort: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
        weekdaysMin: "Su Mo Tu We Th Fr Sa".split(" "),
        weekStart: 0
    }
}
Datetime.registerLocale = (name, locale) => Datetime.locales[name] = locale
Datetime.getLocale = (name = "en") => Datetime.locales[name]
Datetime.align = (date, align) => {
    let _date = datetime(date), result, temp;

    switch (align) {
        case C.s:  result = _date.ms(0); break; //second
        case C.m:  result = Datetime.align(_date, C.s)[C.s](0); break; //minute
        case C.h:  result = Datetime.align(_date, C.m)[C.m](0); break; //hour
        case C.D:  result = Datetime.align(_date, C.h)[C.h](0); break; //day
        case C.M:  result = Datetime.align(_date, C.D)[C.D](1); break; //month
        case C.Y:  result = Datetime.align(_date, C.M)[C.M](0); break; //year
        case C.W:  {
            temp = _date.weekDay();
            result = Datetime.align(_date, C.D).addDay(-temp);
            break; // week
        }
        default:   result = _date;
    }
    return result;
}
Datetime.alignEnd = (date, align) => {
    let _date = datetime(date), result, temp;

    switch (align) {
        case C.ms: result = _date.ms(999); break; //second
        case C.s:  result = Datetime.alignEnd(_date, C.ms); break; //second
        case C.m:  result = Datetime.alignEnd(_date, C.s)[C.s](59); break; //minute
        case C.h:  result = Datetime.alignEnd(_date, C.m)[C.m](59); break; //hour
        case C.D:  result = Datetime.alignEnd(_date, C.h)[C.h](23); break; //day
        case C.M:  result = Datetime.alignEnd(_date, C.D)[C.D](1).add(1, C.M).add(-1, C.D); break; //month
        case C.Y:  result = Datetime.alignEnd(_date, C.D)[C.M](11)[C.D](31); break; //year
        case C.W:  {
            temp = _date.weekDay();
            result = Datetime.alignEnd(_date, 'day').addDay(6 - temp);
            break; // week
        }

        default:   result = _date;
    }

    return result;
}

Datetime.extend = (where) => {
    let options, name, length = arguments.length;

    for (let i = 1; i < length; i++ ) {
        if ( ( options = arguments[ i ] ) != null ) {
            for ( name in options ) {
                if (Object.prototype.hasOwnProperty.call(options, name))
                    where[ name ] = options[ name ];
            }
        }
    }

    return where;
};

Datetime.use = (obj) => {
    Datetime.extend(Datetime.prototype, obj);
}

Datetime.useStatic = (obj) => {
    Datetime.extend(Datetime, obj);
}

const datetime = function(){
    let args

    if (arguments[0] instanceof Datetime) {
        return datetime(arguments[0].value);
    }

    args = [].slice.call(Array.isArray(arguments[0]) ? arguments[0] : arguments)

    return new (Function.prototype.bind.apply(Datetime,  [this].concat(args) ) )
}

export {
    Datetime, datetime
}
