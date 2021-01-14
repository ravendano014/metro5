import parse from "../helpers/parse";
import isHEX from "../check/is-hex";
import rgb2hsv from "./rgb-to-hsv";
import hex2rgb from "./hex-to-rgb";

export default function hex2hsv(color){
    let _color = parse(color)

    if (!isHEX(_color)) {
        throw new Error("Argument is not a HEX color")
    }

    return rgb2hsv(hex2rgb(_color));
}