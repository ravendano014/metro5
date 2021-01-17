import {DEFAULT_FORMAT} from "../const"
import {Datetime} from "../type";

const fnFormat = Datetime.prototype.format;

Datetime.use({
    buddhist() {
        return this.year() + 543;
    },

    format(format, locale) {
        format = format || DEFAULT_FORMAT;
        const matches = {
            BB: (this.buddhist() + "").slice(-2),
            BBBB: this.buddhist()
        }
        let result = format.replace(/(\[[^\]]+])|B{4}|B{2}/g, (match, $1) => $1 || matches[match])

        return fnFormat.bind(this)(result, locale)
    }
})
