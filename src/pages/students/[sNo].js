import React, {useState, useEffect} from 'react'
import { Typography } from 'antd'
import StudentForm from '../../components/StudentForm'
import api from '../../services'

export default function detail({match}) {
  const [formValues, setFormValues] = useState();

  useEffect(() => {
    const { sNo } = match.params;
    api.getStudentBySNo(sNo).then(values => {
      setFormValues(values);
    });
  }, []);

  return (
    <>
      <Typography.Title level={4} style={{marginLeft: "15px", textAlign: 'center'}}>修改学生信息</Typography.Title>
      {formValues && <StudentForm initialValues={formValues} isEdit={true} />}
    </>
  )
}
