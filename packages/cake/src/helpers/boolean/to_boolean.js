import {isNull} from "@metro5/utils";

export default function toBool(val, def = false){
    if (isNull(val)) return def;
    return Boolean(val);
}