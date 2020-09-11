<template>
  <div class="home-container">
    <Header/>
    <div class="content">
      <Nav />
      <router-view class="view" />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Nav from '@/components/Nav'
import { mapGetters } from 'vuex'

export default {
  beforeMount(){
    if(!this.user.name){
      this.$router.push('/login')
    }
  },
  computed:{
    ...mapGetters(['user'])
  },
  components:{
    Header, Nav
  }
}
</script>


<style lang="less" scoped>
.content{
  display: flex;
  height: 80vh;

  .view {
    width: 100%;
    height: 100%;
    padding: 20px 30px;
    display: flex;
    justify-content: center;
  }
}
</style>

