import type { NodePath } from '@babel/core'
import type { JSXAttribute, JSXElement } from '@babel/types'
import * as t from '@babel/types'

/**
 * 获取当前元素的属性
 * @param path 当前元素
 * @returns 返回属性数组
 */
export const getElementAttrs = (path: NodePath<JSXElement>) =>
  path?.node?.openingElement?.attributes
/**
 * 元素属性是否有指令
 * @param attrs 属性Node组
 * @param directiveName 指令名
 * @returns 有则返回true，否则返回false
 */
export const hasDirective = (attrs: Array<JSXAttribute>, directiveName: string) =>
  !!attrs?.find((item) => item?.name?.name === directiveName)
/**
 * 获取指令值
 * @param attrs 属性Node组
 * @param directiveName 指令名
 * @returns 找到则返回当前指令值，否则返回undefined
 */
export const getDirectiveValue = (attrs: Array<JSXAttribute>, directiveName: string) => {
  const attr = attrs?.find((item) => item?.name?.name === directiveName)
  if (attr) {
    if (t.isJSXExpressionContainer(attr.value)) {
      if (t.isObjectExpression(attr.value.expression)) {
        return attr.value.expression?.properties
      }

      if (t.isArrayExpression(attr.value.expression)) {
        return attr.value.expression.elements
      }

      if (t.isLiteral(attr.value.expression)) {
        return (attr.value.expression as any).value
      }

      return attr.value
    }

    if (t.isLiteral(attr.value)) {
      return attr.value.value
    }
  }

  return undefined
}
/**
 * 移除指定指令属性
 * @param attrs 属性Node组
 * @param directiveName 指令名
 * @returns 返回一个没有指定指令的属性Node组
 */
export const removeDirectiveAttr = (attrs: Array<JSXAttribute>, directiveName: string) =>
  attrs.filter((item) => item?.name?.name !== directiveName)
