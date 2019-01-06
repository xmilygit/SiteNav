<template>
  <div id="app">
<b-btn v-b-modal.modal-center v-show="showbt">Launch centered modal</b-btn>
<b-btn  @click="showbt=!showbt">open/hidden</b-btn>

  <!-- Modal Component -->
  <b-modal id="modal-center" centered title="Bootstrap-Vue">
    <p class="my-4">Vertically centered modal!</p>
  </b-modal>    
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      showbt:true
    };
  },
  watch: {
  },
  methods: {
  }
};
</script>

<style>
.margin_l {
  margin-left: 5px;
}
</style>
