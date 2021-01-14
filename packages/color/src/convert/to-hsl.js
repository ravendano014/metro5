import parse from "../helpers/parse";
import hsv2hsl from "./hsv-to-hsl";
import rgb2hsv from "./rgb-to-hsv";
import toRGB from "./to-rgb";

export default function toHSL(color){
    let _color = parse(color)

    return hsv2hsl(rgb2hsv(toRGB(_color)));
}