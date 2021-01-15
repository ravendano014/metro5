import isPlainObject from "./is-plain-object";
import each from "./each";

export default function parseHTML(data){
    const regexpSingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    let base, singleTag, result = [], ctx, body;

    if (typeof data !== "string") {
        return [];
    }

    data = data.trim();

    ctx = document.implementation.createHTMLDocument("");
    base = ctx.createElement( "base" );
    base.href = document.location.href;
    ctx.head.appendChild( base );
    body = ctx.body;

    singleTag = regexpSingleTag.exec(data);

    if (singleTag) {
        result.push(document.createElement(singleTag[1]));
    } else {
        body.innerHTML = data;
        for(let i = 0; i < body.childNodes.length; i++) {
            result.push(body.childNodes[i]);
        }
    }

    return result;
}