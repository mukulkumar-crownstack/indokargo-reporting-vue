<template>
  <div>
    <router-view @authenticated="setAuthenticated" @loading="setLoading" />
    <snackbar
      v-show="show"
      @showSnackbar="showSnackbar"
      :show="show"
      :message="snackbarMessage"
    />
    <loader v-show="loading" />
  </div>
</template>

<script>
import Snackbar from "./components/core/Snackbar";
import Loader from "./components/core/Loader";
import EventBus, { ACTIONS } from "./globalActions/EventBus/index";
import { isLoggedIn } from "./services/localStorage";

export default {
  name: "App",
  components: { Snackbar, Loader },
  data: () => ({
    authenticated: isLoggedIn(),
    snackbarMessage: "",
    show: false,
    loading: false,
  }),
  mounted() {
    if (!this.authenticated) {
      this.$router.replace("login");
    }
    EventBus.$on(ACTIONS.SNACKBAR, (message) => {
      this.snackbarMessage = message;
      this.show = true;
    });
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
      if (status) {
        this.$router.replace("locations");
      } else {
        this.$router.replace("login");
      }
    },
    logout() {
      this.authenticated = false;
    },
    showSnackbar(value) {
      this.show = value;
    },
    setLoading(value) {
      this.loading = value;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.md-app-content {
  padding: 0 !important;
}
.md-app-container {
  height: 100vh;
  overflow: scroll;
}
</style>
