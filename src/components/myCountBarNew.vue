<template>
  <div>
    <b-card body-class="text-center">
      <template #header>
        <slot name="header"></slot>
      </template>

      <b-card-body>
        <b-container fluid style="max-width: 210px">
          <b-row>
            <template v-for="(item,index) in items">
              <b-col cols="4">
                <div class="mb-3">
                  <slot name="button" :item="item">
                    <b-button pill variant="success">
                      {{ index + 1 }}
                    </b-button>
                  </slot>
                </div>
              </b-col>
            </template>
            <!--          <div v-for="(row, rIndex) in onShowItems" :key="rIndex">-->
            <!--            <b-row>-->
            <!--              <b-col cols="4" v-for="(item, iIndex) in row" :key="iIndex">-->
            <!--                <slot name="button" :item="item">-->
            <!--                  <b-button pill variant="success" @click="handleSelect(item)">-->
            <!--                    {{ (currentPage_props - 1) * per_page_props + rIndex * 3 + iIndex + 1 }}-->
            <!--                  </b-button>-->
            <!--                </slot>-->
            <!--              </b-col>-->
            <!--            </b-row>-->
            <!--            <br>-->
            <!--          </div>-->
          </b-row>
        </b-container>
      </b-card-body>

      <!--      <div style="display: flex;justify-content: center">-->
      <!--        <b-pagination-->
      <!--            :total-rows="total_rows_props"-->
      <!--            :per-page="per_page_props"-->
      <!--            pills-->
      <!--            size="sm"-->
      <!--            v-model="currentPage"-->
      <!--            @input="handleChangePage"-->
      <!--        ></b-pagination>-->
      <!--      </div>-->

      <b-card-footer>
        <slot name="footer"></slot>
      </b-card-footer>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "myCountBarNew",
  props: {
    items: Array
  }
}
</script>

<style scoped>

</style>