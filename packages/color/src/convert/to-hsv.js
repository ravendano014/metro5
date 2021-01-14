import parse from "../helpers/parse";
import rgb2hsv from "./rgb-to-hsv";
import toRGB from "./to-rgb";

export default function toHSV(color){
    let _color = parse(color)

    return rgb2hsv(toRGB(_color))
}