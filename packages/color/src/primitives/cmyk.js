function CMYK(c = 0, m = 0, y = 0, k = 0){
    this.c = c;
    this.m = m;
    this.y = y;
    this.k = k;
}

CMYK.prototype.toString = function(){
    return `"cmyk(${this.c}, ${this.m}, ${this.y}, ${this.k})`
}

export default CMYK