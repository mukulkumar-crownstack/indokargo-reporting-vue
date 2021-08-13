<template>
  <div class="md-layout">
    <!-- <div class="p-4"> -->
    <div
      v-for="(card, index) in cards"
      :key="card.title + index"
      class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
    >
      <stats-card :data-background-color="card.color">
        <template slot="header">
          <md-icon>{{ card.icon }}</md-icon>
        </template>

        <template slot="content">
          <p class="category">{{ card.title }}</p>
          <h3 class="title">{{ card.value }}</h3>
        </template>
      </stats-card>
    </div>

    <!-- </div> -->
    <div class="md-layout-item">
      <md-card class="px-4">
        <md-field>
          <label
            >Search by QR Code, Store ID, Name, Brand, AssetType and
            Model</label
          >
          <md-input v-model="initial" readonly></md-input>
        </md-field>
      </md-card>
    </div>

    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-15">
              <md-field>
                <label for="movies">Filter by Region</label>
                <md-select
                  :md-ripple="false"
                  v-model="filterByRegion"
                  name="filterByRegion"
                  id="filterByRegion"
                  multiple
                >
                  <md-option value="fight-club">Fight Club</md-option>
                  <md-option value="godfather">Godfather</md-option>
                  <md-option value="godfather-ii">Godfather II</md-option>
                  <md-option value="godfather-iii">Godfather III</md-option>
                  <md-option value="godfellas">Godfellas</md-option>
                  <md-option value="pulp-fiction">Pulp Fiction</md-option>
                  <md-option value="scarface">Scarface</md-option>
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-size-15">
              <md-field>
                <md-select
                  :md-ripple="false"
                  v-model="filterByCountry"
                  name="filterByCountry"
                  id="filterByCountry"
                  placeholder="Filter By Country"
                >
                  <md-option value="australia">Australia</md-option>
                  <md-option value="brazil">Brazil</md-option>
                  <md-option value="japan">Japan</md-option>
                  <md-option value="united-states">United States</md-option>
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-size-20 mt-3">
              <md-checkbox v-model="warehouseOnly">Warehouse Only</md-checkbox>
            </div>
            <div class="md-layout-item md-accent md-size-15 mt-2">
              <md-button class="md-icon-button md-raised p-2">
                <md-icon>delete</md-icon>
              </md-button>
            </div>
            <div class="md-layout-item md-size-15 mt-1">
              <md-button class="md-raised md-accent">Download</md-button>
            </div>
          </div>
          <simple-table table-header-color="red"></simple-table>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import StatsCard from "../../components/cards/StatsCard";
import SimpleTable from "../../components/table/SimpleTable";
import API_CONSTANTS from "../../Constants/API";
import { getLocationsService } from "../../services/userService";

export default {
  name: "Locations",
  components: { StatsCard, SimpleTable },
  props: {
    cards: {
      type: Array,
      default: () => [
        {
          color: "green",
          icon: "store",
          title: "Total Store Locations",
          value: "2",
        },
        {
          color: "red",
          icon: "qr_code",
          title: "Total Store with Asset Codes",
          value: "12",
        },
        {
          color: "red",
          icon: "qr_code",
          title: "Total Asset Codes",
          value: "22",
        },
        {
          color: "red",
          icon: "qr_code",
          title: "Total Warehouse Asset Codes",
          value: "2",
        },
        {
          color: "green",
          icon: "store",
          title: "Filtered Store Locations",
          value: "1",
        },
        {
          color: "red",
          icon: "qr_code",
          title: "Filtered Store with Asset Codes",
          value: "12",
        },
        {
          color: "red",
          icon: "qr_code",
          title: "Filtered Asset Codes",
          value: "22",
        },
        {
          color: "red",
          icon: "qr_code",
          title: "Filtered Warehouse Asset Codes",
          value: "2",
        },
      ],
    },
  },
  data: () => ({
    initial: null,
    filterByRegion: null,
    warehouseOnly: null,
    filterByCountry: null,
  }),
  async created() {
    try {
      console.log(API_CONSTANTS.GET_LOCATIONS);
      const response = await getLocationsService();
      console.log(response);
      this.data = response.data[0].data.data;
    } catch (err) {
      this.error = err;
    }
  },
};
</script>

<style>
.md-app-content {
  background: #eee;
}
.md-menu-content {
  background: #fff;
  margin-top: 48px;
  /* max-width: 280px !important; */
}
.md-ripple > span {
  left: 50px;
  top: 16px;
}
</style>
 