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
          <md-input v-model="initial"></md-input>
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
                  v-model="regions"
                  @md-selected="filterByRegion"
                  name="filterByRegion"
                  id="filterByRegion"
                  multiple
                >
                  <md-option
                    v-for="region in regionOptions"
                    :key="region.id"
                    :value="region.id"
                    >{{ region.region }}</md-option
                  >
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-size-15">
              <md-field>
                <md-select
                  :md-ripple="false"
                  v-model="country"
                  @md-selected="filterByCountry"
                  name="country"
                  id="country"
                  placeholder="Filter By Country"
                >
                  <md-option
                    v-for="country in countryOptions"
                    :key="country.id"
                    :value="country.id"
                    >{{ country.name }}</md-option
                  >
                </md-select>
              </md-field>
            </div>
            <div
              v-show="provinceOptions.length"
              class="md-layout-item md-size-15"
            >
              <md-field>
                <md-select
                  :md-ripple="false"
                  v-model="province"
                  @md-selected="filterByProvince"
                  name="filterByProvince"
                  id="filterByProvince"
                  placeholder="Filter By Province"
                >
                  <md-option
                    v-for="province in provinceOptions"
                    :key="province.id"
                    :value="province.id"
                    >{{ province.name }}</md-option
                  >
                </md-select>
              </md-field>
            </div>
            <div v-show="cityOptions.length" class="md-layout-item md-size-15">
              <md-field>
                <md-select
                  :md-ripple="false"
                  v-model="city"
                  @md-selected="filterByCity"
                  name="filterByCity"
                  id="filterByCity"
                  placeholder="Filter By City"
                >
                  <md-option
                    v-for="city in cityOptions"
                    :key="city.id"
                    :value="city.id"
                    >{{ city.name }}</md-option
                  >
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-size-20 mt-3">
              <md-checkbox @change="filterWarehouseOnly" v-model="warehouseOnly">Warehouse Only</md-checkbox>
            </div>
            <div class="md-layout-item md-accent md-size-15 mt-2">
              <md-button @click="clearFilters" class="md-icon-button md-primary md-raised p-2">
                <md-icon>delete</md-icon>
              </md-button>
            </div>
            <div class="md-layout-item md-size-15 mt-1">
              <md-button @click="download" class="md-raised md-primary">Download</md-button>
            </div>
          </div>
          <simple-table
            table-header-color="red"
            :items="items"
            :fields="fields"
            v-on:clicked="navigateTo"
            v-on:paginate="changePage"
          >
            <!-- <template #cell(field1)="data">
              {{ data.item.value }}
            </template> -->
          </simple-table>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import StatsCard from "../../components/cards/StatsCard";
import SimpleTable from "../../components/table/SimpleTable";
import { getLocationSummary } from "../../services/userService";
import { getCountryList } from "../../services/userService";
import { getRegionList } from "../../services/userService";
import { getLocation } from "../../services/userService";
import { exportLocations } from "../../services/userService";
import { getCity } from "../../services/userService";

