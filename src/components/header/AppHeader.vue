<script>

export default {
  name: 'AppHeader',
  data() {
    return {}
  },
  components: {},
  props: {},
  computed: {},
  methods: {}
}
</script>

<template>
  <header class="appHeader">
    <nav class="bg-dark text-white h-100">
      <ul class="d-flex justify-content-start align-items-center gap-3 h-100 px-4">
        <li>
          <router-link class="navbar-brand" :to="{name: 'homePage'}">Home</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@use '@/assets/sass/_vars.scss' as *;

.appHeader{
  height: $headerHeight;
}
</style>
