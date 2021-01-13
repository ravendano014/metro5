import babel from 'rollup-plugin-babel';
import banner from '../banner';

import { DIST_UNIVERSAL, SRC } from '../const';

export default {
    input: `${SRC}/index.js`,
    plugins: [
        babel({
            exclude: 'node_modules/**'
        })
    ],
    output: {
        file: `${DIST_UNIVERSAL}/animation.js`,
        format: 'iife',
        name: '__animation',
        sourcemap: false,
        banner: banner,
    },
};