import parse from "../helpers/parse";
import isColor from "../check/is-color";
import isRGBA from "../check/is-rgba";
import toRGB from "./to-rgb";
import RGBA from "../primitives/rgba";

export default function toRGBA(color, alpha){
    let _color = parse(color);

    if (!isColor(_color)) {
        throw new Error("Unknown color format!")
    }

    if (isRGBA(_color)) return _color

    alpha = alpha || _color.a

    let rgb = toRGB(_color)

    return new RGBA(rgb.r, rgb.g, rgb.b, alpha)
}