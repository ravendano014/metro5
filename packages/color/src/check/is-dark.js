import isColor from "./is-color";
import parse from "../helpers/parse";
import toRGB from "../convert/to-rgb";

export default function isDark(color){
    let _color = parse(color)

    if (!isColor(_color)) return;

    const rgb = toRGB(_color);
    const YIQ = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;

    return YIQ < 128;
}