import parse from "../helpers/parse";
import isColor from "../check/is-color";
import isHEX from "../check/is-hex";
import rgb2hex from "./rgb-to-hex";
import toRGB from "./to-rgb";

export default function toHEX(val){
    let _color = parse(val);

    if (!isColor(_color)) {
        throw new Error("Unknown color format!");
    }

    return isHEX(_color) ? _color : rgb2hex(toRGB(_color));
}