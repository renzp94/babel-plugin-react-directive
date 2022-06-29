import type { NodePath } from '@babel/core'
import type { JSXAttribute, JSXElement } from '@babel/types'
import { getDirectiveValue, getElementAttrs, hasDirective, removeDirectiveAttr } from './../utils'
import { DIRECTIVE } from '../constants'
import * as t from '@babel/types'

export default (path: NodePath<JSXElement>) => {
  const attrs = getElementAttrs(path) as JSXAttribute[]
  // 没有属性或者不存在r-class指令
  if (!attrs?.length || !hasDirective(attrs, DIRECTIVE.CLASS)) {
    return
  }

  const directiveValue = getDirectiveValue(attrs, DIRECTIVE.CLASS)
  let classNames: string | undefined = undefined
  // 如果是字符串，则直接使用
  if (typeof directiveValue === 'string') {
    classNames = directiveValue
  }
  // 对象或数组
  if (directiveValue instanceof Array) {
    classNames = directiveValue
      ?.map((item: any) => {
        // 如果当前是一个对象属性，则比较value是不是为真，为真则返回
        if (t.isObjectProperty(item)) {
          // 如果是基本类型
          if (t.isLiteral(item.value)) {
            return (item.value as any).value ? (item.key as any).name : undefined
          }

          return item.value ? (item.key as any).name : undefined
        }

        // 如果是字符串，则直接使用
        if (t.isStringLiteral(item)) {
          return item.value
        }

        // 如果是一个对象
        if (t.isObjectExpression(item)) {
          return item.properties
            ?.map((prop: any) => {
              // 如果是基本类型
              if (t.isLiteral(prop.value)) {
                return (prop.value as any).value ? prop.key.name : undefined
              }

              return prop.key.name
            })
            ?.filter((item) => !!item)
            ?.join(' ')
        }

        return item
      })
      // 过滤掉undefined
      ?.filter((item) => !!item)
      ?.join(' ')
  }

  if (classNames) {
    // // 获取className的下标
    const classNameTarget: any = attrs?.find((item) => (item as any)?.name?.name === 'className')

    // 如果存在className
    if (classNameTarget && classNameTarget.value) {
      classNameTarget.value.value += ` ${classNames}`
    } else {
      const className = t.jsxIdentifier('className')
      const classValue = t.stringLiteral(classNames)
      const classAttr = t.jSXAttribute(className, classValue)
      attrs.push(classAttr)
    }
    path.node.openingElement.attributes = attrs
  }

  if (path?.node?.openingElement) {
    path.node.openingElement.attributes = removeDirectiveAttr(attrs, DIRECTIVE.CLASS)
  }
}
