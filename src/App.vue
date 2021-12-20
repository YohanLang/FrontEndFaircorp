<template>
  <div id="style">
    <div id="app">
      <header>
        <div  class="title p-3" ><strong id =txt>{{title}}</strong></div>
      </header>

      <section class="main-content w-50 mx-auto">
        <main-navigation></main-navigation>
        
      </section>
    </div>
  </div>
</template>

<script>
import MainNavigation from './components/MainNavigation.vue';

export default {
  name: 'App',
  components: {
    MainNavigation,
    
  },
  data: function() {
    return {
      title: 'Faircorp'
    }
  },
  
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #578021;
  
}
#txt{
    background-color: rgba(255, 255, 255);
    font-size:35px;
    }
#style{

  background-image: url(https://www.lessor42.fr/content/articles/89287/main_acole-des-mines-saint-etienne-dr.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 700px;
  
  
}


</style>