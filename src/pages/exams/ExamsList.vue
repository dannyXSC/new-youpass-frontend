<template>
  <div>
    <b-card class="main-card mb-4">
      <b-row>
        <b-col lg="12">
          <b-form-group
            type="primary"
            label="Filter"
            label-for="filter-input"
            label-cols-sm="1"
            label-align-sm="center"
            label-size="md"
            class="font-weight-bold"
            size="sm"
          >
            <b-input-group size="md">
              <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder="Type to Search"
                class="ml-0"
              ></b-form-input>

              <b-input-group-append>
                <b-button
                  variant="warning"
                  class="mr-3"
                  :disabled="!filter"
                  @click="filter = ''"
                  >Clear</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="12">
          <b-table
            class="ml-30"
            hover
            :striped="striped"
            :bordered="bordered"
            :outlined="outlined"
            :items="responseList"
            :fields="fields"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :current-page="currentPage"
            :per-page="5"
            :filter="filter"
            :filter-included-fields="filterOn"
            sort-icon-left
            @filtered="onFiltered"
          >
          </b-table>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="8"> </b-col>
        <b-col sm="4">
          <b-pagination
            variant="warning"
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="5"
            align="fill"
            size="sm"
            class="my-0"
          ></b-pagination>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "ExamsList",
  props: ["responseList"],
  data() {
    return {
      sortBy: "name",
      sortDesc: false,
      currentPage: 1,
      totalRows: "",
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      striped: false,
      bordered: false,
      outlined: false,
      small: false,

      fields: [
        { key: "name", label: "考试名称", sortable: true },
        { key: "value", label: "分数", sortable: true },
      ],
    };
  },
  mounted() {
    // Set the initial number of items
    console.log("!!!" + this.responseList);
    this.totalRows = this.responseList.length;
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>
