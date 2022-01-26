import qs from 'query-string'

const appkey = 'Allen_He_1602512631187';

function myFetch(path) {
  const domain = 'https://open.duyiedu.com';
  return fetch(domain + path);
}

const api = {
  async getAllStusByPagination(page, limit) {
    const path = '/api/student/findByPage';
    const curUrl = `${path}?appkey=${appkey}&page=${page}&size=${limit}`;
    const data = await myFetch(curUrl).then(resp => resp.json()).then(res => res.data);
    return data;
  },
  /**
   * 如果传递了key属性（key有值），则按照关键字和性别进行搜索
   * 如果key没有值，则对所有学生进行分页
   * @param {object} 查询条件-对象
   * @returns {object} {cont: ..., datas: [{...}, {...}, ...]}
   */
  async searchStudents({ page = 1, limit = 10, key = "", sex = -1 } = {}) {
    if (key) { //按关键词搜索
      const path = '/api/student/searchStudent';
      const resp = await myFetch(`${path}?appkey=${appkey}&page=${page}&size=${limit}&search=${key}&sex=${sex}`)
        .then(resp => resp.json()).then(resp => resp.data);
      resp.datas = resp.searchList;
      delete resp.searchList;
      return resp;
    } else {//忽略性别，查询全部
      const resp = await api.getAllStusByPagination(page, limit);
      resp.datas = resp.findByPage;
      delete resp.findByPage;
      return resp;
    }
  },
  async addStudents(stuInfo = {}) {
    const query = qs.stringify(stuInfo);
    const curUrl = `/api/student/addStudent?appkey=${appkey}&${query}`
    const data = await myFetch(curUrl).then(resp => resp.json());
    return data;
  },
  async updateStudents(newStuInfo = {}) {
    const query = qs.stringify(newStuInfo);
    const curUrl = `/api/student/updateStudent?appkey=${appkey}&${query}`
    const data = await myFetch(curUrl).then(resp => resp.json());
    return data;
  },
  async getStudentBySNo(sNo = '') {
    const curUrl = `/api/student/findAll?appkey=${appkey}`
    const data = await myFetch(curUrl).then(resp => resp.json()).then(res => res.data);
    const stu = data.filter(it => it.sNo === sNo);
    return stu[0] ? stu[0] : {};
  }
}

export default api;

// api.updateStudents({
//   sNo: '999999',
//   name: '测试测试',
//   sex: 0,
//   birth: 1999,
//   phone: '13654852158',
//   address: '成都',
//   email: '123@qq.com'
// });
