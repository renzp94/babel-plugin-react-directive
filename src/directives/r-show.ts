import type { NodePath } from '@babel/core'
import type { JSXElement } from '@babel/types'
import { getDirectiveValue, getElementAttrs, hasDirective, removeDirectiveAttr } from './../utils'
import { DIRECTIVE } from '../constants'
import * as t from '@babel/types'

export default (path: NodePath<JSXElement>) => {
  const attrs = getElementAttrs(path)
  // 没有属性或者不存在r-show指令
  if (!attrs?.length || !hasDirective(attrs, DIRECTIVE.SHOW)) {
    return
  }

  const directiveValue = getDirectiveValue(attrs, DIRECTIVE.SHOW)

  if (!directiveValue) {
    const hidden = t.objectProperty(t.identifier('display'), t.stringLiteral('none'))
    // 获取style的下标
    const index = attrs?.findIndex((item) => (item as any)?.name?.name === 'style')
    // 如果存在style
    if (index > -1) {
      const oldStyleValue = (attrs[index] as any)?.value
      if (oldStyleValue.expression) {
        // 过滤掉style中的display
        oldStyleValue.expression.properties = oldStyleValue.expression.properties.filter(
          (item: any) => item.key.name !== 'display'
        )
        oldStyleValue.expression.properties = [...oldStyleValue.expression.properties, hidden]
      }
    } else {
      const styleName = t.jsxIdentifier('style')
      const styleValue = t.jSXExpressionContainer(t.objectExpression([hidden]))
      const style = t.jSXAttribute(styleName, styleValue)
      attrs.push(style)
    }
    path.node.openingElement.attributes = attrs
  }

  if (path?.node?.openingElement) {
    path.node.openingElement.attributes = removeDirectiveAttr(attrs, DIRECTIVE.SHOW)
  }
}
