import React from 'react'
import { Typography } from 'antd'
import StudentForm from '../../components/StudentForm'

export default function add() {
  return (
    <div>
      <Typography.Title level={4} style={{marginLeft: "15px", textAlign: 'center'}}>添加学生</Typography.Title>
      <StudentForm initialValues={{ sex: 0 }} />
    </div>
  )
}
