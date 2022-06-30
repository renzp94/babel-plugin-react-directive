/* eslint-disable no-undef */
import React from 'react'

const Test = () => {
  const list = [
    {
      key: 1,
      value: '1',
    },
    {
      key: 2,
      value: '2',
    },
  ]
  return (
    <>
      <div r-for={item in list} key={item.key}>
        {item.value}
      </div>
      <div r-for={(item, index) in list} key={item.key}>
        {item.value}
        {index}
      </div>
    </>
  )
}

export default Test
