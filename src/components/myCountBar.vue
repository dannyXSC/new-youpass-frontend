<template>
  <div>
    <b-card body-class="text-center">
      <template #header>
        相关信息
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
            :total-rows="20"
            :per-page="1"
            pills
            size="sm"
        ></b-pagination>
      </div>


      <b-card-footer>
        <b-row class="justify-content-between">
          <b-col cols="8" md="auto">
            <div>
              <b-button pill variant="outline-primary">添加</b-button>
              <b-button pill variant="outline-danger" style="margin-left: 5px">删除</b-button>
            </div>
          </b-col>
          <b-col cols="4" md="auto">
            <b-button pill variant="warning">提交</b-button>
          </b-col>
        </b-row>
      </b-card-footer>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "myCountBar"
}
</script>

<style scoped>

</style>