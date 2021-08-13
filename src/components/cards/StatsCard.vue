<template>
  <md-card class="md-card-stats">
    <md-card-header :data-background-color="dataBackgroundColor">
      <slot name="header"></slot>
    </md-card-header>

    <md-card-content>
      <slot name="content"></slot>
    </md-card-content>
  </md-card>
</template>
<script>
export default {
  name: "stats-card",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>
.md-card-stats {
  min-height: 120px;
}
.md-card-stats .md-card-header i {
  font-size: 26px !important;
  line-height: 36px;
  width: 36px;
  height: 36px;
  text-align: center;
}
.md-card .title {
  color: #3c4858;
  font-weight: 400;
}
.md-card-header {
  padding: 5px !important;
}
.md-app-content .md-card {
  margin-left: 0;
}
</style>