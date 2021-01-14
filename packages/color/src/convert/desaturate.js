import parse from "../helpers/parse";
import isColor from "../check/is-color";
import toHSL from "./to-hsl";
import clamp from "../helpers/clamp";
import colorType from "../helpers/color-type";
import toColor from "./to-color";

export default function desaturate(color, amount = 0){
    let hsl, type, alpha;
    let _color = parse(color)

    if (!isColor(_color)) {
        throw new Error("Unknown color format!");
    }

    hsl = toHSL(_color);
    hsl.s -= amount / 100;
    hsl.s = clamp(hsl.s);

    type = colorType(_color).toLowerCase();

    alpha = _color.a

    return toColor(hsl, type, alpha);
}