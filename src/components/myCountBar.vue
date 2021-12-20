<template>
  <div>
    <b-card body-class="text-center">
      <template #header>
        {{ title }}
      </template>

      <b-card-body>
        <b-container style="max-width: 210px">
          <b-row>
            <b-col cols="4">
              <b-button pill variant="success">1</b-button>
            </b-col>
            <b-col cols="4">
              <b-button pill variant="success">2</b-button>
            </b-col>
            <b-col cols="4">
              <b-button pill variant="success">3</b-button>
            </b-col>
          </b-row>
          <br>
          <b-row>
            <b-col cols="4">
              <b-button pill variant="success">4</b-button>
            </b-col>
            <b-col cols="4">
              <b-button pill variant="success">5</b-button>
            </b-col>
            <b-col cols="4">
              <b-button pill variant="success">6</b-button>
            </b-col>
          </b-row>
          <br>
          <b-row>
            <b-col cols="4">
              <b-button pill variant="success">7</b-button>
            </b-col>
            <b-col cols="4">
              <b-button pill variant="success">8</b-button>
            </b-col>
            <b-col cols="4">
              <b-button pill variant="success">9</b-button>
            </b-col>
          </b-row>
          <br>
          <b-row>
            <b-col cols="4">
              <b-button pill variant="success">10</b-button>
            </b-col>
            <b-col cols="4">
              <b-button pill variant="success">11</b-button>
            </b-col>
            <b-col cols="4">
              <b-button pill variant="success">12</b-button>
            </b-col>
          </b-row>
          <br>
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
        <slot></slot>
      </b-card-footer>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "myCountBar",
  props: {
    title: String,
    currentPage_props: Number,
    total_rows_props: Number,
    per_page_props: Number,
  },
  data() {
    return {
      currentPage: this.currentPage_props
    }
  },
  watch: {
    currentPage: function (newVal) {
      this.$emit("updatePage", newVal)
    }
  }
}
</script>

<style scoped>

</style>