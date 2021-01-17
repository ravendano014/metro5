import {getGlobalObject} from "@metro5/utils"
import $, {Query} from "./$"

const _global = getGlobalObject()

const __$ = _global.$
const __Query = _global.Query

_global.m4q = $

$.global = () => {
    _global.$ = $
    _global.Query = Query
}

$.noConflict = () => {
    _global.$ = __$
    _global.Query = __Query
}

$.global()