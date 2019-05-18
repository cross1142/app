// 引入接口
import config from "./config.js";
// 引入请求方法
import hs from "./httpserve.js";

// 集中处理请求
export default {

  // 获取班级列表
  getClassLs() {
    const url = config.getClassLs;
    return hs.gnServe(url);
  },

  // 获取宿舍列表
  getDormLs() {
    const url = config.getDormLs;
    return hs.gnServe(url);
  },

  // 更新学员信息
  updateStudent(params) {
    const url = config.updateStudent;
    return hs.phServe(url, params)
  },

  // 获取个人信息
  getStudentInfo(id) {
    const url = config.getStudentInfo;
    hs.ghServe(url, { id: id }).then(res => {
      console.log(res);
      return res;
    })
  }

}