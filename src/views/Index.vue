<template>
  <div class="page-container md-layout-row">
    <md-app md-theme="default-dark">
      <md-app-drawer md-permanent="full">
        <side-bar />
      </md-app-drawer>
      <!-- <drawer />  -->

      <md-app-content>
        <top-navbar
          @authenticated="setAuthenticated"
          @loading="setLoading"
        ></top-navbar>

        <main-view @loading="setLoading" />
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
// import Drawer from "../components/core/Drawer";
import SideBar from "../components/core/SideBar";
import MainView from "../components/core/MainView.vue";
import TopNavbar from "../components/core/TopNavbar.vue";

export default {
  name: "Index",
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    setAuthenticated(status) {
      this.$emit("authenticated", status);
    },
    setLoading(value) {
      this.$emit("loading", value);
    },
  },
  components: {
    SideBar,
    // Drawer,
    MainView,
    TopNavbar,
  },

  data: () => ({
    expandOnHover: false,
  }),
};
</script>

<style scoped>
.md-app {
  min-height: 100vh;
  border: 1px solid rgba(#000, 0.12);
}
.md-drawer {
  width: 250px;
  max-width: calc(100vw - 125px);
}
</style>
