import toStr from "../helpers/string/to_string";

export default function includes(s, sub, pos){
    let _s = toStr(s)

    return _s.includes(sub, pos)
}