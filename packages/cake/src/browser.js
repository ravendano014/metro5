import {getGlobalObject} from "@metro5/utils"
import functions from "./functions"
import {cake} from "./type"

let Cake = Object.assign({}, functions)

let global = getGlobalObject()

global.Cake = Cake
global.cake = cake

