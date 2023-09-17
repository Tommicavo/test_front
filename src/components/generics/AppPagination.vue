<script>

export default {
  name: 'AppPagination',
  data() {
    return {}
  },
  components: {},
  props: {
    links: Array
  },
  computed: {},
  methods: {},
  emits: ['changePage']
}
</script>

<template>
    <div class="appPagination d-flex justify-content-center my-3">
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" v-for="link in links" :key="link.label"
                :class="[{active : link.active}, {disabled : !link.url}]">
                <button type="button" class="page-link"
                v-html="link.label" :disabled="!link.url"
                @click="$emit('changePage', link.url)"></button>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style lang="scss" scoped>

</style>
