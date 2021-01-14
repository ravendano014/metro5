import parse from "../helpers/parse";
import isColor from "../check/is-color";
import toRGB from "./to-rgb";
import colorType from "../helpers/color-type";
import toColor from "./to-color";

export default function brighten(color, amount){
    let rgb, type, alpha;
    let _color = parse(color)

    if (!isColor(color)) {
        throw new Error("Unknown color format!");
    }

    rgb = toRGB(_color);
    rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * - (amount / 100))));
    rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * - (amount / 100))));
    rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * - (amount / 100))));

    type = colorType(color).toLowerCase();

    alpha = _color.a;

    return toColor(rgb, type, alpha);
}