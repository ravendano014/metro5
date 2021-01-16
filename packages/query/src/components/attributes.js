import {$} from "../query"
import {isNull, isPlainObject} from "@metro5/utils";
import {split} from "@metro5/cake";

const Attributes = {
    attr(name, val){
        const attributes = {};

        if (this.length === 0 && arguments.length === 0) {
            return this
        }

        if (this.length && arguments.length === 0) {
            $.each(this[0].attributes, (i, v) => {
                attributes[v.nodeName] = v.nodeValue;
            });
            return attributes;
        }

        if (arguments.length === 1 && typeof name === "string" && val !== null) {
            return this.length && this[0].nodeType === 1 && this[0].hasAttribute(name) ? this[0].getAttribute(name) : undefined;
        }

        if (typeof name === "string" && val === null) {
            return this.each((i, el) => {
                el.removeAttr(name)
            })
        }

        return this.each((i, el) => {
            if (isPlainObject(name)) {
                $.each(name, function(k, v){
                    el.setAttribute(k, v);
                });
            } else {
                el.setAttribute(name, val);
            }
        });
    },

    removeAttr(name){
        let attributes;

        if (isNull(name)) {
            return this.each((i, el) => {
                $.each(this.attributes, function(){
                    el.removeAttribute(this);
                });
            });
        }

        attributes = typeof name === "string" ? split(name, ",") : name;

        return this.each((i, el) => {
            $.each(attributes, (i, a) => {
                if (el.hasAttribute(a)) el.removeAttribute(a);
            });
        });
    },

    toggleAttr(name, val){
        return this.each((i, el) => {

            if (isNull(val)) {
                el.removeAttribute(name);
            } else {
                el.setAttribute(name, val);
            }
        });
    },

    id(val){
        const el = $(this[0])
        return this.length ? isNull(val) ? el.attr("id") : el.attr("id", val) : undefined;
    }
}

export default Attributes