import React from 'react'

const Test = () => {
  return (
    <>
      <div r-show={true}>show block 1</div>
      <div r-show={false}>show block 2</div>
      <div r-show={false} style={{ margin: 0 }}>
        show block 3
      </div>
      <div r-show={false} style={{ display: 'block' }}>
        show block 4
      </div>
    </>
  )
}

export default Test
