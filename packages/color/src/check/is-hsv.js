import HSV from "../primitives/hsv";
import parse from "../helpers/parse";

export default function isHSV(color){
    return parse(color) instanceof HSV;
}