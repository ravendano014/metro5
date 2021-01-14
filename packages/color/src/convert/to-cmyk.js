import parse from "../helpers/parse";
import isColor from "../check/is-color";
import isCMYK from "../check/is-cmyk";
import rgb2cmyk from "./rgb-to-cmyk";
import toRGB from "./to-rgb";

export default function toCMYK(color){
    let _color = parse(color)

    if (!isColor(_color)) {
        throw new Error("Unknown color format!")
    }

    if (isCMYK(_color)) {
        return _color
    }

    return rgb2cmyk(toRGB(color));
}