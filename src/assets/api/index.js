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
  saveAddress(id) {
    return request({
      url: 'api/user/saveAddress',
      method: 'post',
      data
    })
  },
  getUserInfo(userId) {
    return request({
      url: `api/user/getUserInfo/${userId}`,
      method: 'get',
    })
  },
  getList() {
    return request({
      url: 'api/product/getRecentList',
      method: 'get',
    })
  },
  getDetails(id) {
    return request({
      url: `api/product/getDetails/${id}`,
      method: 'get',
    })
  },
  getPicture(id) {
    return request({
      url: `api/product/getPicture/${id}`,
      method: 'get',
    })
  },
  addShoppingCart(data) {
    return request({
      url: 'api/product/addShoppingCart',
      method: 'post',
      data
    })
  },
  addOrder(data) {
    return request({
      url: 'api/product/addOrder',
      method: 'post',
      data
    })
  },
  getCategory() {
    return request({
      url: 'api/product/list/tree',
      method: 'get',
    })
  },
  addFrom(data) {
    return request({
      url: 'api/product/addFrom',
      method: 'post',
      data
    })
  }

}
export default api;