import toStr from "../helpers/string/to_string";
import {isNull} from "@metro5/utils";

export default function split(str, sep = "", limit = null, trim = true){
    return toStr(str)
        .split(sep, limit)
        .map( el => typeof el === "string" && trim ? el.trim() : el )
        .filter( el => trim ? !isNull(el) : true)
}