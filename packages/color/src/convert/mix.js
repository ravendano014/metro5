import parse from "../helpers/parse";
import RGB from "../primitives/rgb";
import toRGB from "./to-rgb";
import isColor from "../check/is-color";
import colorType from "../helpers/color-type";
import toColor from "./to-color";

export default function mix(color1, color2, amount = 50){

    let _color1 = parse(color1)
    let _color2 = parse(color2)

    if (!isColor(_color1) || !isColor(_color2)) {
        throw new Error("Unknown color format!")
    }

    let type = colorType(_color1).toLowerCase()

    let rgb = new RGB(0,0,0)
    let rgb1 = toRGB(_color1)
    let rgb2 = toRGB(_color2)

    let p = amount / 100

    rgb.r = Math.round(((rgb2.r - rgb1.r) * p) + rgb1.r)
    rgb.g = Math.round(((rgb2.g - rgb1.g) * p) + rgb1.g)
    rgb.b = Math.round(((rgb2.b - rgb1.b) * p) + rgb1.b)

    let alpha

    if (_color1.a && _color2.a) {
        alpha = (+_color1.a + +_color2.a) / 2
    }

    return toColor(rgb, type, alpha);
}