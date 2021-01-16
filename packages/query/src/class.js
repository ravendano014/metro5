import {defaultOptions} from "./helpers/const"
import {UID, isArrayLike, each, isPlainObject} from "@metro5/utils"
import {split} from "@metro5/cake"
import $ from "./$"
import Attributes from './components/attributes'
import Script from "./components/script"
import Events from "./components/events"

export default class Query extends Array {
    constructor(sel, ctx, opt) {
        super();

        this._selector = sel
        this._context = ctx
        this._options = Object.assign({}, defaultOptions, opt)
        this._uid = UID(this._options.uid)
        this._timestamp = +new Date()
        this._prevObj = this._options.prevObj

        this.init()
    }

    get uid(){return this._uid}
    get timestamp(){return this._timestamp}
    get prevObj(){return this._prevObj}
    get selector(){return this._selector}
    get context(){return this._context}

    init(){
        const that = this
        let parsed, sel = this._selector, ctx = this._context

        if (typeof sel === "string") {
            sel = sel.trim();
        }

        if (!sel) {
            return this;
        }

        if (typeof sel === "function") {
            return $.ready(sel);
        }

        if (sel instanceof Element) {
            this.push(sel);
            return this;
        }

        if (isArrayLike(sel)) {
            each(sel, (i, el) => {
                if (isArrayLike(el)) {
                    each(el, (j, sub) => {
                        this.push(sub)
                    })
                } else
                    that.push(el);
            });
            return this;
        }

        if (sel === "window") sel = window;
        if (sel === "document") sel = document;
        if (sel === "body") sel = document.body;
        if (sel === "html") sel = document.documentElement;
        if (sel === "doctype") sel = document.doctype;
        if (sel && (sel.nodeType || sel.self === window)) {
            this.push(sel);
            return this;
        }

        if (typeof sel !== "string" && (sel.self && sel.self !== window)) {
            return this;
        }

        if (sel === "#" || sel === ".") {
            console.error("Selector can't be # or .") ;
            return this;
        }

        if (sel[0] === "@") {

            each($("[data-role]"), (i, v) => {
                let roles = split($(v).attr("data-role"), ",");
                if (roles.includes(sel.slice(1))) {
                    that.push(v);
                }
            });

        } else {

            parsed = $.parseHTML(sel);

            if (parsed.length === 1 && parsed[0].nodeType === 3) { // Must be a text node -> css sel
                try {
                    [].push.apply(this, document.querySelectorAll(sel));
                } catch (e) {
                    //console.error(sel + " is not a valid selector");
                }
            } else {
                $.merge(this, parsed);
            }
        }

        if (ctx !== undefined) {
            if (ctx instanceof $ || ctx instanceof Element) {
                this.each( (i, el) => {
                    $(ctx).append(el);
                });
            } else {
                if (isPlainObject(ctx)) {
                    $.each(this,(i, el) => {
                        $.each(ctx, (attr, val) => {
                            el.setAttribute(attr, val);
                        })
                    });
                }
            }
        }

        return this;
    }

    each(cb) {
        return each(this, cb)
    }
}

Query.use = function(...mixins){
    Object.assign(Query.prototype, ...mixins);
};

Query.use(Attributes, Script, Events)