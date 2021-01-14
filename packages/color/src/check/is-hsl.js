import HSL from "../primitives/hsl"
import parse from "../helpers/parse";

export default function isHSL(color){
    return parse(color) instanceof HSL
}