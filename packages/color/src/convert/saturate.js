import parse from "../helpers/parse";
import clamp from "../helpers/clamp";
import colorType from "../helpers/color-type";
import toColor from "./to-color";
import toHSL from "./to-hsl";
import isColor from "../check/is-color";

export default function saturate(color, amount){
    let hsl, type, alpha
    let _color = parse(color)

    if (!isColor(color)) {
        throw new Error("Unknown color format!");
    }

    hsl = toHSL(_color)
    hsl.s += amount / 100
    hsl.s = clamp(hsl.s)

    type = colorType(_color).toLowerCase()

    alpha = _color.a

    return toColor(hsl, type, alpha)
}