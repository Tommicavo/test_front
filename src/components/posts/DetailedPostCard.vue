<script>

import axios from 'axios';

const baseUri = 'http://localhost:8000/api/posts/';

export default {
  name: 'DetailedPostCard',
  data() {
    return {
    }
  },
  components: {},
  props: {
    post: Object
  },
  emits: ['changePage', 'delete'],
  computed: {},
  methods: {
    formatDates($in_date) {
        const date = new Date($in_date);

        let day = date.getDate();
        let month = date.getMonth() + 1;
        const year = date.getFullYear();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        const out_date = `${day}/${month}/${year} at ${hours}:${minutes}`;
        return out_date;
    },
    upperTitle(title){
      return title.toUpperCase();
    }
  }
}
</script>

<template>
  <div v-if="post.deleted_at" class="isTrashed alert alert-info py-4">
    <span><strong>Note: </strong></span>
    <span>You are browsing trashed projects</span>
  </div>
  <div class="card detailedPostCard h-100 pb-0">
    <div class="detailButtonsTop d-flex justify-content-between align-items-center">
      <router-link class="btn btn-warning" :to="{name: 'editPage', params: {id: post.id}}">Edit</router-link>
      <button type="submit" class="btn btn-danger" @click="$emit('delete', post.id)">Delete</button>
    </div>
    <div class="card-body">
      <h5 class="card-title text-center pb-5"> {{ upperTitle(post.title) }} </h5>
      <div class="cardInfo">
        <div v-if="post.description" class="description">
          <div><strong>Description: </strong></div>
          <div> {{ post.description }} </div>
        </div>
        <div class="id">
          <span><strong>Id: </strong></span>
          <span> {{ post.id }} </span>
        </div>
        <div class="created">
          <span><strong>Created: </strong></span>
          <span> {{ formatDates(post.created_at) }} </span>
        </div>
        <div class="updated">
          <span><strong>Last Update: </strong></span>
          <span> {{ formatDates(post.updated_at) }} </span>
        </div>
        <div v-if="post.deleted_at" class="deleted">
          <span><strong>Deleted at: </strong></span>
          <span> {{ formatDates(post.deleted_at) }} </span>
        </div>
      </div>
    </div>
    <div class="detailButtonsBottom">
      <div class="up d-flex justify-content-center align-items-center gap-4">
        <button type="button" class="btn btn-primary" @click="$emit('changePage', post.prevId)">Prev</button>
        <button type="button" class="btn btn-primary" @click="$emit('changePage', post.nextId)">Next</button>
      </div>
      <div class="down">
        <router-link class="btn btn-info toUp" :to="{name: 'homePage'}">Home</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cardInfo>*{
  padding: 0.5rem 0;
}

.toUp{
  translate: 0 -100%;
}
</style>
