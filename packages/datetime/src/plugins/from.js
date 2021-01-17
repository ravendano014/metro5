import {INVALID_DATE} from "../const";
import {Datetime, datetime} from "../type";

Datetime.useStatic({
    from(str, format, locale){
        let norm, normFormat, fItems, dItems;
        let iMonth, iDay, iYear, iHour, iMinute, iSecond, iMs;
        let year, month, day, hour, minute, second, ms;
        let parsedMonth;

        const getIndex = function(where, what){
            return where.map(function(el){
                return el.toLowerCase();
            }).indexOf(what.toLowerCase());
        }

        const monthNameToNumber = function(month){
            let i = -1;
            const names = Datetime.getLocale(locale || 'en');

            if (Datetime.not(month)) return -1;

            i = getIndex(names.months, month);

            if (i === -1 && typeof names["monthsParental"] !== "undefined") {
                i = getIndex(names.monthsParental, month);
            }

            if (i === -1) {
                month = month.substr(0, 3);
                i = getIndex(names.monthsShort, month);
            }

            return i === -1 ? -1 : i + 1;
        };

        const getPartIndex = function(part){
            const parts = {
                "month": ["M", "mm", "%m"],
                "day": ["D", "dd", "%d"],
                "year": ["YY", "YYYY", "yy", "yyyy", "%y"],
                "hour": ["h", "hh", "%h"],
                "minute": ["m", "mi", "i", "ii", "%i"],
                "second": ["s", "ss", "%s"],
                "ms": ["sss"]
            }

            let result = -1, key, index;

            for(let i = 0; i < parts[part].length; i++) {
                key = parts[part][i];
                index = fItems.indexOf(key);
                if (index !== -1) {
                    result = index;
                    break;
                }
            }

            return result;
        }

        if (Datetime.not(format) || (""+format).trim() === "") {
            return datetime();
        }

        /* eslint-disable-next-line */
        norm = str.replace(/[\/,.:\s]/g, '-');
        /* eslint-disable-next-line */
        normFormat = format.toLowerCase().replace(/[^a-zA-Z0-9%]/g, '-');
        fItems = normFormat.split('-');
        dItems = norm.split('-');

        if (norm.replace(/-/g,"").trim() === "") {
            throw new Error(INVALID_DATE);
        }

        iMonth = getPartIndex("month");
        iDay = getPartIndex("day");
        iYear = getPartIndex("year");
        iHour = getPartIndex("hour");
        iMinute = getPartIndex("minute");
        iSecond = getPartIndex("second");
        iMs = getPartIndex("ms");

        if (iMonth > -1 && dItems[iMonth]) {
            if (isNaN(parseInt(dItems[iMonth]))) {
                dItems[iMonth] = monthNameToNumber(dItems[iMonth]);
                if (dItems[iMonth] === -1) {
                    iMonth = -1;
                }
            } else {
                parsedMonth = parseInt(dItems[iMonth]);
                if (parsedMonth < 1 || parsedMonth > 12) {
                    iMonth = -1;
                }
            }
        } else {
            iMonth = -1;
        }

        year  = iYear > -1 && dItems[iYear] ? dItems[iYear] : 0;
        month = iMonth > -1 && dItems[iMonth] ? dItems[iMonth] : 1;
        day   = iDay > -1 && dItems[iDay] ? dItems[iDay] : 1;

        hour    = iHour > -1 && dItems[iHour] ? dItems[iHour] : 0;
        minute  = iMinute > -1 && dItems[iMinute] ? dItems[iMinute] : 0;
        second  = iSecond > -1 && dItems[iSecond] ? dItems[iSecond] : 0;
        ms  = iMs > -1 && dItems[iMs] ? dItems[iMs] : 0;

        return datetime(year, month-1, day, hour, minute, second, ms);
    }
})
