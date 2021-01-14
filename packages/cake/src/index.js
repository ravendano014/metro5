import functions from "./functions"
import Cake, {cake} from "./type"
import {getGlobalObject} from "@metro5/utils"

const _global = getGlobalObject()

if (typeof _global !== "undefined") {
    _global.cake = cake;
    _global.Cake = {
        ...functions
    };
}

export default Cake;
export const CakeNS = {
    ...functions,
    cake
}
