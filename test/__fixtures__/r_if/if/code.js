import React from 'react'

const Test = () => {
  return (
    <>
      <div r-if={true}>block 1</div>
      <div r-if={false}>block 2</div>
    </>
  )
}

export default Test
