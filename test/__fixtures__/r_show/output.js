import React from 'react'

const Test = () => {
  return /*#__PURE__*/ React.createElement(
    React.Fragment,
    null,
    /*#__PURE__*/ React.createElement('div', null, 'show block 1'),
    /*#__PURE__*/ React.createElement(
      'div',
      {
        style: {
          display: 'none',
        },
      },
      'show block 2'
    ),
    /*#__PURE__*/ React.createElement(
      'div',
      {
        style: {
          margin: 0,
          display: 'none',
        },
      },
      'show block 3'
    ),
    /*#__PURE__*/ React.createElement(
      'div',
      {
        style: {
          display: 'none',
        },
      },
      'show block 4'
    )
  )
}

export default Test
