<script>

import axios from 'axios';

const baseUri = 'http://localhost:8000/api/posts/';

export default {
  name: 'EditPage',
  data() {
    return {
        alertSuccessMessage: null,
        firstCycle: true,
        isLoading: false,
        form: {
            title: '',
            description: ''
        },
        errors: {}
    }
  },
  components: {},
  props: {},
  computed: {
    hasErrors(){
      return Object.keys(this.errors).length;
    },
    isAlertOpen(){
        return Boolean(this.hasErrors || this.alertSuccessMessage);
    },
    alertType(){
      return this.hasErrors ? 'danger' : 'success';
    },
    isAlertDismissible(){
        return Boolean(!this.hasErrors && this.alertSuccessMessage);
    }
  },
  methods: {
    fetchPost(endpoint=`${baseUri}${this.$route.params.id}`){
        this.isLoading = true;
        
        axios.get(endpoint)
        .then(res => {
            const post = res.data;
            for (let field in post) this.form[field] = post[field];
        })
        .catch(err => {
            console.error(err);
            this.$router.push({name: 'notFoundPage'});
        })
        .then(() => {
            this.isLoading = false;
        })
    },
    updatePost(){
        this.alertSuccessMessage = null;
        this.firstCycle = false;
        this.isLoading = true;
        this.errors = {};

        const endpoint = `${baseUri}${this.$route.params.id}`;

        axios.put(endpoint, this.form)
        .then(() => {
            const title = this.form.title;
            this.alertSuccessMessage = `"${title}" post successfully updated!`;
        })
        .catch(err => {
            if (err.response.status === 400){
                const errors = err.response.data.errors;
                const errorMessages = {};
                for (let field in errors){
                    errorMessages[field] = errors[field][0];
                    this.errors = errorMessages;
                }
            } else {
                console.error(err);
            }
        })
        .then(() => {
            this.isLoading = false;
        })
    },
    closeAlert(){
        this.errors = {};
        this.alertSuccessMessage = null;
    },
    fieldClass(field){
        if (this.firstCycle) return '';
        if (this.hasErrors && !this.errors[field]) return 'is-valid';
        if (this.errors[field]) return 'is-invalid';
    }
  },
  created(){
    this.fetchPost();
  }
}
</script>

<template>
    <Apploader v-if="isLoading"/>
    <div v-else class="createPage w-100 py-4">
        <AppAlert :isOpen="isAlertOpen" :type="alertType" :isDismissible="isAlertDismissible" @close="closeAlert">
            <div v-if="alertSuccessMessage"> {{ alertSuccessMessage }} </div>
            <div v-if="hasErrors">
                <ul>
                    <li v-for="(error, field) in errors" :key="field"> {{ error }} </li>
                </ul>
            </div>
        </AppAlert>

        <form method="POST" @submit.prevent="updatePost">
            <!-- title -->
            <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input id="title" class="form-control" type="text" placeholder="Write Title..."
                v-model.trim="form.title" :class="fieldClass('title')">
                <div v-if="errors.title" class="invalid-feedback"> {{ errors.title }} </div>
                <div v-if="hasErrors && !errors.title" class="valid-feedback"> Looks good </div>
            </div>

            <!-- description -->
            <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <input id="description" class="form-control" type="text" placeholder="Write Description..."
                v-model="form.description" :class="fieldClass('description')">
                <div v-if="errors.description" class="invalid-feedback"> {{ errors.description }} </div>
                <div v-if="hasErrors && !errors.description" class="valid-feedback"> Looks good </div>
            </div>

            <div class="editButtons d-flex justify-content-between align-items-center">
                <button type="submit" class="btn btn-primary">Update</button>
                <router-link class="btn btn-info" :to="{name: 'homePage'}">Home</router-link>
            </div>
        </form>
    </div>
</template>

<style lang="scss" scoped>

</style>
