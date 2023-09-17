<script>

export default {
  name: 'AppAlert',
  data() {
    return {}
  },
  components: {},
  props: {
    isOpen: Boolean,
    type: String,
    isDismissible: Boolean
  },
  computed: {},
  methods: {},
  emits: ['close']
}
</script>

<template>
    <div v-if="isOpen" :class="[`alert-${type || 'info'}`]" class="alert alert-dismissible fade show my-3" role="alert">
        <div class="messageContent text-start py-2">
          <div class="text-center"><strong>Alert</strong></div>
          <slot></slot>
        </div>
        <button v-if="isDismissible" type="button" class="btn-close" @click="$emit('close')"></button>
    </div>
</template>

<style lang="scss" scoped>

</style>
