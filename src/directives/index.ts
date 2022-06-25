import type { NodePath } from '@babel/core'
import type { JSXElement } from '@babel/types'
import ifRegister from './r-if'

export default (path: NodePath<JSXElement>) => {
  ifRegister(path)
}
