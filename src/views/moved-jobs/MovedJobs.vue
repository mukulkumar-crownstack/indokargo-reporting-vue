<template>
  <div class="md-layout">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-15">
              <md-field>
                <label>Search by Job No.</label>
                <md-input v-model="initial"></md-input>
              </md-field>
            </div>
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
              <md-datepicker v-model="startDate" md-immediately />
            </div>
            <div class="md-layout-item md-size-15">
              <md-datepicker v-model="endDate" md-immediately />
            </div>
            <div class="md-layout-item md-accent md-size-15 mt-2">
              <md-button
                @click="clearFilters"
                class="md-icon-button md-primary md-raised p-2"
              >
                <md-icon>delete</md-icon>
              </md-button>
            </div>
            <div class="md-layout-item md-size-15 mt-1">
              <md-button @click="download" class="md-raised md-primary"
                >Download</md-button
              >
            </div>
          </div>
          <simple-table
            table-header-color="red"
            :items="items"
            :fields="fields"
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
import SimpleTable from "../../components/table/SimpleTable";
import { getRegionList } from "../../services/userService";
import { getActiveMovementJobsList } from "../../services/userService";
import { exportJobs } from "../../services/userService";
import { formatDate } from "../../utils/utils";

export default {
  name: "MovedJobs",
  components: { SimpleTable },
  props: {},
  data: () => ({
    items: {
      current_page: 1,
      per_page: 10,
      data: [],
    },
    params: {},
    regionOptions: [],
    q: null,
    regions: [],
    startDate: formatDate(new Date(), "yyyy-MM-dd"),
    endDate: formatDate(new Date(), "yyyy-MM-dd"),
    initial: null,
    store: {
      id_number: null,
    },
    fields: [
      {
        key: "job_number",
        label: "Job Number",
        sortable: false,
      },
      {
        key: "asset_code",
        label: "Asset Code",
        sortable: false,
      },
      {
        key: "created_at",
        label: "Created At",
        sortable: false,
      },
      {
        key: "from",
        label: "From",
        sortable: false,
      },
      {
        key: "to",
        label: "To",
        sortable: false,
      },
      {
        key: "driver",
        label: "Driver",
        sortable: false,
      },
    ],
  }),
  mounted() {
    try {
      this.generateList({
        page: this.items.current_page,
        per_page: this.items.per_page,
        status: "completed",
      });
      this.getRegions();
    } catch (err) {
      this.error = err;
      console.log(err);
    }
  },
  computed: {
    dateFormat() {
      return this.$material.locale.dateFormat || "yyyy-MM-dd";
    },
  },
  methods: {
    changePage(page) {
      this.generateList(page);
    },
    async generateList(pageObj) {
      const movedJobsListRes = await getActiveMovementJobsList(pageObj);
      if (movedJobsListRes.data.length) {
        this.items.data = movedJobsListRes.data[0].data.map((element) => {
          return {
            job_number: element.assigned_job.job.sn || "N/A",
            asset_code: element.qr_code || "N/A",
            created_at: formatDate(element.created_at),
            from:
              element.source_address != null
                ? element.source_address != null &&
                  element.destination_address != null
                  ? element.source_address.id_number &&
                    element.source_address.company_name
                    ? `${element.source_address.id_number} - ${element.source_address.company_name}`
                    : ""
                  : "System"
                : "",
            to:
              element.destination_address != null
                ? element.source_address != null &&
                  element.destination_address != null
                  ? element.destination_address?.id_number &&
                    element.destination_address.company_name
                    ? `${element.destination_address.id_number} - ${element.destination_address.company_name}`
                    : ""
                  : "System"
                : "",
            driver: element.assigned_job.driver
              ? element.assigned_job.driver.name
              : "N/A",
          };
        });
        this.items.per_page = movedJobsListRes.data[0].per_page;
        this.items.current_page = movedJobsListRes.data[0].current_page;
        this.items.total = movedJobsListRes.data[0].total;
      }
    },
    async getRegions() {
      const regionRes = await getRegionList();
      if (regionRes.data.length) {
        this.regionOptions = regionRes.data;
      }
    },
    filterByRegion(region) {
      if (region.length) {
        region.forEach((id, idx) => {
          this.params[`region[${idx}]`] = id;
        });
        this.generateList({
          page: 1,
          per_page: this.items.per_page,
          status: "completed",
          ...this.params,
        });
      }
    },
    clearFilters() {
      this.params = {};
      this.initial = null;
      this.regions = [];
      this.startDate = null;
      this.endDate = null;
      this.generateList({
        page: 1,
        per_page: this.items.per_page,
        status: "completed",
        ...this.params,
      });
    },
    async download() {
      const exportRes = await exportJobs({
        page: this.items.current_page,
        per_page: this.items.per_page,
        status: "completed",
        ...this.params,
      });
      console.log(exportRes)
      if (exportRes.statusText === 'OK') {
        var link = document.createElement("a");
        const blob = new Blob([exportRes.body], {
          type: "application/octet-stream",
        });
        link.href = window.URL.createObjectURL(blob);
        link.download = "moved_jobs.xlsx";
        link.click();
      }
    },
  },
  watch: {
    initial: {
      handler: function (val) {
        console.log(val);
        setTimeout(() => {
          this.params = { ...this.params, q: val };
          this.generateList({
            page: 1,
            per_page: this.items.per_page,
            status: "completed",
            ...this.params,
          });
        }, 1000);
      },
    },
    startDate: {
      handler: function (val) {
        this.params = { ...this.params, startDate: val };
        this.generateList({
          page: 1,
          per_page: this.items.per_page,
          status: "completed",
          ...this.params,
        });
      },
    },
    endDate: {
      handler: function (val) {
        console.log(val);
        this.params = { ...this.params, endDate: val };
        this.generateList({
          page: 1,
          per_page: this.items.per_page,
          status: "completed",
          ...this.params,
        });
      },
    },
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
.md-datepicker-dialog {
  background: white;
}
</style>
 