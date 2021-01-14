import parse from "../helpers/parse";
import isColor from "../check/is-color";
import colorType from "../helpers/color-type";
import toRGB from "./to-rgb";
import toColor from "./to-color";
import RGB from "../primitives/rgb";

export default function shade(color, amount){
    let _color = parse(color)

    if (!isColor(_color)) {
        throw new Error("Unknown color format!");
    }

    amount /= 100

    let type = colorType(_color).toLowerCase()
    let rgb = toRGB(_color)
    let t = amount < 0 ? 0 : 255
    let p = amount < 0 ? amount * -1 : amount
    let r, g, b, alpha

    r = (Math.round((t - rgb.r) * p) + rgb.r)
    g = (Math.round((t - rgb.g) * p) + rgb.g)
    b = (Math.round((t - rgb.b) * p) + rgb.b)

    alpha = color.a

    return toColor(new RGB(r, g, b), type, alpha)
}