import isNull from "./is-null";

export default function nvl(val, def){
    return isNull(val) ? def : val;
}