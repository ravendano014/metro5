import parse from "../helpers/parse";
import isHSV from "../check/is-hsv";
import rgb2hsv from "./rgb-to-hsv";
import rgb2websafe from "./rgb-to-websafe";

export default function hsv2websafe(color){
    let _color = parse(color)

    if (!isHSV(_color)) {
        throw new Error("Argument is not a HSV color")
    }

    return rgb2hsv(rgb2websafe(toRGB(_color)));
}