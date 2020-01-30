const { name, dependencies, main, module } = require(process.cwd() + '/package.json')

import { plugins } from './build/rollup.file'

console.log('EXECUTING', name, process.cwd())
console.log('Dependencies', dependencies)

export default [
  {
    input: 'index.js',
    external: Object.keys(dependencies || {}),
    output: [
      { file: main, format: 'cjs' },  // CommonJS (for Node) build.
      { file: module, format: 'esm' }  // ES module (for bundlers) build.
    ],
    plugins
  }
]
