import parse from "../helpers/parse";
import isColor from "../check/is-color";
import colorType from "../helpers/color-type";
import toRGB from "./to-rgb";
import RGB from "../primitives/rgb";
import toColor from "./to-color";

export default function multiply(color1, color2){
    let _color1 = parse(color1)
    let _color2 = parse(color2)

    if (!isColor(_color1) || !isColor(_color2)) {
        throw new Error("Unknown color format!")
    }

    let type = colorType(_color1).toLowerCase()

    let rgb1 = toRGB(_color1);
    let rgb2 = toRGB(_color2);
    let rgb = new RGB();

    rgb1.b = Math.floor(rgb1.b * rgb2.b / 255);
    rgb1.g = Math.floor(rgb1.g * rgb2.g / 255);
    rgb1.r = Math.floor(rgb1.r * rgb2.r / 255);

    let alpha

    if (_color1.a && _color2.a) {
        alpha = (+_color1.a + +_color2.a) / 2
    }

    return toColor(rgb, type, alpha);
}