<template>
  <div id="app">
    <Header/>
    <div class="content">
      <Nav />
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Nav from '@/components/Nav'

export default {
  components:{
    Header, Nav
  }
}
</script>


<style lang="less" scoped>
.content{
  display: flex;
  height: 80vh;
}
</style>

<style>
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

a {
  text-decoration: none;
  color: #000;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
