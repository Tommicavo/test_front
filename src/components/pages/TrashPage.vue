<script>

import axios from 'axios';

const baseUri = 'http://localhost:8000/api/posts/';

export default {
  name: 'TrashPage',
  data() {
    return {
        isLoading: false,
        posts: null,
        alert: {
            message: null,
            type: ''
        }
    }
  },
  components: {},
  props: {},
  computed: {
    isAlertOpen(){
        return Boolean(this.alert.message);
    }
  },
  methods: {
    async fetchDeletedPosts(){
        this.isLoading = true;
        const endpoint = `${baseUri}trash`;

        axios.get(endpoint)
        .then(res => {
            console.log('fetchDeletedPosts done');
            this.posts = res.data;
        })
        .catch(err => {
            console.error(err);
        })
        .then(() => {
            this.isLoading = false;
        })
    },
    restorePost(id){
        this.isLoading = true;
        const endpoint = `${baseUri}${id}/restore`;
        
        axios.patch(endpoint)
        .then(() => {
            this.alert.message = 'Post successfully restored';
            this.alert.type = 'success';
            this.fetchDeletedPosts();
            this.$router.push({name: 'trashPage'});
        })
        .catch(err => {
            console.error(err);
        })
        .then(() => {
            this.isLoading = false;
        })
    },
    dropPost(id){
        this.isLoading = true;
        const endpoint = `${baseUri}${id}/drop`;

        axios.delete(endpoint)
        .then(() => {
            this.alert.message = 'Post successfully erased';
            this.alert.type = 'danger';
            this.fetchDeletedPosts();
            this.$router.push({name: 'trashPage'});
        })
        .catch(err => {
            console.error(err);
        })
        .then(() => {
            this.isLoading = false;
        })
    },
    closeAlert(){
        this.alert.message = null;
        this.alert.type = '';
    }
  },
  created(){
    this.fetchDeletedPosts();
  }
}
</script>

<template>
    <AppLoader v-if="isLoading"/>
    <div v-else class="trashPage w-100">
        <AppAlert :isOpen="isAlertOpen" :type="alert.type" :isDismissible="true" @close="closeAlert">
            <div v-if="alert.message"> {{ alert.message }} </div>
        </AppAlert>

        <header class="d-flex justify-content-between align-items-center">
            <h1 class="py-3">Trash Can</h1>
            <router-link class="btn btn-primary" :to="{name: 'homePage'}">Home</router-link>
        </header>
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
                        <button type="submit" class="btn btn-success" @click="restorePost(post.id)">Restore</button>
                        <button type="button" class="btn btn-primary">Info</button>
                        <button type="submit" class="btn btn-danger" @click="dropPost(post.id)">Erase</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="scss" scoped>

</style>
