<script>
import axios from 'axios';

import DetailedPostCard from '@/components/posts/DetailedPostCard.vue';

const baseUri = 'http://localhost:8000/api/posts/';

export default {
  name: 'DetailPage',
  data() {
    return {
        isLoading: false,
        post: null
    }
  },
  components: {
    DetailedPostCard
  },
  props: {},
  computed: {
    getPrevUrl(prev){
        return `${baseUri}${prev}`
    }
  },
  methods: {
    fetchPost(endpoint=`${baseUri}${this.$route.params.id}`){
        this.isLoading = true;
        
        axios.get(endpoint)
        .then(res => {
            this.post = res.data;
            console.log('POST: ', this.post);
        })
        .catch(err => {
            console.error(err);
            this.$router.push({name: 'notFoundPage'});
        })
        .then(() => {
            this.isLoading = false;
        })
    },
    fetchNewPost(newId){
        const endpoint = `${baseUri}${newId}`;
        this.fetchPost(endpoint);
    },
    deletePost(id){
      this.isLoading = true;
      const endpoint = `${baseUri}${id}`;
      axios.delete(endpoint)
      .then(() => {
        console.log('Post successfully deleted');
      })
      .catch(err => {
        console.error(err);
      })
      .then(() => {
        this.isLoading = false;
      })
    }
  },
  created(){
    this.fetchPost();
  }
}
</script>

<template>
    <AppLoader v-if="isLoading"/>
    <div v-else class="detailPage w-100">
        <DetailedPostCard :post="post" @changePage="fetchNewPost" @delete="deletePost"/>
    </div>
</template>

<style lang="scss" scoped>

</style>
