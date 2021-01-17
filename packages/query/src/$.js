import Query from "./query";
import {each, isEmpty, isNull, matches, merge} from "@metro5/utils";
import Dataset from "./dataset";
import {dataSet} from "./components/dataset";
import {camelCase, split} from "@metro5/cake";
import createScript from "./helpers/create-script";

const $ = function(sel, ctx){
    return new Query(sel, ctx)
}

$.merge = merge
$.each = each
$.matches = matches

$.meta = (name) => !name ? $("meta") : $("meta[name='$name']".replace("$name", name))
$.metaBy = (name) => !name ? $("meta") : $("meta[$name]".replace("$name", name))
$.html = $('html')
$.doctype = $("doctype")
$.head = $('head')
$.body = $('body')
$.document = $('document')
$.window = $('window')
$.charset = (val) => {
    const meta = $("meta[charset]");
    if (val) {
        meta.attr("charset", val);
    }
    return meta.attr("charset");
}

$.proxy = (fn, ctx) => typeof fn !== "function" ? undefined : fn.bind(ctx)
$.bind = $.proxy

$.noop = () => {}
$.noop_true = () => true
$.noop_false = () => false

// Dataset
$.hasData = (elem) => dataSet.hasData(elem)
$.data = (elem, key, val) => dataSet.access(elem, key, val)
$.removeData = (elem, key) => dataSet.remove(elem, key)
$.dataSet = (ns) => {
    if (isNull(ns) || isEmpty(ns)) return dataSet;
    if (['METRO5'].includes(ns.toUpperCase())) {
        throw Error("You can not use reserved name for your dataset");
    }
    return new Dataset(ns);
}

// Events
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

// Script
$.script = (el) => {
    if (isNull(el)) {
        return ;
    }

    const _el = $(el)[0];

    if (_el.tagName && _el.tagName === "SCRIPT") {
        createScript(_el);
    } else each($(_el).find("script"), (i, v) => {
        createScript(v);
    });
}

export default $
export {
    Query
}