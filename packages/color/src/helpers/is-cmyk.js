import parse from "./parse";
import CMYK from "../primitive/cmyk";

export default function isCMYK(color){
    return parse(color) instanceof CMYK;
}