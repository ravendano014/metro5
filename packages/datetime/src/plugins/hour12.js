import {DEFAULT_FORMAT} from "../const";
import {Datetime} from "../type";
import {lpad} from "@metro5/cake";

const fnFormat = Datetime.prototype.format;

Datetime.use({
    ampm(isLowerCase){
        let val = this.hour() < 12 ? "AM" : "PM";
        return isLowerCase ? val.toLowerCase() : val;
    },

    hour12: function(h, p){
        let hour = h;

        if (arguments.length === 0) {
            return this.hour() % 12;
        }

        p = p || 'am';

        if (p.toLowerCase() === "pm") {
            hour += 12;
        }

        return this.hour(hour);
    },

    format: function(format, locale){
        let matches, result, h12 = this.hour12();

        format = format || DEFAULT_FORMAT;

        matches = {
            a: "["+this.ampm(true)+"]",
            A: "["+this.ampm(false)+"]",
            h: h12,
            hh: lpad(h12, "0", 2)
        };

        result = format.replace(/(\[[^\]]+])|a|A|h{1,2}/g, (match, $1) => $1 || matches[match]);

        return fnFormat.bind(this)(result, locale)
    }
})
