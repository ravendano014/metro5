import defaultColorConfig from "./defines/default-color-config";
import f from "./functions";
import parse from "./helpers/parse";
import isColor from "./check/is-color";
import {each} from "@metro5/utils";
import colorTypes from "./defines/color-types";

const color = function (c, o){
    return new Color(c, o)
}

class Color {
    constructor(c, o) {
        this._options = Object.assign({}, defaultColorConfig, o)
        this._value = f.parse(c)

        if (!f.isColor(this._value)) {
            this._value = "#000000"
        }

        this._type = f.colorType(this._value)

        return this
    }

    toString(){
        return f.toString(this._value)
    }

    get value(){
        return this._value
    }

    set value(v){
        let _color = f.parse(v)
        if (f.isColor()) {
            this._value = _color
            this._type = f.colorType(this._value)
        }
    }

    get options(){
        return this._options
    }

    set options(o) {
        this._options = Object.assign({}, this._options, o)
    }

    rgb(){return f.toRGB(this._value)}
    rgba(alpha){return f.toRGBA(this._value, alpha)}
    hsv(){return f.toHSV(this._value)}
    hsl(){return f.toHSL(this._value)}
    hsla(alpha){return f.toHSLA(this._value, alpha)}
    cmyk(){return f.toCMYK(this._value)}

    toRGB(){
        this._value = f.toRGB(this._value)
        this._type = colorTypes.RGB
        return this
    }

    toRGBA(alpha){
        this._value = f.toRGBA(this._value, alpha)
        this._type = colorTypes.RGBA
        return this
    }

    toHSV(){
        this._value = f.toHSV(this._value)
        this._type = colorTypes.HSV
        return this
    }

    toHSL(){
        this._value = f.toHSL(this._value)
        this._type = colorTypes.HSL
        return this
    }

    toHSLA(alpha){
        this._value = f.toHSLA(this._value, alpha)
        this._type = colorTypes.HSLA
        return this
    }

    toCMYK(){
        this._value = f.toCMYK(this._value)
        this._type = colorTypes.CMYK
        return this
    }

    toHEX(){
        this._value = f.toHEX(this._value)
        this._type = colorTypes.HEX
        return this
    }

    channel(ch, val){
        let currentType = this._type
        let alpha = this._value.a

        if (ch === "alpha" && this._value.a) {
            this._value.a = val;
        } else {
            if (["red", "green", "blue"].includes(ch)) {
                this.toRGB();
                this._value[ch[0]] = val;
            }
            if (["hue", "saturation", "value"].includes(ch)) {
                this.toHSV();
                this._value[ch[0]] = val;
            }
            if (["lightness"].includes(ch)) {
                this.toHSL();
                this._value[ch[0]] = val;
            }
            if (["cyan", "magenta", "yellow", "black"].includes(ch)) {
                this.toCMYK();
                this._value[ch[0]] = val;
            }
            this._value = f.toColor(this._value, currentType, alpha)
        }

        return this;
    }

    channels(obj){
        each(obj, (key, val) => {
            this.channel(key, val);
        });

        return this;
    }

    darken(amount){
        return f.darken(this._value, amount)
    }

    toDarken(amount){
        this._value = f.darken(this._value, amount)
        return this
    }

    lighten(amount){
        return f.lighten(this._value, amount)
    }

    toLighten(amount){
        this._value = f.lighten(this._value, amount)
        return this
    }

    brighten(amount){
        return f.brighten(this._value, amount)
    }

    toBrighten(amount){
        this._value = f.brighten(this._value, amount)
        return this
    }

    grayscale(){
        return f.grayscale(this._value)
    }

    toGrayscale(){
        this._value = f.grayscale(this._value)
        return this
    }

    saturate(amount){
        return f.saturate(this._value, amount)
    }

    toSaturate(amount){
        this._value = f.saturate(this._value, amount)
        return this
    }

    desaturate(amount){
        return f.desaturate(this._value, amount)
    }

    toDesaturate(amount){
        this._value = f.desaturate(this._value, amount)
        return this
    }

    shade(amount){
        return f.shade(this._value, amount)
    }

    toShade(amount){
        this._value = f.shade(this._value, amount)
        return this
    }

    spin(amount){
        return f.spin(this._value, amount)
    }

    toSpin(amount){
        this._value = f.spin(this._value, amount)
        return this
    }

    mix(color, amount){
        return f.mix(this._value, color, amount)
    }

    toMix(color, amount){
        this._value = f.mix(this._value, color, amount)
        return this
    }

    add(color, type){
        return f.add(this._value, color, type || this._type)
    }

    toAdd(color){
        this._value = f.add(this._value, color, this._type)
        return this
    }

    multiple(color){
        return f.multiply(this._value, color)
    }

    toMultiply(color){
        this._value = f.multiply(this._value, color)
        return this
    }

    websafe(){
        return f.websafe(this._value)
    }

    toWebsafe(){
        this._value = f.websafe(this._value)
        return this
    }
}

Color.from = (val) => {
    let _color = parse(val)

    if (!isColor(_color)) {
        throw new Error("Unknown color format!")
    }

    return color(_color)
}

export {
    Color, color
}