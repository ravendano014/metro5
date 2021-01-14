import HSL from "../primitive/hsl"
import parse from "./parse"

export default function isHSL(color){
    return parse(color) instanceof HSL
}