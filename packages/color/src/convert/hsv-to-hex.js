import parse from "../helpers/parse";
import isHSV from "../check/is-hsv";
import rgb2hex from "./rgb-to-hex";
import hsv2rgb from "./hsv-to-rgb";

export default function hsv2hex(color){
    let _color = parse(color);

    if (!isHSV(_color)) {
        throw new Error("Argument is not a HSV color")
    }

    return rgb2hex(hsv2rgb(_color));
}