import parse from "../helpers/parse"
import toHSL from "./to-hsl"
import colorType from "../helpers/color-type"
import toColor from "./to-color"
import isColor from "../check/is-color";

export default function spin(color, amount = 10){
    let hsl, type, alpha, hue
    let _color = parse(color)

    if (!isColor(color)) {
        throw new Error("Unknown color format!")
    }

    hsl = toHSL(_color)
    hue = (hsl.h + amount) % 360
    hsl.h = hue < 0 ? 360 + hue : hue

    type = colorType(_color).toLowerCase()

    alpha = _color.a

    return toColor(hsl, type, alpha)
}