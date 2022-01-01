import React, { useState, useRef } from 'react'
import style from './index.css'
import { Spin, Form, Input, Radio, Button, Select, Space, message } from 'antd';
import api from '../../services';
import { history } from 'umi'

export default function StudentForm(props) {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();

  const onFinish = async (values) => {
    setIsLoading(true);
    let resp;
    if (props.isEdit) {
      resp = await api.updateStudents(values);
    } else {
      resp = await api.addStudents(values);
    }
    setIsLoading(false);
    if (resp.status === 'success') {
      message.success(`${resp.msg}`, 1);
      if (props.isEdit) {
        history.push('/students'); //修改成功后：跳转到“学生查询”页
      } else {
        formRef.current.resetFields(); //提交成功后：重置当前表单
      }
    } else {
      message.error(`添加失败：${resp.msg}`, 1);
    }
  };

  const renderOptions = () => {
    const options = [];
    for (let i = 1990; i <= 2020; i++) {
      options.push(<Select.Option key={i} value={i}>{i}</Select.Option>);
    }
    return options;
  }

  return (
    <div className={style.formWrap}>
      <Spin tip="Loading..." spinning={isLoading}>
        <Form name="studentForm" ref={formRef}
          labelCol={{ span: 4 }}
          initialValues={props.initialValues}
          onFinish={onFinish}
        >
          <Form.Item label="学号" name="sNo"
            rules={[
              { required: true, message: '${label} 必填' },
              { pattern: /\d{4,16}/, message: '学号必须为4-16位的数字组成' }
            ]}
          >
            <Input disabled={props.isEdit === true} />
          </Form.Item>

          <Form.Item label="姓名" name="name"
            rules={[
              { required: true, message: '${label} 必填' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="性别" name="sex"
            rules={[
              { required: true, message: '${label} 必填' },
            ]}
          >
            <Radio.Group>
              <Radio.Button value={0}>男</Radio.Button>
              <Radio.Button value={1}>女</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="出生年" name="birth"
            rules={[
              { required: true, message: '${label} 必填' },
            ]}
          >
            <Select showSearch placeholder="请选择出生年份"
              optionFilterProp="children"
              filterOption={(input, option) =>
                String(option.children).indexOf(input) >= 0
              }
            >
              {renderOptions()}
            </Select>
          </Form.Item>

          <Form.Item label="地址" name="address"
            rules={[
              { required: true, message: '${label} 必填' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="联系电话" name="phone"
            rules={[
              { required: true, message: '${label} 必填' },
              { pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/, message: '手机号不合法' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="邮箱" name="email"
            rules={[
              { required: true, message: '${label} 必填' },
              { pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, message: '邮箱不合法' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item style={{textAlign: 'center'}}>
            <Space>
              <Button type="primary" htmlType="reset">
                重置
              </Button>
              <Button type="primary" htmlType="submit">
                {props.isEdit ? '修改' : '添加'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};
