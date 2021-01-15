import babel from 'rollup-plugin-babel';

import banner from '../banner';
import { DIST_UNIVERSAL, SRC } from '../const';
import {terser} from "rollup-plugin-terser";

export default {
    input: `${SRC}/index.js`,
    output: {
        file: `${DIST_UNIVERSAL}/utils.min.js`,
        format: 'iife',
        name: 'm5_utils',
        sourcemap: false,
        banner: banner,
    },
    plugins: [
        babel(),
        terser({
            output: {
                comments: "all",
            },
        })
    ],
};