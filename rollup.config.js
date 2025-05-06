import fs from 'fs';
import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';

const extensions = ['.jsx', '.js', '.ts', '.tsx'];
const globalsMap = {
  'scheduler': 'Scheduler',
  react: 'React',
  'react-dom': 'ReactDOM',
  'react-dom/client': 'ReactDOMClient',
};
const external = ['scheduler', 'react', 'react-dom', 'react-dom/client'];

const options = {
  treeshake: true,
  plugins: [
    resolve({ extensions }),
    commonjs(),
    babel({
      presets: ['@babel/preset-react', '@babel/preset-typescript'],
      extensions,
      babelHelpers: 'bundled',
    }),
  ],
  external,
}

const convertDir = ([srcDir, outDir, ext = extensions[0]]) => {
  // Find all files in `srcDir` by `extensions[0]`
  const componentFiles = fs
    .readdirSync(srcDir)
    .filter(file => file.endsWith(ext));

    return componentFiles.map(file => {
    const name = path.parse(file).name;
    const inputPath = `${srcDir}/${file}`;
    const outputPath = `${outDir}/${name}.mjs`;

    return {
      input: inputPath,
      output: {
        file: outputPath,
        format: 'esm',
        exports: 'named',
        globals: globalsMap,
      },
      ...options
    };
  })
}

const convertFile = ([name, srcFile, outFile]) => {
  return {
    input: srcFile,
    output: {
      file: outFile,
      format: 'esm',
      name,
      globals: globalsMap
    },
    ...options
  }
}

const NODE_ENV = true ? 'development' : 'production';
// Generate one config per file
export default [
  convertFile(['scheduler', `node_modules/scheduler/cjs/scheduler.${NODE_ENV}.js`, 'dist/libs/scheduler.mjs']),
  convertFile(['react', `node_modules/react/cjs/react.${NODE_ENV}.js`, 'dist/libs/react.mjs']),
  convertFile(['react-dom', `node_modules/react-dom/cjs/react-dom.${NODE_ENV}.js`, 'dist/libs/react-dom.mjs']),
  convertFile(['react-dom/client', `node_modules/react-dom/cjs/react-dom-client.${NODE_ENV}.js`, 'dist/libs/react-dom-client.mjs']),
  ...convertDir([
    'src/components',
    'dist/components',
  ]),
  ...convertDir([
    'src/components/ui',
    'dist/components/ui',
    '.tsx'
  ]),
];
