import {getGlobalObject} from "@metro5/utils"
import functions from "./type/functions"
import Cake, {cake as _cake} from "./type"

let _Cake = Object.assign({}, Cake, functions)

let global = getGlobalObject()

global.Cake = _Cake
global.cake = _cake

