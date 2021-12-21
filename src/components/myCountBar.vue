<template>
  <div>
    <b-card body-class="text-center">
      <template #header>
        <slot name="header"></slot>
      </template>

      <b-card-body>
        <b-container style="max-width: 210px">
          <div v-for="(row, rIndex) in onShowItems" :key="rIndex">
            <b-row>
              <b-col cols="4" v-for="(item, iIndex) in row" :key="iIndex">
                <b-button pill variant="success" @click="handleSelect(item)">
                  {{ (currentPage - 1) * per_page_props + rIndex * 3 + iIndex + 1 }}
                </b-button>
              </b-col>
            </b-row>
            <br>
          </div>
        </b-container>
      </b-card-body>

      <div style="display: flex;justify-content: center">
        <b-pagination
            v-model="currentPage"
            :total-rows="total_rows_props"
            :per-page="per_page_props"
            pills
            size="sm"
        ></b-pagination>
      </div>


      <b-card-footer>
        <slot name="footer"></slot>
      </b-card-footer>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "myCountBar",
  props: {
    currentPage_props: Number,
    total_rows_props: Number,
    per_page_props: Number,
    items: Array,
  },
  data() {
    return {
      currentPage: this.currentPage_props
    }
  },
  watch: {
    currentPage: function (newVal) {
      this.$emit("updatePage", newVal)
    },
  },
  computed: {
    onShowItems: function () {
      const result = []
      for (let i = 0; i < this.items.length; i += 3) {
        const rowResult = []
        for (let j = i; j < i + 3 && j < this.items.length; j++) {
          if (j >= (this.currentPage - 1) * this.per_page_props
              && j < this.currentPage * this.per_page_props) {
            rowResult.push(this.items[j])
          }
        }
        if (rowResult.length)
          result.push(rowResult)
      }
      return result
    }
  },
  methods: {
    handleSelect(item) {
      this.$emit("onSelect", item)
    }
  }
}
</script>

<style scoped>

</style>