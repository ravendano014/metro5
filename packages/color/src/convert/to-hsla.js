import parse from "../helpers/parse";
import isColor from "../check/is-color";
import isHSLA from "../check/is-hsla";
import toRGB from "./to-rgb";
import hsv2hsl from "./hsv-to-hsl";
import rgb2hsv from "./rgb-to-hsv";
import HSLA from "../primitives/hsla";

export default function toHSLA(color, alpha){
    let _color = parse(color)

    if (!isColor(_color)) {
        throw new Error("Unknown color format!")
    }

    if (isHSLA(_color)) {
        return _color
    }

    alpha = alpha || _color.a

    let hsl = hsv2hsl(rgb2hsv(toRGB(color)))

    return new HSLA(hsl.h, hsl.s, hsl.l, alpha)
}