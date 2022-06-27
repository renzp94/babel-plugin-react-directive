import React from 'react'

const Test = () => {
  return /*#__PURE__*/ React.createElement(
    React.Fragment,
    null,
    /*#__PURE__*/ React.createElement('div', null, 'if block 1'),
    /*#__PURE__*/ React.createElement('div', null, 'else-if block 2'),
    /*#__PURE__*/ React.createElement('div', null, 'else block 3'),
    /*#__PURE__*/ React.createElement('div', null, 'else-if block 4 true')
  )
}

export default Test
