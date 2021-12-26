import React from 'react'

export default function detail(props) {
  return (
    <div>
      <p>学生详情页</p>
      <br />
      <p>学号：{props.match.params.id}</p>
    </div>
  )
}
