const HSV = function(h = 0, s = 0, v = 0) {
    this.h = h
    this.s = s
    this.v = v
}

HSV.prototype.toString = function(){
    return `hsv(${Math.round(this.h)}, ${Math.round(this.s*100)}%, ${Math.round(this.v*100)}%)`
}

export default HSV