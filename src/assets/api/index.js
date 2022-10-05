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
  },
  deleteAddress(data) {
    return request({
      url: 'api/user/deleteAddress',
      method: 'put',
      data
    })
  },
  saveAddress(data) {
    return request({
      url: 'api/user/saveAddress',
      method: 'post',
      data
    })
  },
  getList() {
    return request({
      url: 'api/product/getRecentList',
      method: 'get',
    })
  }

}
export default api;