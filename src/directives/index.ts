import type { NodePath } from '@babel/core'
import type { JSXElement } from '@babel/types'
import ifRegister from './r-if'
import showRegister from './r-show'
import classRegister from './r-class'
import forRegister from './r-for'

export default (path: NodePath<JSXElement>) => {
  ifRegister(path)
  showRegister(path)
  classRegister(path)
  forRegister(path)
}
