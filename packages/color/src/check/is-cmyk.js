import parse from "../helpers/parse";
import CMYK from "../primitives/cmyk";

export default function isCMYK(color){
    return parse(color) instanceof CMYK;
}