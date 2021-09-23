<template>
  <div class="md-layout">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card>
        <md-card-content>
          <div class="md-layout-item md-size-25">
            <md-field>
              <label>Search by Job No.</label>
              <md-input v-model="initial"></md-input>
            </md-field>
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
import { getActiveMovementJobsList } from "../../services/userService";
import { formatDate } from "../../utils/utils";

export default {
  name: "ActiveMovementJobs",
  components: { SimpleTable },
  props: {},
  data: () => ({
    items: {
      current_page: 1,
      per_page: 10,
      data: [],
    },
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
        status: "active",
      });
    } catch (err) {
      this.error = err;
      console.log(err);
    }
  },
  methods: {
    changePage(page) {
      this.generateList(page);
    },
    async generateList(pageObj) {
      const activeJobsListRes = await getActiveMovementJobsList(pageObj);
      if (activeJobsListRes.data.length) {
        console.log(activeJobsListRes);
        this.items.data = activeJobsListRes.data[0].data.map((element) => {
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
        this.items.per_page = activeJobsListRes.data[0].per_page;
        this.items.current_page = activeJobsListRes.data[0].current_page;
        this.items.total = activeJobsListRes.data[0].total;
      }
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
              status: "active",
              ...this.params,
            });
          }, 1000);
        },
      },
    },
  },
};
</script>