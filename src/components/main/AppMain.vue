<script>

import PostCard from '@/components/posts/PostCard.vue';

export default {
  name: 'AppMain',
  data() {
    return {}
  },
  components: {
    PostCard
  },
  props: {
    posts: Array
  },
  computed: {},
  methods: {}
}
</script>

<template>
    <div class="appMain">
        <div class="row" v-if="posts.length">
            <div class="col" v-for="post in posts" :key="post.id">
                <PostCard :post="post"/>
            </div>
        </div>
        <div v-if="!posts.length" class="row">
            <div class="col">
                <div class="emptyCard">No Posts here...</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.appMain .col{
    min-height: 300px;
    padding: 1rem;
    flex-basis: 50%;
}
</style>
