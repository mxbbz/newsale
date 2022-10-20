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
      url: `api/addressBook/getAddressBook/${id}`,
      method: 'get',
    })
  },
  deleteAddress(data) {
    return request({
      url: 'api/addressBook/deleteAddress',
      method: 'put',
      data
    })
  },
  saveAddress(id) {
    return request({
      url: 'api/addressBook/saveAddress',
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
      url: 'api/shoppingCart/addShoppingCart',
      method: 'post',
      data
    })
  },
  addOrder(data) {
    return request({
      url: 'api/orders/addOrder',
      method: 'post',
      data
    })
  },
  getCategory() {
    return request({
      url: 'api/category/listTree',
      method: 'get',
    })
  },
  addFrom(data) {
    return request({
      url: 'api/product/addFrom',
      method: 'post',
      data
    })
  },
  addProductPicture(data) {
    return request({
      url: 'api/productBlock/addProductBlock',
      method: 'post',
      data: data
    })
  },
  getShoppingCartNumber(id) {
    return request({
      url: `api/shoppingCart/getShoppingCartNumber/${id}`,
      method: 'get',
    })
  },
  getOrdersList(id) {
    return request({
      url: `api/orders/getOrdersList/${id}`,
      method: 'get',
    })
  },
  deleteOrders(id) {
    return request({
      url: `api/orders/delete/${id}`,
      method: 'delete',
    })
  },
  getShoppingCart(id) {
    return request({
      url: `api/shoppingCart/getShoppingCart/${id}`,
      method: 'get',
    })
  },
  deleteShoppingCartProduct(id) {
    return request({
      url: `api/shoppingCart/deleteShoppingCartProduct/${id}`,
      method: 'delete',
    })
  },
  getProductList(data) {
    return request({
      url: `api/product/productList`,
      method: 'post',
      data: data
    })
  },
  seracchProductList(data) {
    return request({
      url: `api/product/serachProductList?serach=${data}`,
      method: 'get',
      data
    })
  }
}
export default api;