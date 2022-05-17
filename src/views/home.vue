<template>
<div>
<NavBar></NavBar>
<Logo></Logo>
</div>
</template>

<script>
import NavBar from '@/views/home/navbar.vue'
import Logo from '@/views/home/logo.vue'
export default {
  name: 'home',
  components: {
    NavBar,
    Logo
  }
}
</script>

<style>

</style>
