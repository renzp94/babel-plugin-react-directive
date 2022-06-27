import React from 'react'

const Test = () => {
  return (
    <div r-if={true}>
      <div r-if={false}>if</div>
      <div r-else-if={true}>else-if</div>
      <div r-else>else</div>
    </div>
  )
}

export default Test
