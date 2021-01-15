import parse from "../helpers/parse";
import toRGB from "./to-rgb";
import toRGBA from "./to-rgba";
import toHEX from "./to-hex";
import isColor from "../check/is-color";
import toHSV from "./to-hsv";
import toHSL from "./to-hsl";
import toHSLA from "./to-hsla";
import toCMYK from "./to-cmyk";

export default function toColor(color, type, alpha){
    let _color = parse(color), res

    if (!isColor(_color)) {
        throw new Error("Unknown color format!")
    }

    alpha = alpha || _color.a

    switch (type.toLowerCase()) {
        case "hex":
            res = toHEX(_color);
            break;
        case "rgb":
            res = toRGB(_color);
            break;
        case "rgba":
            res = toRGBA(_color, alpha);
            break;
        case "hsl":
            res = toHSL(_color);
            break;
        case "hsla":
            res = toHSLA(_color, alpha);
            break;
        case "hsv":
            res = toHSV(_color);
            break;
        case "cmyk":
            res = toCMYK(_color);
            break;
        default:
            res = _color;
    }
    return res;
}