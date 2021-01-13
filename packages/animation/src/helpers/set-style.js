import {isNull} from "@metro5/utils"
import validElement from "./valid-element"
import {camelCase} from "@metro5/cake"

export default function setStyle (el, key, val, unit, toInt) {

    if (isNull(toInt)) {
        toInt = false;
    }

    key = camelCase(key);

    if (toInt) {
        val  = parseInt(val);
    }

    if (validElement(el)) {
        if (typeof el[key] !== "undefined") {
            el[key] = val;
        } else {
            el.style[key] = key === "transform" || key.toLowerCase().indexOf('color') > -1 ? val : val + unit;
        }
    } else {
        el[key] = val;
    }
}