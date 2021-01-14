import parse from "./parse";

export default function isHEX(color){
    return typeof color === "string" && /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(parse(color));
}