import toStr from "../helpers/string/to_string";

export default function capitalize(s, strong){
    let _s = toStr(s)
    let last = (_s).substr(1);
    return (_s).substr(0, 1).toUpperCase() + (strong ? last.toLowerCase() : last)
}
