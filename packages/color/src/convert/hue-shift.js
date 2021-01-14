import toHSV from "./to-hsv"
import colorType from "../helpers/color-type";
import parse from "../helpers/parse";
import toColor from "./to-color";

export default function hueShift(color, hue, saturation, value){
    let _color = parse(color)
    let hsv = toHSV(_color)
    let type = colorType(_color).toLowerCase()
    let h = hsv.h, alpha, _h = hue || 0, _s = saturation || 0, _v = value || 0

    h += _h;
    while (h >= 360.0) h -= 360.0;
    while (h < 0.0) h += 360.0;
    hsv.h = h;

    hsv.s += _s;
    if (hsv.s > 1) {hsv.s = 1;}
    if (hsv.s < 0) {hsv.s = 0;}

    hsv.v += _v;
    if (hsv.v > 1) {hsv.v = 1;}
    if (hsv.v < 0) {hsv.v = 0;}

    alpha = _color.a;

    return toColor(hsv, type, alpha);
}