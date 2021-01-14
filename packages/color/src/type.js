import defaultColorConfig from "./defines/default-color-config";
import f from "./functions";

export function color(c, o){
    return new Color(c, o)
}

export default class Color {
    constructor(c, o) {
        this.options = Object.assign({}, defaultColorConfig, o)
        this.value = f.parse(c)

        if (!f.isColor(this.value)) {
            throw new Error("Color constructor: Unknown color format!")
        }
    }

    from(color){
        let _color = f.parse(color)

    }
}