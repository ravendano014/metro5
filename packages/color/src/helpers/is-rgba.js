import RGBA from "../primitive/rgba";
import parse from "./parse";

export default function isRGBA(color){
    return parse(color) instanceof RGBA;
}