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
      method: 'delete',
      data
    })
  },
  saveAddress(data) {
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
      method: 'get',
      params: data
    })
  },
  seracchProductList(data) {
    return request({
      url: `api/product/serachProductList`,
      method: 'get',
      params: data
    })
  },
  queryPriceRange(data) {
    return request({
      url: 'api/product/queryPriceRange',
      method: 'get',
      params: data
    })
  },
  addComments(data) {
    return request({
      url: 'api/productComments/add',
      method: 'post',
      data: data
    })
  },
  getMessageList(id) {
    return request({
      url: `api/productComments/get/${id}`,
      method: 'get',
    })
  },
  removeMessage(id) {
    return request({
      url: `api/productComments/delete/${id}`,
      method: 'post',
    })
  },
  replyComments(data) {
    return request({
      url: `api/productCommentsReply/add/`,
      method: 'post',
      data: data
    })
  },
  removeReplyMessage(id) {
    return request({
      url: `api/productCommentsReply/delete/${id}`,
      method: 'post',
    })
  },
  getBLockList(){
    return request({
      url: 'api/block/getBlockList/',
      method: 'get',
    })
  },
}
export default api;