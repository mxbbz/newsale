import request from '../../utlis/request';
const api = {
  sendMsgApi(data) {
    return request({
      url: 'api/user/sendMsg',
      method: 'post',
      data: data
    })
  },
  registerApi(data) {
    return request({
      url: 'api/user/register',
      method: 'post',
      data: data
    })
  },
  loginApi(data) {
    return request({
      url: 'api/user/login',
      method: 'post',
      data: data
    })
  }
}
export default api;