import Datetime, {datetime} from "./type"
import {getGlobalObject} from "@metro5/utils"
import "./plugins"

const _global = getGlobalObject()

_global.Datetime = Datetime
_global.datetime = datetime