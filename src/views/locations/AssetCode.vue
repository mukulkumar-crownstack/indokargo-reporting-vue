<template>
  <div class="md-layout">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card>
        <md-card-content>
        <h6 class="text-danger">{{$route.params.qr_code}}</h6>
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
import { getAssetCodeList } from "../../services/userService";
import { formatDate } from "../../utils/utils";

export default {
  name: "AssetCode",
  components: { SimpleTable },
  props: {},
  data: () => ({
    initial: null,
    items: {
      current_page: 1,
      per_page: 10,
      data: [],
    },
    warehouseOnly: null,
    fields: [
      {
        key: "source_address",
        label: "Source Address",
        sortable: false,
      },
      {
        key: "destination_address",
        label: "Destination Address",
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
        this.generateList({page: this.items.current_page, per_page: this.items.per_page})
    //   const locationRes = await getLocationById(this.$route.params.locationId);
    //   if (locationRes.data.length) {
    //     console.log(locationRes);
        // this.items.data = locationRes.data[0].data.data.map((ele) => {
        //   console.log(ele);
        //   return {
        //     asset_code: ele.qr_code,
        //     store_id: ele.address.id_number,
        //     store_name: ele.address.company_name,
        //     country: ele.address.country.name || "N/A",
        //     province: ele.address.province.name || "N/A",
        //     city: ele.address.city,
        //     address: ele.address.address,
        //     region: ele.address.region,
        //     locationId: ele.id,
        //   };
        // });
    //   }
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
        const assetListRes = await getAssetCodeList(this.$route.params.qr_code, pageObj);
        if (assetListRes.data.length) {
          this.items.data = assetListRes.data[0].data.map((element) => {
          return {
            source_address: 
                    (element.source_address  != null)
                        ?  ((element.source_address  != null) && (element.destination_address != null)) 
                                ? (element.source_address.id_number && element.source_address.company_name) 
                                    ? `${element.source_address.id_number} - ${element.source_address.company_name}`
                                    : ''
                                : 'System'
                        : '',
            destination_address : 
                            (element.destination_address  != null)
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
        this.items.per_page = assetListRes.data[0].per_page;
        this.items.current_page = assetListRes.data[0].current_page;
        this.items.total = assetListRes.data[0].total;
      }       
    }
  }
};
</script>