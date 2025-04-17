import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    resolve(),
    babel({
      exclude: '**/node_modules/**',
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env', '@babel/preset-react'],
    }),
    commonjs(),
    postcss({
      extract: false,
      modules: true,
      use: ['sass'],
    }),
    terser(),
  ],
  external: ['react', 'react-dom', 'antd', '@ant-design/icons'],
}