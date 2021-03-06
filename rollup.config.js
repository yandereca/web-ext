import ts from '@wessberg/rollup-plugin-ts'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import pkg from './package.json'
import eslint from '@rollup/plugin-eslint'
import replace from '@rollup/plugin-replace'
import { builtinModules } from 'module'

const external = [
  ...builtinModules,
  // ...(pkg.dependencies == null ? [] : Object.keys(pkg.dependencies)),
  ...(pkg.devDependencies == null ? [] : Object.keys(pkg.devDependencies)),
  // ...(pkg.peerDependencies == null ? [] : Object.keys(pkg.peerDependencies)),
]

const globals = {
  'jwt-decode': 'decode',
  axios: 'axios',
}

export default [
  {
    input: 'src/background/background.ts',
    output: [
      {
        file: 'dist/background/background.js',
        format: 'iife',
        name: 'YandereBackground',
        sourcemap: true,
        globals,
      },
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
        preventAssignment: true,
      }),
      eslint(),
      resolve(),
      ts(),
    ],
    external,
  },
  {
    input: 'src/twitter/twitter.ts',
    output: [
      {
        file: 'dist/twitter/twitter.js',
        format: 'iife',
        name: 'Yanderetter',
        sourcemap: true,
        globals,
      },
    ],
    plugins: [eslint(), ts()],
    external,
  },
  {
    input: 'src/instagram/instagram.ts',
    output: [
      {
        file: 'dist/instagram/yanderegram.js',
        format: 'iife',
        name: 'Yanderegram',
        sourcemap: true,
        globals,
      },
    ],
    plugins: [eslint(), ts()],
    external,
  },
  {
    input: 'src/youtube/youtube.ts',
    output: [
      {
        file: 'dist/youtube/youtube.js',
        format: 'iife',
        name: 'Yanderegram',
        sourcemap: true,
        globals,
      },
    ],
    plugins: [eslint(), ts()],
    external,
  },
  {
    input: 'src/common/common.ts',
    output: [
      {
        file: 'dist/common/common.js',
        format: 'iife',
        name: 'YandereCommon',
        sourcemap: true,
        globals,
      },
    ],
    plugins: [eslint(), ts()],
    external,
  },
  {
    input: 'src/ui/ui.tsx',
    output: [
      {
        file: 'dist/ui/ui.js',
        format: 'iife',
        sourcemap: true,
        globals,
      },
    ],
    plugins: [
      eslint(),
      resolve({
        extensions: ['.js'],
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        preventAssignment: true,
      }),
      ts(),
      babel({
        presets: ['@babel/preset-react'],
        plugins: ['babel-plugin-styled-components'],
        babelHelpers: 'bundled',
      }),
      commonjs(),
    ],
  },
]
