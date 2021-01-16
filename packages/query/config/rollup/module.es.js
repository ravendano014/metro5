import babel from 'rollup-plugin-babel';
import banner from '../banner';
import { DIST_MODULE_ES, SRC, PACKAGE_NAME } from '../const';
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
    input: `${SRC}/index.js`,
    output: {
        file: `${DIST_MODULE_ES}/index.js`,
        format: 'es',
        name: PACKAGE_NAME,
        sourcemap: false,
        banner: banner,
        exports: 'named',
    },
    plugins: [
        babel(),
        resolve(),
        commonjs()
    ],
    onwarn: function(warning, rollupWarn) {
        if (warning.code !== 'CIRCULAR_DEPENDENCY') {
            rollupWarn(warning);
        }
    }
};