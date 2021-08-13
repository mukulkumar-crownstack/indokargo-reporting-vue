<template>
  <div>
    <md-toolbar class="md-transparent logo" md-elevation="0">
      <div class="logo-img">
        <img :src="imgLogo.default" />
      </div>
      <div class="version">v1.0.2</div>
    </md-toolbar>

    <md-list>
      <slot>
        <sidebar-link
          v-for="(link, index) in sidebarLinks"
          :key="link.name + index"
          :to="link.path"
          :link="link"
        >
        </sidebar-link>
      </slot>
    </md-list>
  </div>
</template>

<script>
import SidebarLink from "./SidebarLink.vue";
import API_CONSTANTS from "../../Constants/API";
import { getStoredItems } from "../../services/localStorage";

export default {
  components: {
    SidebarLink,
  },
  props: {
    sidebarLinks: {
      type: Array,
      default: () => {
        const profile = getStoredItems(API_CONSTANTS.indokargo).profile;
        let arr = [];
        if (profile.role === "asset_user") {
          arr.push({
            icon: "account_circle",
            path: "",
            name:
              profile.primary_login === "email"
                ? this.localStorage.profile.email
                : this.localStorage.profile.phone,
          });
        } else {
          arr.push({
            icon: "account_circle",
            path: "",
            name: profile.customer.company,
          });
        }
        return [
          ...arr,
          { name: "Locations", path: "locations", icon: "dashboard" },
          {
            name: "Active Movement Jobs",
            path: "active-movement-jobs",
            icon: "dashboard",
          },
          { name: "Moved Jobs", path: "moved-jobs", icon: "dashboard" },
        ];
      },
    },
  },
  name: "DashboardCoreSideBar",
  data: () => ({
    menuVisible: false,
    imgLogo: {
      type: String,
      default: require("@/assets/indo-kargo-logo.png"),
    },
    sidebarBackgroundImage: {
      type: String,
      default: require("@/assets/sidebar-1.jpg"),
    },
  }),
  computed: {
    sidebarStyle() {
      return {
        backgroundImage: `url(${this.sidebarBackgroundImage})`,
      };
    },
  },
  created: () => {},
};
</script>

<style scoped>
.logo {
  padding: 15px 0px;
  margin: 0;
  display: block;
  position: relative;
  z-index: 4;
  background-color: white;
}

.version {
  position: absolute;
  font-size: 11px;
  text-align: center;
  width: 100%;
  bottom: -5px;
}

.logo-img {
  width: auto;
  display: block;
  margin-left: 13px;
  margin-right: 15px;
  max-height: initial;
  text-align: center;
}
.logo-img img {
  width: 120px;
  position: static;
}
</style>