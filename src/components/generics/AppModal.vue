<script>

export default {
  name: 'AppModal',
  data() {
    return {}
  },
  components: {},
  props: {},
  computed: {},
  methods: {}
}
</script>

<template>
    <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title fs-5 text-danger fw-bold" id="exampleModalLabel">Warning</h2>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-dark" id="modalMessage">

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-danger" id="confirmEraseBtn" data-bs-dismiss="modal">Yes, Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>
