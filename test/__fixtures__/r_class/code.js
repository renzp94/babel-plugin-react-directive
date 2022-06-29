import React from 'react'

const Test = () => {
  return (
    <>
      <div r-class="defaultTest">block</div>
      <div
        r-class={{ test: true, test1: 1, test2: false, test3: { test: 1 } }}
        className="defaultTest defaultTest1"
      >
        block
      </div>
      <div r-class={['defaultTest', { test: true, test1: 1, test2: false, test3: { test: 1 } }]}>
        block
      </div>
    </>
  )
}

export default Test
