import HSLA from "../primitives/hsla";
import parse from "../helpers/parse";

export default function isHSLA(color){
    return parse(color) instanceof HSLA;
}