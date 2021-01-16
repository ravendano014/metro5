import {isNull} from "@metro5/utils";
import toStr from "../helpers/string/to_string";

export default function stripe(str, what = null, replace = "") {
    let _str = toStr(str)
    let regexp

    if (isNull(what)) return _str

    regexp = new RegExp(what, "g")

    return _str.replace(regexp, replace)
}
