<script>

import axios from 'axios';

const endpoint = 'http://localhost:8000/api/posts/store';

export default {
  name: 'CreatePage',
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
    storePost(){
        this.alertSuccessMessage = null;
        this.firstCycle = false;
        this.isLoading = true;
        this.errors = {};

        axios.post(endpoint, this.form)
        .then(() => {
            const title = this.form.title;
            this.form = {title: '', description: ''};
            this.alertSuccessMessage = `"${title}" post successfully stored!`;
            this.$router.push({name: 'homePage', query: {stored: true}});
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

        <form method="POST" @submit.prevent="storePost">
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

            <div class="createButtons d-flex justify-content-between align-items-center">
                <button type="submit" class="btn btn-primary">Add</button>
                <router-link class="btn btn-info" :to="{name: 'homePage'}">Home</router-link>
            </div>
        </form>
    </div>
</template>

<style lang="scss" scoped>
label{
    font-size: 1.5rem;
    font-weight: 500;
}

.invalid-feedback, .valid-feedback{
    padding-left: 12px;
}
</style>
