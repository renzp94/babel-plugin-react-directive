import React from 'react'

const Test = () => {
  return /*#__PURE__*/ React.createElement(
    React.Fragment,
    null,
    /*#__PURE__*/ React.createElement(
      'div',
      {
        className: 'defaultTest',
      },
      'block'
    ),
    /*#__PURE__*/ React.createElement(
      'div',
      {
        className: 'defaultTest defaultTest1 test test1 test3',
      },
      'block'
    ),
    /*#__PURE__*/ React.createElement(
      'div',
      {
        className: 'defaultTest test test1 test3',
      },
      'block'
    )
  )
}

export default Test
