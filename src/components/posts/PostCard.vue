<script>

export default {
  name: 'PostCard',
  data() {
    return {}
  },
  components: {},
  props: {
    post: Object
  },
  computed: {},
  methods: {},
  created(){
  }
}
</script>

<template>
    <div class="card postCard h-100">
        <div class="card-body">
            <h5 class="card-title">
                <span>{{ post.id }} - </span>    
                <span>{{ post.title }} </span>    
            </h5>
            <p class="card-text">{{ post.description }}</p>
        </div>
        <div class="cardButtons">
          <router-link class="btn btn-primary" :to="{name: 'detailPage', params: {id: post.id}}">Info</router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>
