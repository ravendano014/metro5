const RGBA = function(r = 0, g = 0, b = 0, a = 1) {
    this.r = r
    this.g = g
    this.b = b
    this.a = a
}

RGBA.prototype.toString = function(){
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
}

export default RGBA