import React from 'react'

const Test = () => {
  const list = [
    {
      key: 1,
      value: '1',
    },
    {
      key: 2,
      value: '2',
    },
  ]
  return /*#__PURE__*/ React.createElement(
    React.Fragment,
    null,
    list.map((item) =>
      /*#__PURE__*/ React.createElement(
        'div',
        {
          key: item.key,
        },
        item.value
      )
    ),
    list.map((item, index) =>
      /*#__PURE__*/ React.createElement(
        'div',
        {
          key: item.key,
        },
        item.value,
        index
      )
    )
  )
}

export default Test
