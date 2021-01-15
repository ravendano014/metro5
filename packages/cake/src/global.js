import functions from "./functions"
import Cake, {cake} from "./type"
import {getGlobalObject} from "@metro5/utils"

const _global = getGlobalObject()

_global.Cake = Object.assign(Cake, functions);
_global.cake = cake;

