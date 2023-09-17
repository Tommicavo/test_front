<script>

import axios from 'axios';

import AppMain from '@/components/main/AppMain.vue';

export default {
  name: 'HomePage',
  data() {
    return {
      isLoading: false,
      posts: {
        data: [],
        links: []
      }
    }
  },
  components: {
    AppMain
  },
  props: {},
  computed: {},
  methods: {
    fetchPosts(endpoint='http://localhost:8000/api/posts'){
      this.isLoading = true;

      axios.get(endpoint)
      .then(res => {
        this.posts.data = res.data.data;
        this.posts.links = res.data.links;
      }).catch(err => {
        console.log(err);
      }).then(() => {
        this.isLoading = false;
      })
    }
  },
  created(){
    this.fetchPosts();
  }
}
</script>

<template>
  <AppLoader v-if="isLoading"/>
  <div v-else class="homePage">
    <header class="d-flex justify-content-between align-items-center py-3">
      <h2>Posts</h2>
      <router-link class="btn btn-success" :to="{name: 'createPage'}">Add Post</router-link>
    </header>

    <AppPagination :links="posts.links" @changePage="fetchPosts"/>
    <AppMain :posts="posts.data"/>
  </div>
</template>

<style lang="scss" scoped>


</style>
