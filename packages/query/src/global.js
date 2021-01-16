import {getGlobalObject} from "@metro5/utils"
import Query from "./class.js"
import $ from "./$"

const _global = getGlobalObject()

const __$ = _global.$
const __Query = _global.Query

$.global = () => {
    _global.$ = $
    _global.Query = Query
    _global.m4q = $
}

$.noConflict = () => {
    _global.$ = __$
    _global.Query = __Query
}

$.global()