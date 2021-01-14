import defaultPalette from "../palettes/default"
import metroPalette from "../palettes/metro"

export default function palette(name) {
    return name.toLowerCase() === "metro" ? metroPalette : defaultPalette
}
