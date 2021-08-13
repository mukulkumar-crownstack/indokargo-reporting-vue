<template>
  <div>
    <b-table
      :head-variant="'danger'"
      id="my-table"
      :items="users"
      :fields="fields"
    ></b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
  </div>
</template>

<script>
export default {
  name: "simple-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      selected: [],
      computed: {
        rows() {
          return this.items.length;
        },
      },
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
          key: "store_name	",
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
      users: [
        {
          asset_code: "Dakota Rice",
          city: "kabana",
          address: "Niger",
          provice: "Oud-Turnhout",
        },
        {
          asset_code: "Dakota Rice",
          city: "kabana",
          address: "Niger",
          provice: "Oud-Turnhout",
        },
        {
          asset_code: "Dakota Rice",
          city: "kabana",
          address: "Niger",
          provice: "Oud-Turnhout",
        },
        {
          asset_code: "Dakota Rice",
          city: "kabana",
          address: "Niger",
          provice: "Oud-Turnhout",
        },
        {
          asset_code: "Dakota Rice",
          city: "kabana",
          address: "Niger",
          provice: "Oud-Turnhout",
        },
      ],
    };
  },
};
</script>
