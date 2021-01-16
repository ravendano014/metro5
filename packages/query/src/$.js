import Query from "./query";
import {each, matches, merge} from "@metro5/utils";

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


export default $
