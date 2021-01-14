import parse from "../helpers/parse";
import isRGB from "../helpers/is-rgb";
import isRGBA from "../helpers/is-rgba";

export default function rgb2hex(color){
    let _color = parse(color);

    if (!isRGB(_color) && !isRGBA(_color)) {
        return undefined
    }

    return (
        "#" +
        ((1 << 24) + (color.r << 16) + (color.g << 8) + color.b).toString(16).slice(1)
    );
}