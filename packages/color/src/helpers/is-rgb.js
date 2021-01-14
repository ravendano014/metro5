import RGB from "../primitive/rgb";
import parse from "./parse";

export default function isRGB(color){
    return parse(color) instanceof RGB;
}