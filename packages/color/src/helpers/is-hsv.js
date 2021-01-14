import HSV from "../primitive/hsv";
import parse from "./parse";

export default function isHSV(color){
    return parse(color) instanceof HSV;
}