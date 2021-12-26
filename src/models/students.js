import api from "../services"
import { history } from 'umi'

export default {
  state: {
    condition: { //查询条件
      key: "",
      sex: -1,
      page: 1,
      limit: 10
    },
    result: { //查询结果
      total: 0, //总数据量
      datas: [] //学生数据
    }
  },
  reducers: {
    setCondition(state, { payload }) {
      return {
        ...state,
        condition: {
          ...state.condition,
          ...payload
        }
      }
    },
    setResult(state, { payload }) {
      return {
        ...state,
        result: payload
      }
    }
  },
  effects: {
    *changeUrl({ payload }, { put, select }) { //改变地址栏中的query参数
      const oldCondition = yield select(state => state.students.condition);
      const newCondition = { ...oldCondition, ...payload };
      const { page, limit, key, sex } = newCondition;
      history.push(`?page=${page}&limit=${limit}&key=${key}&sex=${sex}`);
    },
    *fetchStudents(action, { select, call, put }) {
      const condition = yield select(state => state.students.condition);
      const res = yield call(api.searchStudents, condition);
      yield put({
        type: 'setResult',
        payload: { total: res.cont, datas: res.datas }
      });
    }
  },
  subscriptions: {
    listenUrlChange({ dispatch, history }) {
      history.listen((newLocation) => {
        if(newLocation.pathname !== '/students') {
          return; //如果改变后的pathname不为'/students'，则什么都不做，直接返回
        }
        const newCondition = getConditionByQuery(newLocation.query);
        dispatch({
          type: 'setCondition',
          payload: newCondition
        });
        dispatch({ type: 'fetchStudents' });
      });
    }
  }
}

/** 根据传入的query对象得到正确格式的condition对象 */
function getConditionByQuery(query) {
  const {page, limit, key, sex} = query;
  const res = {};
  page && (res.page = +page);
  limit && (res.limit = +limit);
  sex && (res.sex = +sex);
  key && (res.key = key);
  return res;
}
