<template>
  <md-snackbar
    :md-position="position"
    :md-active.sync="showSnackbar"
    :md-duration="duration ? duration : Infinity"
    md-persistent
  >
    <span>{{ message }}</span>
  </md-snackbar>
</template>

<script>
export default {
  name: "Snackbar",
  props: {
    position: {
      type: String,
      default: "center",
    },
    duration: {
      type: Number,
      default: 4000,
    },
    show: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: "Default Message",
    },
  },
  computed: {
    showSnackbar: {
      get: function () {
        return this.show;
      },
      set: function (value) {
        this.$emit("showSnackbar", value);
      },
    },
  },
};
</script>

<style>
</style>