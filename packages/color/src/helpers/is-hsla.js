import HSLA from "../primitive/hsla";
import parse from "./parse";

export default function isHSLA(color){
    return parse(color) instanceof HSLA;
}