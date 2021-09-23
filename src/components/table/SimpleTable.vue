<template>
  <div>
    <b-table
      :head-variant="'danger'"
      id="my-table"
      :items="items.data"
      :fields="fields"
    >
      <template #cell(asset_code)="data">
        <span @click="cellClicked(data, 'asset_code')">{{
          data.value
        }}</span>
      </template>
      <template #cell(store_id)="data">
        <span @click="cellClicked(data, 'store_id')">{{ data.value }}</span>
      </template>
    </b-table>
    <div class="d-flex bt-1 pt-3">
      <div class="d-flex">
          <small class="text-secondary w-50">Items Per Page</small>
          <b-form-select class="w-50" v-model="perPage" :options="pageOptions"></b-form-select>
      </div>
      <small class="text-secondary mx-2">of {{total}}</small>
      <b-pagination
        v-model="currentPage"
        :per-page="perPage"
        :total-rows="total"
        aria-controls="my-table"
        size="md"
        class="mx-2"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "simple-table",
  props: ["items", "fields"],
  data() {
    return {
      perPage: this.items.per_page,
      currentPage: this.items.current_page,
      total: this.items.total,
      pageOptions: [10, 25, 50, {
        value: Number.MAX_SAFE_INTEGER,
        text: "Show All"
      }],
    };
  },
  methods: {
    cellClicked(data, name) {
      this.$emit('clicked',{name: name, index: data.index});
    },
  },
  watch: {
    currentPage: {
      handler: function(value) {
        this.$emit('paginate',{page: value, per_page: this.perPage});
      }
    },
    perPage: {
      handler: function(value) {
        // console.log(value )
        this.$emit('paginate',{page: this.currentPage, per_page: value});
      }
    },
    total :{
      handler: function(newValue) {
      console.log(newValue)
      this.total = newValue.total;
    }}
  }
};
</script>

<style>
  .w-15{
    width: 15%;
  }
  td {
    word-wrap: break-word;
    max-width: 100px;
  }
  .bt-1{
    border-top: 1px solid #f1f1f1;
  }
</style>