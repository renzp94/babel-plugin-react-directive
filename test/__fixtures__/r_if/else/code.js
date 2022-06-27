import React from 'react'

const Test = () => {
  return (
    <>
      <div r-if={true}>if block 1</div>
      <div r-else>else block 1</div>
      <div r-if={false}>if block 2</div>
      <div r-else>else block 2</div>
    </>
  )
}

export default Test
