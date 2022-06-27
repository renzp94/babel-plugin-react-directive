import type { NodePath } from '@babel/core'
import type { JSXAttribute, JSXElement, JSXSpreadAttribute } from '@babel/types'
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
export const hasDirective = (
  attrs: Array<JSXAttribute | JSXSpreadAttribute>,
  directiveName: string
) => !!attrs?.find((item) => (item as JSXAttribute)?.name?.name === directiveName)
/**
 * 获取指令值
 * @param attrs 属性Node组
 * @param directiveName 指令名
 * @returns 找到则返回当前指令值，否则返回undefined
 */
export const getDirectiveValue = (
  attrs: Array<JSXAttribute | JSXSpreadAttribute>,
  directiveName: string
) => {
  const attr: any = attrs?.find((item) => (item as JSXAttribute)?.name?.name === directiveName)
  return attr === undefined ? attr : attr?.value?.expression?.value
}
/**
 * 移除指定指令属性
 * @param attrs 属性Node组
 * @param directiveName 指令名
 * @returns 返回一个没有指定指令的属性Node组
 */
export const removeDirectiveAttr = (
  attrs: Array<JSXAttribute | JSXSpreadAttribute>,
  directiveName: string
) => attrs.filter((item) => (item as JSXAttribute)?.name?.name !== directiveName)
