import RGBA from "../primitives/rgba";
import parse from "../helpers/parse";

export default function isRGBA(color){
    return parse(color) instanceof RGBA;
}