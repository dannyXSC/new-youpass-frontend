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
      <template #empty="row">
        <b-img center src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01d29258cce264a801219c77ec3f60.png%402o.png&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655987460&t=cc85ebbf726f565a3a7111c662405ba9" height="480" width="480"></b-img>

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
