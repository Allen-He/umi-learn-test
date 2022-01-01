import React, { useEffect } from 'react'
import { connect } from 'umi'
import StudentSearchBar from '../StudentSearchBar'
import StudentTable from '../StudentTable'
import Pager from '../Pager'

// 链接 StudentSearchBar 组件
let mapStateToProps = state => {
  const { key, sex } = state.students.condition;
  return {
    keyword: key,
    sex
  }
}
let mapDispatchToProps = dispatch => {
  return {
    onSearch: (newCondition) => {
      newCondition.page = 1; //将当前conditon中的page置为1
      dispatch({
        type: 'students/changeUrl',
        payload: newCondition
      });
    }
  }
}
const StudentSearchBarContainer = connect(mapStateToProps, mapDispatchToProps)(StudentSearchBar);

// 链接 StudentTable 组件
mapStateToProps = state => {
  return {
    stus: state.students.result.datas,
    loading: state.loading.effects['students/fetchStudents'],
    current: state.students.condition.page,
    total: state.students.result.total,
    pageSize: state.students.condition.limit,
  }
}
mapDispatchToProps = dispatch => {
  return {
    onPageChange: (tarPage) => {
      dispatch({
        type: 'students/changeUrl',
        payload: { page: tarPage }
      });
    }
  }
}
const StudentTableContainer = connect(mapStateToProps, mapDispatchToProps)(StudentTable);

// 链接 Pager 组件
mapStateToProps = state => {
  const { page: current, limit } = state.students.condition;
  const { total } = state.students.result;
  return {
    current,
    total,
    limit,
    panelNum: 5
  }
}
mapDispatchToProps = dispatch => {
  return {
    onPageChange: (tarPage) => {
      dispatch({
        type: 'students/changeUrl',
        payload: { page: tarPage }
      });
    }
  }
}
const PagerContainer = connect(mapStateToProps, mapDispatchToProps)(Pager);

export default function StudentsPage() {
  return (
    <>
      <StudentSearchBarContainer/> 
      <StudentTableContainer/>
      {/* 此处改为：使用antd的Table组件自带的分页组件 */}
      {/* <PagerContainer/> */}
    </>
  )
}
