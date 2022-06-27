import React from 'react'

const Test = () => {
  return (
    <>
      <div r-if={true}>if block 1</div>
      <div r-else-if={false}>else-if block 1</div>
      <div r-if={false}>if block 2</div>
      <div r-else-if={true}>else-if block 2</div>
      <div r-if={false}>if block 3</div>
      <div r-else-if={false}>else-if block 3</div>
      <div r-else>else block 3</div>
      <div r-if={false}>if block 4</div>
      <div r-else-if={false}>else-if block 4 false</div>
      <div r-else-if={true}>else-if block 4 true</div>
    </>
  )
}

export default Test
