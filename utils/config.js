const host = "http://59.110.138.169/";
const config = {
  host,

  // 试听课信息接口
  updateStudentInfo: `${host}admin/xy/lite/student/update`,

  // 查看学员缴费信息接口
  pay: `${host}admin/xy/lite/student/costList`,

  // 获取学员具体信息
  getStudentInfo: `${host}admin/xy/lite/student/detail`,

  // 获取班级列表
  getClassLs: `${host}admin/xy/clazz/list`,

  // 获取宿舍列表
  getDormLs: `${host}admin/xy/dorm/list`
}

module.exports = config;