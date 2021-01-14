const RGB = function(r = 0, g = 0, b = 0) {
    this.r = r
    this.g = g
    this.b = b
}

RGB.prototype.toString = function(){
    return `rgb(${this.r}, ${this.g}, ${this.b})`
}

export default RGB