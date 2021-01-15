import {DEFAULT_FORMAT} from "../const";
import Datetime from "../type";

const oldFormat = Datetime.prototype.format;

Datetime.use({
    century(){
        return parseInt(this.year() / 100);
    },

    format(format, locale){
        format = format || DEFAULT_FORMAT;

        const matches = {
            C: this.century()
        }

        let result = format.replace(/(\[[^\]]+])|C/g, (match, $1) => $1 || matches[match])

        return oldFormat.bind(this)(result, locale)
    }
})
