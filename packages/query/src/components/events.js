import Query from "../class"
import $ from "../$"
import {each, isNull} from "@metro5/utils";
import {camelCase, split} from "@metro5/cake";

$.events = []
$.eventHooks = {}
$.eventUID = -1

$.ready = (fn, op = false) => $.document.on('DOMContentLoaded', fn, op)
$.load = (fn, op = false) => $.window.on("load", fn, op)
$.unload = (fn, op) => $.window.on("unload", fn, op)
$.beforeunload = (fn, op) => {
    let _fn = typeof fn === "string" ? function(e){e.returnValue = fn; return fn;} : fn;
    return $.window.on("beforeunload", _fn, op);
}

/*
* el, eventName, handler, selector, ns, id, options
* */
$.setEventHandler = (obj) => {
    let freeIndex = -1, eventObj, resultIndex;
    if ($.events.length > 0) {
        for(let i = 0; i < $.events.length; i++) {
            if ($.events[i].handler === null) {
                freeIndex = i;
                break;
            }
        }
    }

    eventObj = {
        element: obj.el,
        event: obj.event,
        handler: obj.handler,
        selector: obj.selector,
        ns: obj.ns,
        id: obj.id,
        options: obj.options
    };

    if (freeIndex === -1) {
        $.events.push(eventObj);
        resultIndex = $.events.length - 1;
    } else {
        $.events[freeIndex] = eventObj;
        resultIndex = freeIndex;
    }

    return resultIndex;
}

$.getEventHandler = (index) => {
    if (!isNull($.events[index])) {
        $.events[index] = null;
        return $.events[index].handler;
    }
    return undefined;
}

$.off = () => {
    each($.events, (i, v) => {
        v.element.removeEventListener(v.event, v.handler, true)
    })
    $.events = []
}

$.getEvents = () => $.events
$.getEventHooks = () => $.eventHooks

$.addEventHook = (event, handler, type = "before") => {
    each(split(event, ","), (i, v) => {
        v.eventHooks[camelCase(type+"-" + v)] = handler
    })
}

$.removeEventHook = (event, type = "before") => {
    each(split(event, ","), (i, v) => {
        delete v.eventHooks[camelCase(type+"-"+v)]
    })
}

$.removeEventHooks = (event) => {
    if (isNull(event)) {
        $.eventHooks = {}
    } else {
        each(split(event, ","), (i, v) => {
            delete $.eventHooks[camelCase("before-"+v)]
            delete $.eventHooks[camelCase("after-"+v)]
        })
    }
}

const Events = {

}

export default Events