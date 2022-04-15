<template>
  <b-card class="main-card mb-4">
    <h4>{{ title }}</h4>
    <b-table :items="items" :fields="fields"
             @row-clicked="expandAdditionalInfo"
             thead-class="green-bg bg-dark text-white"
             show-empty
             hover>
      <template #row-details="row">
        <slot :row="row"></slot>
      </template>
    </b-table>
    <slot name="footer"></slot>
  </b-card>

</template>

<script>
export default {
  name: "myList",
  props: {
    title: String,
    items: Array,
    fields: Array,
  },
  methods: {
    expandAdditionalInfo(row, index) {
      // console.log(row._showDetails)
      row._showDetails = !row._showDetails
      if (row._rowVariant)
        row._rowVariant = null
      else {
        if (index % 2) {
          row._rowVariant = 'warning'
        } else {
          row._rowVariant = 'info'
        }
      }
    },
  },

}
</script>

<style scoped>

</style>