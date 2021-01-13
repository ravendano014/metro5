import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from "rollup-plugin-commonjs";
import banner from '../banner';

import { DIST_UNIVERSAL, SRC } from '../const';

export default {
    input: `${SRC}/index.js`,
    output: {
        file: `${DIST_UNIVERSAL}/utils.js`,
        format: 'iife',
        name: 'm5_utils',
        sourcemap: false,
        banner: banner,
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        resolve(),
        commonjs()
    ],
};