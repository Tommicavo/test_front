<script>

import axios from 'axios';

const baseUri = 'http://localhost:8000/api/posts/';

export default {
  name: 'TrashPage',
  data() {
    return {
        isLoading: false,
        posts: null
    }
  },
  components: {},
  props: {},
  computed: {},
  methods: {
    fetchDeletedPosts(){
        this.isLoading = true;
        const endpoint = `${baseUri}trash`;

        axios.get(endpoint)
        .then(res => {
            this.posts = res.data;
        })
        .catch(err => {
            console.error(err);
        })
        .then(() => {
            this.isLoading = false;
        })
    },
    restorePost(){
        this.isLoading = true;
        const endpoint = `${baseUri}`;
        
        axios.patch()
    },
    dropPost(){}
  },
  created(){
    this.fetchDeletedPosts();
  }
}
</script>

<template>
    <AppLoader v-if="isLoading"/>
    <div v-else class="trashPage w-100">
        <h1 class="py-3">Trash Can</h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col" width="25%">#</th>
                    <th scope="col" width="50%">Title</th>
                    <th class="text-center" scope="col" width="25%">Tasks</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="post in posts" :key="post.id">
                    <td> {{ post.id }} </td>
                    <td> {{ post.title }} </td>
                    <td class="d-flex justify-content-center align-items-center gap-3">
                        <button type="button" class="btn btn-success">Restore</button>
                        <button type="button" class="btn btn-primary">Info</button>
                        <button type="button" class="btn btn-danger">Erase</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="scss" scoped>

</style>