export default {
  name: "Locations",
  components: { StatsCard, SimpleTable },
  props: {},
  data: () => ({
    initial: null,
    warehouseOnly: false,
    regions: [],
    country: null,
    province: null,
    city: null,
    items: {
      current_page: 1,
      per_page: 10,
      total: 0,
      data: [],
    },
    params: {},
    regionOptions: [],
    countryOptions: [],
    provinceOptions: [],
    cityOptions: [],
    cards: [
      {
        color: "green",
        icon: "store",
        title: "Total Store Locations",
        key: "total_stores",
        value: null,
      },
      {
        color: "red",
        icon: "qr_code",
        title: "Total Store with Asset Codes",
        key: "total_qr_stores",
        value: null,
      },
      {
        color: "red",
        icon: "qr_code",
        title: "Total Asset Codes",
        key: "total_qr_code",
        value: null,
      },
      {
        color: "red",
        icon: "qr_code",
        title: "Total Warehouse Asset Codes",
        key: "total_warehouse_qr",
        value: null,
      },
      {
        color: "green",
        icon: "store",
        title: "Filtered Store Locations",
        key: "filtered_total_stores",
        value: null,
      },
      {
        color: "red",
        icon: "qr_code",
        title: "Filtered Store with Asset Codes",
        key: "filtered_total_qr_stores",
        value: null,
      },
      {
        color: "red",
        icon: "qr_code",
        title: "Filtered Asset Codes",
        key: "filtered_total_qr_code",
        value: null,
      },
      {
        color: "red",
        icon: "qr_code",
        title: "Filtered Warehouse Asset Codes",
        key: "filtered_total_warehouse_qr",
        value: null,
      },
    ],
    fields: [
      {
        key: "asset_code",
        label: "Asset Code",
        sortable: false,
      },
      {
        key: "store_id",
        label: "Store ID",
        sortable: false,
      },
      {
        label: "Store Name",
        key: "store_name",
        sortable: false,
      },
      {
        key: "country",
        label: "Country",
        sortable: false,
      },
      {
        key: "province",
        label: "Province",
        sortable: false,
      },
      {
        key: "city",
        label: "City",
        sortable: false,
      },
      {
        key: "address",
        label: "Address",
        sortable: false,
      },
      {
        key: "region",
        label: "Region",
        sortable: false,
      },
    ],
  }),
  mounted() {
    try {
      this.getLocationSummary();
      this.getRegions();
      this.getCountries();
      this.getLocationData({page: this.items.current_page, per_page: this.items.per_page})
    } catch (err) {
      this.error = err;
      console.log(err);
    }
  },
  methods: {
    changePage (page){
      this.getLocationData(page);
    },
    async getLocationData(params){
      const locationRes = await getLocation(params);
      if (locationRes.data.length) {
        this.items.data = locationRes.data[0].data.data.map((ele) => {
          return {
            asset_code: ele.qr_code,
            store_id: ele.address.id_number,
            store_uid: ele.address.id,
            store_name: ele.address.company_name,
            country: ele.address.country.name || "N/A",
            province: ele.address.province.name || "N/A",
            city: ele.address.city,
            address: ele.address.address,
            region: ele.address.region,
            locationId: ele.id,
          };
        });
        this.items.per_page = locationRes.data[0].data.per_page;
        this.items.current_page = locationRes.data[0].data.current_page;
        this.items.total = locationRes.data[0].data.total;
        this.cards[4].value = locationRes.data[0].total_locations;
        this.cards[5].value = locationRes.data[0].data.total;
        this.cards[6].value = locationRes.data[0].total_qr;
        this.cards[7].value = locationRes.data[0].total_warehouse_qr;
      }
    },
    async getCountries (){
      const countryRes = await getCountryList();
       if (countryRes.data.length) {
        this.countryOptions = countryRes.data;
      }
    },
    async getRegions (){
      const regionRes = await getRegionList();
      if (regionRes.data.length) {
        this.regionOptions = regionRes.data;
      }
    },
    async getLocationSummary (){
      const locationSummaryRes = await getLocationSummary();
      if (locationSummaryRes.data.length) {
        this.cards = this.cards.map((ele) => {
          ele.value = locationSummaryRes.data[0][ele.key];
          return ele;
        });
      }
    },
    async getCity(cityId){
      const city = await getCity(cityId);
      if (city.data.length) {
        this.cityOptions = city.data[0].data;
      }
    },
    navigateTo(data) {
      const locationId = this.items.data[data.index].locationId;
      if (data.name === "asset_code") {
        const code = this.items.data[data.index].asset_code;
        this.$router.push({ path: `qr/${code}/${locationId}` });
      }
      if (data.name === "store_id") {
        const code = this.items.data[data.index].store_uid;
        this.$router.push({ path: `store/${code}` });
      }
    }, 
    filterByCountry (val) {
      if (val) {
        const idx = this.countryOptions.findIndex((ele) => ele.id === val);
        if (idx > -1) {
          this.provinceOptions = this.countryOptions[idx].provinces;
        }
        this.params = {...this.params, country: val}
        this.getLocationData({page: 1, per_page: this.items.per_page, ...this.params})
      }
    },
    filterByProvince (val) {
      if (val) {
        const city = this.provinceOptions.find((ele) => ele.id === val);
        if (city && city.id) {
          this.params = {...this.params, province: val}
          this.getLocationData({page: 1, per_page: this.items.per_page, ...this.params})
          this.getCity(val)
        }
      }
    },
    filterByRegion (region) {
      if(region.length){
        region.forEach((id, idx) => {
            this.params[`region[${idx}]`] = id;
        });
        this.getLocationData({page: 1, per_page: this.items.per_page, ...this.params})
      }
    },
    filterByCity (cityId) {
      if(cityId){
        this.params = {...this.params, city: cityId}
        this.getLocationData({page: 1, per_page: this.items.per_page, ...this.params})
      }
    },
    filterWarehouseOnly(val){
      this.params = {...this.params, warehouse_only: val}
      this.getLocationData({page: 1, per_page: this.items.per_page, ...this.params})
    },
    clearFilters(){
      this.params = {};
      this.regions = [];
      this.country = null;
      this.province = null;
      this.city = null;
      this.warehouseOnly = false;
      this.initial = null;
      this.getLocationData({page: 1, per_page: this.items.per_page, ...this.params})
    },
    async download() {
      const exportRes = await exportLocations({
        page: this.items.current_page,
        per_page: this.items.per_page,
        ...this.params,
      });
      if (exportRes.statusText === 'OK') {
        var link = document.createElement("a");
        const blob = new Blob([exportRes.data], {
          type: "application/octet-stream",
        });
        link.href = window.URL.createObjectURL(blob);
        link.download = "locations.xlsx";
        link.click();
      }
    }
  },
  watch: {
    initial: {
      handler: function(val) {
        console.log(val)
        setTimeout(() => {
          this.params = {...this.params, q: val};
          this.getLocationData({page: 1, per_page: this.items.per_page, ...this.params})
        },1000)
      }
    }
  }
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
 