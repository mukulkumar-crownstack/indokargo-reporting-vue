<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">{{ $route.name }}</h3>
      </div>
      <div class="md-toolbar-section-end">
        <div class="md-collapse">
          <md-list>
            <md-list-item @click="logout">
              <i class="material-icons">power_settings_new</i>
              <p class="mx-2">Logout</p>
            </md-list-item>
          </md-list>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
import { logoutService } from "../../services/authService";
import { showSnackbar } from "../../globalActions";
import { Constants } from "../../Constants/constants";

export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$swal
        .fire({
          title: Constants.swalConfirmHeading,
          text: Constants.swalLogout,
          icon: Constants.swalType,
          showCancelButton: true,
          confirmButtonColor: Constants.themeGreeBG,
          cancelButtonColor: Constants.themeRedBG,
          confirmButtonText: Constants.yes,
          cancelButtonText: Constants.no,
        })
        .then((result) => {
          if (result.value) {
            this.$emit("loading", true);
            logoutService().then((res) => {
              this.$emit("loading", false);
              if (res.status === "Success") {
                showSnackbar("Logged out successfully");
                this.$emit("authenticated", false);
              } else {
                console.log(res);
              }
            });
          }
        });
    },
  },
};
</script>

<style lang="css"></style>
