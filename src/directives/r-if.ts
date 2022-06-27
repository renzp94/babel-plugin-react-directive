import type { NodePath } from '@babel/core'
import type { JSXElement } from '@babel/types'
import { getDirectiveValue, getElementAttrs, hasDirective, removeDirectiveAttr } from './../utils'
import { DIRECTIVE } from '../constants'

const directiveQueue: Array<{ key: DIRECTIVE; value: true | false | undefined }> = []

const prevDirectiveValidator = () => {
  const index = directiveQueue.length - 1
  if (
    // 队列中至少要有一个
    directiveQueue.length < 1 ||
    // 上一个指令要是r-if或r-else-if
    (directiveQueue[index].key !== DIRECTIVE.IF && directiveQueue[index].key !== DIRECTIVE.ELSE_IF)
  ) {
    throw new Error('r-else指令需要配合r-if或r-else-if使用')
  }
}

export default (path: NodePath<JSXElement>) => {
  const attrs = getElementAttrs(path)
  // 没有属性
  if (!attrs?.length) {
    return
  }

  let directiveName: DIRECTIVE | undefined

  // r-if指令
  if (hasDirective(attrs, DIRECTIVE.IF)) {
    directiveName = DIRECTIVE.IF
  }

  // r-else-if指令
  if (hasDirective(attrs, DIRECTIVE.ELSE_IF)) {
    prevDirectiveValidator()
    directiveName = DIRECTIVE.ELSE_IF
  }

  // r-else指令
  if (hasDirective(attrs, DIRECTIVE.ELSE)) {
    prevDirectiveValidator()
    directiveName = DIRECTIVE.ELSE
  }

  if (directiveName) {
    let directiveValue = getDirectiveValue(attrs, directiveName)
    // 获取队列最后一个指令
    const prevDirective = directiveQueue[directiveQueue.length - 1]
    directiveQueue.push({ key: directiveName, value: directiveValue })

    // r-else-if
    if (directiveName === DIRECTIVE.ELSE_IF) {
      // 如果上一个条件值为假且当前指令为真，则移除r-else-if元素
      directiveValue = !prevDirective?.value && directiveValue
    }

    if (directiveName === DIRECTIVE.ELSE) {
      // 如果上一个条件值为真，则移除r-else元素
      directiveValue = !prevDirective?.value
    }

    // 为真移除元素上的指令，否则移除整个元素
    if (directiveValue) {
      path.node.openingElement.attributes = removeDirectiveAttr(attrs, directiveName)
    } else {
      path.remove()
    }
  }
}
