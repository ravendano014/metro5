import {getGlobalObject} from "@metro5/utils"
import f from "./functions"

const _global = getGlobalObject();

_global.Animation = f;
