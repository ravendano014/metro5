import defaultColorConfig from "./defines/default-color-config";
import colorTypes from "./defines/color-types";
import defaultPalette from "./palettes/default";
import metroPalette from "./palettes/metro";

import CMYK from "./primitives/cmyk";
import HSL from "./primitives/hsl";
import HSLA from "./primitives/hsla";
import HSV from "./primitives/hsv";
import RGBA from "./primitives/rgba";
import RGB from "./primitives/rgb";

import colorValue from "./helpers/color-value";
import colorType from "./helpers/color-type";
import colors from "./helpers/colors";
import createColor from "./helpers/create-color";
import expandHexColor from "./helpers/expand-hex";
import palette from "./helpers/palette";
import parse from "./helpers/parse";
import randomColor from "./helpers/random-color";
import toString from "./helpers/to-string";

import isColor from "./check/is-color";
import isCMYK from "./check/is-cmyk";
import isHSLA from "./check/is-hsla";
import isRGBA from "./check/is-rgba";
import isHEX from "./check/is-hex";
import isHSL from "./check/is-hsl";
import isHSV from "./check/is-hsv";
import isRGB from "./check/is-rgb";
import isDark from "./check/is-dark";
import isLight from "./check/is-light";
import equal from "./compare/equal";
import add from "./convert/add";
import brighten from "./convert/brighten";
import cmyk2rgb from "./convert/cmyk-to-rgb";
import cmyk2websafe from "./convert/cmyk-to-websafe";
import darken from "./convert/darken";
import desaturate from "./convert/desaturate";
import grayscale from "./convert/grayscale";
import hex2hsv from "./convert/hex-to-hsv";
import hex2rgb from "./convert/hex-to-rgb";
import hex2websafe from "./convert/hex-to-websafe";
import hsl2hsv from "./convert/hsl-to-hsv";
import hsl2websafe from "./convert/hsl-to-websafe";
import hsv2hex from "./convert/hsv-to-hex";
import hsv2hsl from "./convert/hsv-to-hsl";
import hsv2rgb from "./convert/hsv-to-rgb";
import hsv2websafe from "./convert/hsv-to-websafe";
import hueShift from "./convert/hue-shift";
import lighten from "./convert/lighten";
import mix from "./convert/mix";
import multiply from "./convert/multiply";
import rgb2cmyk from "./convert/rgb-to-cmyk";
import rgb2hex from "./convert/rgb-to-hex";
import rgb2hsv from "./convert/rgb-to-hsv";
import rgb2websafe from "./convert/rgb-to-websafe";
import saturate from "./convert/saturate";
import shade from "./convert/shade";
import spin from "./convert/spin";
import toColor from "./convert/to-color";
import toRGBA from "./convert/to-rgba";
import toHSL from "./convert/to-hsl";
import toHSV from "./convert/to-hsv";
import toRGB from "./convert/to-rgb";
import toHSLA from "./convert/to-hsla";
import toHEX from "./convert/to-hex";
import toCMYK from "./convert/to-cmyk";
import websafe from "./convert/websafe";

import analogous from "./schemes/analogous";
import complementary from "./schemes/complementary";
import doubleComplementary from "./schemes/double-complementary";
import splitComplementary from "./schemes/split-complementary";
import schemeMaterial from "./schemes/material";
import monochromatic from "./schemes/mono";
import square from "./schemes/square";
import tetradic from "./schemes/tetradic";
import triadic from "./schemes/triadic";
import createColorScheme from "./schemes/create-color-scheme";

export default {
    defaultColorConfig,
    defaultPalette,
    metroPalette,
    colorTypes,

    CMYK,
    HSL,
    HSLA,
    HSV,
    RGB,
    RGBA,

    colorValue,
    colorType,
    colors,
    createColor,
    expandHexColor,
    palette,
    parse,
    randomColor,
    toString,

    isColor,
    isCMYK,
    isHSV,
    isLight,
    isDark,
    isRGB,
    isHSL,
    isHEX,
    isRGBA,
    isHSLA,
    equal,
    add,
    brighten,
    cmyk2websafe,
    cmyk2rgb,
    darken,
    desaturate,
    grayscale,
    hex2websafe,
    hex2rgb,
    hex2hsv,
    hsl2hsv,
    hsl2websafe,
    hsv2websafe,
    hsv2rgb,
    hsv2hsl,
    hsv2hex,
    hueShift,
    lighten,
    mix,
    multiply,
    rgb2websafe,
    rgb2hsv,
    rgb2hex,
    rgb2cmyk,
    saturate,
    shade,
    spin,
    toColor,
    toCMYK,
    toHEX,
    toHSLA,
    toRGB,
    toHSV,
    toHSL,
    toRGBA,
    websafe,

    analogous,
    complementary,
    doubleComplementary,
    splitComplementary,
    schemeMaterial,
    monochromatic,
    square,
    tetradic,
    triadic,
    createColorScheme
}