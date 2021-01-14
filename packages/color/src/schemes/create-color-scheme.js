import analogous from "./analogous";
import triadic from "./triadic";
import tetradic from "./tetradic";
import monochromatic from "./mono";
import complementary from "./complementary";
import doubleComplementary from "./double-complementary";
import splitComplementary from "./split-complementary";
import square from "./square";
import schemeMaterial from "./material";

export default function createColorScheme(color, name, options){
    switch (name.toLowerCase()) {
        case "analogous":
        case "analog": return analogous(color, options);

        case "triadic":
        case "triad": return triadic(color, options);

        case "tetradic":
        case "tetra": return tetradic(color, options);

        case "monochromatic":
        case "mono": return monochromatic(color, options);

        case "complementary":
        case "complement":
        case "comp": return complementary(color, options);

        case "double-complementary":
        case "double-complement":
        case "double": return doubleComplementary(color, options);

        case "split-complementary":
        case "split-complement":
        case "split": return splitComplementary(color, options);

        case "square": return square(color, options);
        case "material": return schemeMaterial(color, options);
    }
}