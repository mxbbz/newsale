<template>
  <div class="logo">
    <div class="wrapper">
     <img class="logoimg" src="@/assets/images/logo.png">
     <div class="serach">
      <input class="serach-box" type="text">
       <div class="link-goods">
       <ul>
         <li class="goods-item"><router-link to="/home/users">新款连衣裙</router-link></li>
         <li class="goods-item"><router-link to="/home/users">四件套</router-link></li>
         <li class="goods-item"><router-link to="/home/users">潮流T恤</router-link></li>
         <li class="goods-item"><router-link to="/home/users">时尚女鞋</router-link></li>
         <li class="goods-item"><router-link to="/home/users">短裤</router-link></li>
         <li class="goods-item"><router-link to="/home/users">半身裙</router-link></li>
         <li class="goods-item"><router-link to="/home/users">男士外套</router-link></li>
         <li class="goods-item"><router-link to="/home/users">墙纸</router-link></li>
       </ul>
     </div>
     </div>
     <div class="serach-btn">
       <router-link to="/home/serach" class="serach-icon"></router-link>
     </div>
    </div>
  </div>

</template>

<script>
export default {

}
</script>

<style>
  .wrapper{
    width: 1240px;
    margin: 0 auto;
  }
  .logo{
    height: 120px;
    background-color: #CCC;
  }
  .logoimg{
    float: left;
    height: 100px;
    margin-left: 40px;
    margin-top: 10px;
    margin-right: 150px;
  }
  .serach{
    float: left;
    position: relative;
    margin-top: 40px;
    margin-left: 80px;
    border: 2px solid #FF6666;
  }
  .serach-box{
    width: 450px;
    height: 28px;
    padding-left: 5px;
  }
  .serach-btn{
    position: relative;
    float: left;
    margin-top: 40px;
    background: #FF6666;
    width: 40px;
    height: 32px;
  }
  .serach-icon{
    position: absolute;
    top: 8px;
    left: 10px;
    height: 14px;
    width: 14px;
    float: left;
    background-position: -37px -1px;
    background-image: url(@/assets/images/icon.png);
  }
  .link-goods{
    position: absolute;
    top: 40px;
    width: 642px;
  }
  .goods-item{
    float: left;
    margin-left: 20px;
    font-size: 12px;
  }
  .goods-item:first-child{
    margin-left: 0;
  }
</style>
