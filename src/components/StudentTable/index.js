import React from 'react'
import style from "./index.css"
import { history } from 'umi'
import { Table, Button } from 'antd';

export default function StudentTable(props) {
	const columns = [
		{
			title: '学号',
			dataIndex: 'sNo',
		},
		{
			title: '姓名',
			dataIndex: 'name',
		},
		{
			title: '性别',
			dataIndex: 'sex',
			render(sex) {
				return sex === 0 ? '男' : '女';
			}
		},
		{
			title: '出生年份',
			dataIndex: 'birth',
		},
		{
			title: '邮箱',
			dataIndex: 'email',
		},
		{
			title: '操作',
			render(curStu) {
				return <Button type="link" onClick={() => {
					history.push(`/students/${curStu.sNo}`);
				}}>修改</Button>
			}
		}
	];

	return (
		<Table columns={columns} dataSource={props.stus} rowKey="id" className={style.tableBox}
			loading={props.loading}
			pagination={{
				current: props.current,
				total: props.total,
				pageSize: props.pageSize,
				showQuickJumper: true,
				onChange: props.onPageChange,
				position: ['bottomLeft']
			}}
		/>
	)
}
