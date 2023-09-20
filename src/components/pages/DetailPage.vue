<script>
import axios from 'axios';

import DetailedPostCard from '@/components/posts/DetailedPostCard.vue';

const baseUri = 'http://localhost:8000/api/posts/';

export default {
  name: 'DetailPage',
  data() {
    return {
        isLoading: false,
        alertMessage: '',
        alertType: 'info',
        post: null
    }
  },
  components: {
    DetailedPostCard
  },
  props: {},
  computed: {
    isAlertOpen(){
      return Boolean(this.alertMessage);
    }
  },
  methods: {
    async fetchPost(endpoint=`${baseUri}${this.$route.params.id}`){
      console.log(this.$route);
      this.isLoading = true;
      
      axios.get(endpoint)
      .then(res => {
          this.post = res.data;
          console.log('SHOW POST: ', this.post);
      })
      .catch(err => {
          console.error(err);
          this.$router.push({name: 'notFoundPage'});
      })
      .then(() => {
          this.isLoading = false;
      })
    },
    async fetchNewPost(newId){
        const endpoint = `${baseUri}${newId}`;
        await this.fetchPost(endpoint);
        this.$router.push({name: 'detailPage', params: {id: newId}});
    },
    deletePost(id){
      this.isLoading = true;
      const endpoint = `${baseUri}${id}`;
      axios.delete(endpoint)
      .then(() => {
        console.log('Post successfully deleted');
        this.$router.push({name: 'homePage', query: {deleted: true}});
      })
      .catch(err => {
        console.error(err);
      })
      .then(() => {
        this.isLoading = false;
      })
    },
    closeAlert(){
      this.alertMessage = '';
    },
    checkRoute(){
      if (this.$route.query.updated == 'true')
      {
        this.alertMessage = 'Post successfully updated!';
        this.alertType = 'success';
      }
    }
  },
  created(){
    this.checkRoute();
    this.fetchPost();
  }
}
</script>

<template>
    <AppLoader v-if="isLoading"/>
    <div v-else class="detailPage w-100">
      <AppAlert :isOpen="isAlertOpen" :type="alertType" :isDismissible="true" @close="closeAlert">
        <div> {{ alertMessage }} </div>
      </AppAlert>
      <DetailedPostCard v-if="post" :post="post" @changePage="fetchNewPost" @delete="deletePost"/>
    </div>
</template>

<style lang="scss" scoped>

</style>
