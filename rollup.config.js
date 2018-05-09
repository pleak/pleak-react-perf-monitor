import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: {
    file: 'lib/index.js',
    format: 'cjs',
  },
  external: [
    'fbjs/lib/performanceNow',
    'uuid/v4',
    'isomorphic-fetch',
    'react-native',
    'react-native-web',
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    resolve(),
  ],
};
