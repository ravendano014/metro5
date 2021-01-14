import defaultPalette from "../palettes/default"
import metroPalette from "../palettes/metro"

export default function colors(from = "metro"){
    const palette = from.toLowerCase() === "metro" ? metroPalette : defaultPalette
    return Object.values( palette ) ;
}