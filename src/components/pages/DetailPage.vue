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
            // console.log('res.data: ', res.data);
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
    }
  },
  created(){
    this.fetchPost();
  }
}
</script>

<template>
    <AppLoader v-if="isLoading"/>
    <div v-else class="detailPage">
        <DetailedPostCard :post="post" @changePage="fetchNewPost"/>
    </div>
</template>

<style lang="scss" scoped>

</style>
