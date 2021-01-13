import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import banner from '../banner';

import { DIST_MODULE_ES, SRC, PACKAGE_NAME } from '../const';

export default {
    input: `${SRC}/index.js`,
    output: {
        file: `${DIST_MODULE_ES}/index.js`,
        format: 'es',
        name: PACKAGE_NAME,
        sourcemap: false,
        banner: banner,
        exports: 'named'
    },
    plugins: [
        babel(),
        resolve(),
        commonjs()
    ],
};