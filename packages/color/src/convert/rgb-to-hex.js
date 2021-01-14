import parse from "../helpers/parse";
import isRGB from "../check/is-rgb";
import isRGBA from "../check/is-rgba";

export default function rgb2hex(color){
    let _color = parse(color);

    if (!isRGB(_color) && !isRGBA(_color)) {
        throw new Error("Argument is not a RGB or RGBA color")
    }

    return (
        "#" +
        ((1 << 24) + (_color.r << 16) + (_color.g << 8) + _color.b).toString(16).slice(1)
    );
}