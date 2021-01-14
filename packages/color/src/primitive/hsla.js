const HSLA = function(h = 0, s = 0, l = 0, a = 1) {
    this.h = h
    this.s = s
    this.l = l
    this.a = a
}

HSLA.prototype.toString = function(){
    return `hsl(${Math.round(this.h)}, ${Math.round(this.s*100)}%, ${Math.round(this.l*100)}%, ${this.a})`
}

export default HSLA