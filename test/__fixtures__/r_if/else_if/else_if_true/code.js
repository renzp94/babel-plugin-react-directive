import React from 'react'

const Test = () => {
  return (
    <>
      <div r-if={false}>if case</div>
      <div r-else-if={true}>else-if case</div>
      <div r-else>else case</div>
    </>
  )
}

export default Test
