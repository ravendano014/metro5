import functions from "@metro5/cake/src/functions";
import Color, {color} from "./type";
import {getGlobalObject} from "@metro5/utils"

let _global = getGlobalObject()

if (typeof _global !== "undefined") {
    _global.ColorFn = {...functions };
    _global.Color = Color;
    _global.color = color;
}

export default Color
export const ColorNS = {
    ...functions,
    color
}