import type { NodePath } from '@babel/core'
import type { JSXElement } from '@babel/types'
import { getDirectiveValue, getElementAttrs, removeDirectiveAttr } from './../utils'
import { DIRECTIVE } from '../constants'

export default (path: NodePath<JSXElement>) => {
  const attrs = getElementAttrs(path)
  const value = getDirectiveValue(attrs, DIRECTIVE.IF)

  // 未找到r-if指令
  if (value === undefined) {
    return
  }

  // 为真移除元素上的指令，否则移除整个元素
  if (value) {
    path.node.openingElement.attributes = removeDirectiveAttr(attrs, DIRECTIVE.IF)
  } else {
    path.remove()
  }
}
