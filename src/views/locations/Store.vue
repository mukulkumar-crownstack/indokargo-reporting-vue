<template>
  <div class="md-layout">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card>
        <md-card-content>
        <h6 class="text-secondary">{{store.id_number}} - {{store.company_name}}</h6>
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
import { getStoreList } from "../../services/userService";
import { getLocationById } from "../../services/userService";
import { formatDate } from "../../utils/utils";

export default {
  name: "Store",
  components: { SimpleTable },
  props: {},
  data: () => ({
    items: {
      current_page: 1,
      per_page: 10,
      data: [],
    },
    store: {
        id_number: null
    },
    fields: [
      {
        key: "asset_code",
        label: "Asset Code",
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
        key: "started_on",
        label: "Started On",
        sortable: false,
      },
      {
        key: "ended_on",
        label: "Ended On",
        sortable: false,
      },
      {
        key: "created_by",
        label: "Created By",
        sortable: false,
      },
      {
        key: "moved_by",
        label: "Moved By",
        sortable: false,
      },
    ],
  }),
  mounted() {
    try {
        this.generateList({page: this.items.current_page, per_page: this.items.per_page});
        this.getLocation();
    } catch (err) {
      this.error = err;
      console.log(err);
    }
  },
  methods: {
      changePage (page){
        this.generateList(page);
      },
      async generateList(pageObj){
        const storeListRes = await getStoreList(this.$route.params.storeId, pageObj);
        if (storeListRes.data.length) {
          this.items.data = storeListRes.data[0].data.map((element) => {
          return {
            asset_code: element.qr_code,
            from:   (element.source_address  != null)
                        ?   ((element.source_address  != null) && (element.destination_address != null)) 
                                ? (element.source_address.id_number && element.source_address.company_name) 
                                    ? `${element.source_address.id_number} - ${element.source_address.company_name}`
                                    : ''
                                : 'System'
                        : '',
            to :    (element.destination_address  != null) 
                        ? ((element.source_address  != null) && (element.destination_address != null)) 
                                        ? (element.destination_address?.id_number && element.destination_address.company_name) 
                                            ? `${element.destination_address.id_number} - ${element.destination_address.company_name}`
                                            : ''
                                        : 'System'
                        : '',
            started_on: formatDate(element.created_at),
            ended_on: (element?.assigned_job_uid == null) 
                        ? formatDate(element?.updated_at)
                        : (element?.assigned_job?.status.includes('delivered') || element?.assigned_job?.status.includes('completed') || element?.assigned_job?.status.includes('void'))
                            ? formatDate(element?.updated_at)
                            : 'In-Progress',
            created_by: (element?.assigned_job !== null)
                            ? (element?.assigned_job !== null && element?.assigned_job.job.operation_rep == null) 
                                ? element?.assigned_job.customer.company
                                : (element?.assigned_job.job.operation_rep.name !== null)
                                    ? element?.assigned_job.job.operation_rep.name
                                    : (element?.assigned_job.job.operation_rep.name.user.primary_login === 'email')
                                        ? element?.assigned_job.job.operation_rep.name.user.email
                                        : element?.assigned_job.job.operation_rep.name.user.phone 
                            : '',
            moved_by: (element.assigned_job !== null)
                            ? (element.assigned_job.driver == null)
                                ? element.assigned_job.customer.company
                                : (element.assigned_job.driver.name !== null)
                                    ? element.assigned_job.driver.name
                                    : element.assigned_job.driver.user.primary_login === 'email'
                                        ? element.assigned_job.driver.user.email
                                        : element.assigned_job.driver.user.phone 
                            : ''
          };
        });
        this.items.per_page = storeListRes.data[0].per_page;
        this.items.current_page = storeListRes.data[0].current_page;
        this.items.total = storeListRes.data[0].total;
      }       
    },
    async getLocation(){
        const locationRes = await getLocationById(this.$route.params.storeId);
        if (locationRes.data.length) {
            this.store = locationRes.data[0];
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
 