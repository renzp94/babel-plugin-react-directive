import pluginTester from 'babel-plugin-tester'
import plugin from '../src'
import path from 'path'

pluginTester({
  plugin,
  babelOptions: require('./babel.config.js'),
  pluginName: 'react-directive',
  title: 'react-directive',
  snapshot: true,
  fixtures: path.join(__dirname, '__fixtures__'),
})
