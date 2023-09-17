<script>

import AppHeader from './components/header/AppHeader.vue';

export default {
  data() {
    return {

    }
  },
  components: {
    AppHeader
  },
  methods: {
  }
}

</script>

<template>
  <AppHeader/>
  <main>
    <div class="container d-flex justify-content-center align-items-center h-100">  
      <router-view></router-view>
    </div>
  </main>
</template>

<style lang="scss">
@use './assets/sass/style.scss' as *;
</style>
