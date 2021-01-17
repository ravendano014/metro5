import functions from "./functions";
import {Color, color} from "./type";
import {getGlobalObject} from "@metro5/utils"

let _global = getGlobalObject()

_global.Color = Object.assign(Color, functions)
_global.color = color
