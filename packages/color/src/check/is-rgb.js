import RGB from "../primitives/rgb";
import parse from "../helpers/parse";

export default function isRGB(color){
    return parse(color) instanceof RGB;
}