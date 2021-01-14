import defaultPalette from "../palettes/default"
import metroPalette from "../palettes/metro"

export default function color(name, palette, def = undefined) {
    return defaultPalette[name] ? defaultPalette[name] : metroPalette[name] ? metroPalette[name] : def;
}
