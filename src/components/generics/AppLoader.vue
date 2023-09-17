<script>

export default {
  name: 'AppLoader',
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
    <div class="appLoader">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
</template>

<style lang="scss" scoped>
.appLoader{
position: fixed;
top: 0;
right: 0;
left: 0;
bottom: 0;
display: flex;
justify-content: center;
align-items: center;
z-index: 3;
background-color: rgba(.5, .5, .5, .8);
}

.spinner-border{
width: 250px;
height: 250px;
}

</style>
