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
  },
  saveUserInfo(data) {
    return request({
      url: 'api/user/saveUserInfo',
      method: 'post',
      data
    })
  },
  getAddress(id) {
    return request({
      url: `api/user/getAddressBook/${id}`,
      method: 'get',
    })
  }

}
export default api;