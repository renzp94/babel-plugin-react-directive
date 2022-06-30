import type { NodePath } from '@babel/core'
import type { JSXAttribute, JSXElement, SequenceExpression } from '@babel/types'
import { getDirectiveValue, getElementAttrs, hasDirective, removeDirectiveAttr } from './../utils'
import { DIRECTIVE } from '../constants'
import * as t from '@babel/types'

export default (path: NodePath<JSXElement>) => {
  const attrs = getElementAttrs(path) as JSXAttribute[]

  // 没有属性或者不存在r-for指令
  if (!attrs?.length || !hasDirective(attrs, DIRECTIVE.FOR)) {
    return
  }

  const directiveValue = getDirectiveValue(attrs, DIRECTIVE.FOR)

  if (t.isReturnStatement(path.parentPath)) {
    throw new Error('使用r-for指令的元素需要指定父元素')
  }

  if (
    // 未指定指令值
    !directiveValue ||
    // 不是一个jsx表达式
    !t.isJSXExpressionContainer(directiveValue) ||
    // 不是一个二元表达式
    !t.isBinaryExpression(directiveValue.expression) ||
    // 二元表达式左侧不是标识符
    (!t.isIdentifier(directiveValue.expression.left) &&
      // 并且不是序列表达式，例如：(item,index)
      !t.isSequenceExpression(directiveValue.expression.left) &&
      // 并且超过两个
      (directiveValue.expression.left as unknown as SequenceExpression)?.expressions?.length > 2) ||
    // 不是使用关键词in
    directiveValue.expression.operator !== 'in' ||
    // 二元表达式右侧不是标识符
    !t.isIdentifier(directiveValue.expression.right)
  ) {
    throw new Error(
      'r-for指令需要正确的值，例如：r-for={item in list}或者r-for={(item,index) in list}'
    )
  }
  const { left, right } = directiveValue.expression

  // 设置item表达式
  const itemExpression: any = t.isIdentifier(left)
    ? [left]
    : (left as SequenceExpression).expressions

  if (path?.node?.openingElement) {
    path.node.openingElement.attributes = removeDirectiveAttr(attrs, DIRECTIVE.FOR)
  }

  // 将指令内容转换为map
  const callExpression = t.callExpression(t.memberExpression(right, t.identifier('map')), [
    t.arrowFunctionExpression(itemExpression, { ...path.node }),
  ])

  const replacement = t.expressionStatement(callExpression)

  path.replaceWith(replacement)
}
