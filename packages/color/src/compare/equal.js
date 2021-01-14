import isColor from "../check/is-color";

export default function equal(color1, color2){
    if (!isColor(color1) || !isColor(color2)) {
        return false;
    }

    return toHEX(color1) === toHEX(color2);
}