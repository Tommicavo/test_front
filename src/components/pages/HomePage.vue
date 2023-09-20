<script>

import axios from 'axios';

import AppMain from '@/components/main/AppMain.vue';

const baseUri = 'http://localhost:8000/api/posts';

export default {
  name: 'HomePage',
  data() {
    return {
      isLoading: false,
      filterWord: '',
      currentPage: 1,
      alertMessage: '',
      alertType: 'info',
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
  computed: {
    currentEndpoint(){
      return `${baseUri}?page=${this.currentPage}&filter=${this.filterWord}`;
    },
    isAlertOpen(){
      return Boolean(this.alertMessage);
    }
  },
  methods: {
    getPageLabel(label){
      if (label === 'Next &raquo;') this.currentPage = Number(this.currentPage) + 1;
      else if (label === '&laquo; Previous') this.currentPage = Number(this.currentPage) - 1;
      else this.currentPage = Number(label);
      this.fetchPosts();
    },
    fetchPosts(){
      this.isLooading = true;

      axios.get(this.currentEndpoint)
      .then(res => {
        this.posts.data = res.data.data;
        this.posts.links = res.data.links;
      })
      .catch(err => {
        console.error(err);
      })
      .then(() => {
        this.isLoading = false;
      })
    },
    checkRoute(){
      if (this.$route.query.stored == 'true')
        {
          this.alertMessage = 'Post successfully stored!';
          this.alertType = 'success';
        }
        else if (this.$route.query.deleted == 'true')
        {
          this.alertMessage = 'Post successfully moved into Trash';
          this.alertType = 'danger';
        }
    },
    closeAlert(){
      this.alertMessage = '';
    }
  },
  created(){
    this.checkRoute();
    this.fetchPosts();
  }
}
</script>

<template>
  <AppLoader v-if="isLoading"/>
  <div v-else class="homePage">
    <header class="d-flex justify-content-between align-items-center py-3">
      <div class="headerLeft d-flex gap-3">
        <h2>Posts</h2>
        <form method="GET" @submit.prevent="fetchPosts">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search post..." v-model.trim="filterWord">
            <button class="btn btn-primary" type="submit">Find</button>
          </div>
        </form>
      </div>
      <div class="headerRight d-flex gap-3">
        <router-link class="btn btn-success" :to="{name: 'createPage'}">Add Post</router-link>
        <router-link class="btn btn-danger" :to="{name: 'trashPage'}">Open Trash Can</router-link>
      </div>
    </header>

    <AppPagination :links="posts.links" @page="getPageLabel"/>
    <AppAlert :isOpen="isAlertOpen" :type="alertType" :isDismissible="true" @close="closeAlert">
      <div> {{ alertMessage }} </div>
    </AppAlert>
    <AppMain :posts="posts.data"/>
  </div>
</template>

<style lang="scss" scoped>


</style>
