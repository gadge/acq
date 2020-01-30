import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from 'rollup-plugin-babel'
import filesize from 'rollup-plugin-filesize'
import json from '@rollup/plugin-json'

const babelPluginOptions = {
  babelrc: false,
  comments: true,
  sourceMap: true,
  exclude: 'node_modules/**',
  plugins: [
    ['@babel/plugin-transform-runtime', { helpers: false, }],
    ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
    ['@babel/plugin-proposal-class-properties'],
    ['@babel/plugin-proposal-private-methods'],
    ['@babel/plugin-proposal-optional-chaining']
  ]
}

export const plugins = [
  nodeResolve({
    preferBuiltins: true
  }),
  commonjs({
    include: /node_modules/,
  }),
  babel(babelPluginOptions),
  json(),
  filesize()
]
