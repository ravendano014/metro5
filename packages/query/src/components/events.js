import $ from "../$"
import {isEmpty, isPlainObject} from "@metro5/utils";
import {camelCase, split} from "@metro5/cake";
import normalizeName from "../helpers/normalise-name";

const overriddenStop =  Event.prototype.stopPropagation;
const overriddenPrevent =  Event.prototype.preventDefault;

Event.prototype.stopPropagation = function(){
    this.isPropagationStopped = true;
    overriddenStop.apply(this, arguments);
};
Event.prototype.preventDefault = function(){
    this.isPreventedDefault = true;
    overriddenPrevent.apply(this, arguments);
};

Event.prototype.stop = function(immediate){
    return immediate ? this.stopImmediatePropagation() : this.stopPropagation();
};

const Events = {
    on(eventsList, sel, handler, options){
        if (this.length === 0) {
            return ;
        }

        if (typeof sel === 'function') {
            options = handler;
            handler = sel;
            sel = undefined;
        }

        if (!isPlainObject(options)) {
            options = {};
        }

        return this.each((i, el) => {
            $.each(split(eventsList, " "), (k, ev) => {
                let h, event = ev.split("."),
                    name = normalizeName(event[0]),
                    ns = options.ns ? options.ns : event[1],
                    index, originEvent;

                $.eventUID++;

                h = (e) => {
                    const beforeHook = $.eventHooks[camelCase("before-"+name)];
                    const afterHook = $.eventHooks[camelCase("after-"+name)];
                    let target = e.target;

                    if (typeof beforeHook === "function") {
                        beforeHook.call(target, e);
                    }

                    if (!sel) {
                        handler.call(el, e);
                    } else {
                        while (target && target !== el) {
                            if (matches.call(target, sel)) {
                                handler.call(target, e);
                                if (e.isPropagationStopped) {
                                    e.stopImmediatePropagation();
                                    break;
                                }
                            }
                            target = target.parentNode;
                        }
                    }

                    if (typeof afterHook === "function") {
                        afterHook.call(target, e);
                    }

                    if (options.once) {
                        index = +$(el).origin( "event-"+e.type+(sel ? ":"+sel:"")+(ns ? ":"+ns:"") );
                        if (!isNaN(index)) $.events.splice(index, 1);
                    }
                };

                Object.defineProperty(h, "name", {
                    value: handler.name && handler.name !== "" ? handler.name : "func_event_"+name+"_"+$.eventUID
                });

                originEvent = name+(sel ? ":"+sel:"")+(ns ? ":"+ns:"");

                el.addEventListener(name, h, !isEmpty(options) ? options : false);

                index = $.setEventHandler({
                    el: el,
                    event: name,
                    handler: h,
                    selector: sel,
                    ns: ns,
                    id: $.eventUID,
                    options: !isEmpty(options) ? options : false
                });
                $(el).origin('event-'+originEvent, index);
            });
        });
    },

    one(events, sel, handler, options){
        if (!isPlainObject(options)) {
            options = {};
        }

        options.once = true;

        return this.on.apply(this, [events, sel, handler, options]);
    },

    off(eventsList, sel, options){

        if (isPlainObject(sel)) {
            options = sel;
            sel = null;
        }

        if (!isPlainObject(options)) {
            options = {};
        }

        if (!eventsList || eventsList.toLowerCase() === 'all') {
            return this.each((i, el) => {
                $.each($.events, (k, e) => {
                    if (e.element === el) {
                        el.removeEventListener(e.event, e.handler, e.options);
                        e.handler = null;
                        $(el).origin("event-"+name+(e.selector ? ":"+e.selector:"")+(e.ns ? ":"+e.ns:""), null);
                    }
                });
            });
        }

        return this.each((i, el) => {
            $.each(split(eventsList, " "), (k, e) => {
                let evMap = e.split("."),
                    name = normalizeName(evMap[0]),
                    ns = options.ns ? options.ns : evMap[1],
                    originEvent, index;

                originEvent = "event-"+name+(sel ? ":"+sel:"")+(ns ? ":"+ns:"");
                index = $(el).origin(originEvent);

                if (index !== undefined && $.events[index].handler) {
                    el.removeEventListener(name, $.events[index].handler, $.events[index].options);
                    $.events[index].handler = null;
                }

                $(el).origin(originEvent, null);
            });
        });
    },

    trigger(name, data){
        return this.fire(name, data);
    },

    fire(name, data){
        let _name, e;

        if (this.length === 0) {
            return ;
        }

        _name = normalizeName(name);

        if (['focus', 'blur'].includes(_name)) {
            this[0][_name]();
            return this;
        }

        e = new CustomEvent(_name, {
            bubbles: true,
            cancelable: true,
            detail: data
        });

        return this.each(function(){
            this.dispatchEvent(e);
        });
    },

    unload(fn){
        return (this.length && this[0].self === window) ? $.unload(fn) : undefined;
    },

    beforeunload(fn){
        return (this.length && this[0].self === window) ? $.beforeunload(fn) : undefined;
    },

    ready(fn){
        return (this.length && this[0] === document) ? $.ready(fn) : undefined
    }
}

const events = "blur focus resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu touchstart touchend touchmove touchcancel"

split(events, " ")
    .forEach(
        ( name ) => {
            Events[ name ] = ( sel, fn, opt ) => {
                return arguments.length > 0 ?
                    Events.on( name, sel, fn, opt ) :
                    Events.fire( name );
            };
        })

Events.hover = ( fnOver, fnOut ) => {
    return Events["mouseenter"]( fnOver )["mouseleave"]( fnOut || fnOver );
}

export default Events