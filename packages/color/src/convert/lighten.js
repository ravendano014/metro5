import parse from "../helpers/parse";
import isColor from "../check/is-color";
import toHSL from "./to-hsl";
import clamp from "../helpers/clamp";
import colorType from "../helpers/color-type";
import toColor from "./to-color";

export default function lighten(color, amount = 10){
    let hsl, type, alpha;
    let _color = parse(color)

    if (!isColor(color)) {
        throw new Error("Unknown color format!");
    }

    hsl = toHSL(_color);
    hsl.l += amount / 100;
    hsl.l = clamp(hsl.l);

    alpha = _color.a;
    type = colorType(_color).toLowerCase();

    return toColor(hsl, type, alpha);
}