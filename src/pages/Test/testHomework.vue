<template>
  <div>
    <div class="mb-3 card">
      <div class="card-header-tab card-header">
        <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
          <i class="header-icon lnr-charts icon-gradient bg-happy-green"> </i>
          Data Statistics
        </div>
      </div>
      <div class="no-gutters row">
        <div class="col-sm-6 col-md-4 col-xl-4">
          <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
            <div class="icon-wrapper rounded-circle">
              <div class="icon-wrapper-bg opacity-10 bg-warning"></div>
              <i class="pe-7s-scissors text-white opacity-8"></i></div>
            <div class="widget-chart-content">
              <div class="widget-subheading">Cash Deposits</div>
              <div class="widget-numbers">1,7M</div>
              <div class="widget-description opacity-8 text-focus">
                <div class="d-inline text-danger pr-1">
                  <font-awesome-icon icon="angle-down"/>
                  <span class="pl-1">54.1%</span>
                </div>
                less earnings
              </div>
            </div>
          </div>
          <div class="divider m-0 d-md-none d-sm-block"></div>
        </div>
        <div class="col-sm-6 col-md-4 col-xl-4">
          <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
            <div class="icon-wrapper rounded-circle">
              <div class="icon-wrapper-bg opacity-9 bg-danger"></div>
              <i class="pe-7s-radio text-white"></i></div>
            <div class="widget-chart-content">
              <div class="widget-subheading">Invested Dividents</div>
              <div class="widget-numbers"><span>9M</span></div>
              <div class="widget-description opacity-8 text-focus">
                Grow Rate:
                <span class="text-info pl-1">
                                    <font-awesome-icon icon="angle-down"/>
                                    <span class="pl-1">14.1%</span>
                                </span>
              </div>
            </div>
          </div>
          <div class="divider m-0 d-md-none d-sm-block"></div>
        </div>
        <div class="col-sm-12 col-md-4 col-xl-4">
          <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
            <div class="icon-wrapper rounded-circle">
              <div class="icon-wrapper-bg opacity-9 bg-success"></div>
              <i class="pe-7s-musiclist text-white"></i></div>
            <div class="widget-chart-content">
              <div class="widget-subheading">Capital Gains</div>
              <div class="widget-numbers text-success"><span>$563</span></div>
              <div class="widget-description text-focus">
                Increased by
                <span class="text-warning pl-1">
                                    <font-awesome-icon icon="angle-up"/>
                                    <span class="pl-1">7.35%</span>
                                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center d-block p-3 card-footer">
        <button class="btn-pill btn-shadow btn-wide fsize-1 btn btn-primary btn-lg">
                  <span class="mr-2 opacity-7">
                      <i class="icon icon-anim-pulse ion-ios-analytics-outline"></i>
                  </span>
          <span class="mr-1">View Complete Report</span>
        </button>
      </div>
    </div>


    <my-list
        title="学生管理"
        :items="items"
        :fields="fields"
    >
      <template slot-scope="row">
        <b-card class="mb-3 nav-justified" no-body>
          <b-tabs pills card>
            <b-tab title="其他功能">
              <div class="widget-content-right">
                <button block
                        type="button"
                        class="btn btn-info md-2 mr-2"
                        @click="checkHomework(row.row.item.id)"
                > 查看作业
                </button>
              </div>
            </b-tab>
          </b-tabs>
        </b-card>
      </template>
    </my-list>
  </div>
</template>

<script>
import {library} from '@fortawesome/fontawesome-svg-core'
import {
  faTrashAlt,
  faCheck,
  faCalendarAlt,
  faAngleDown,
  faAngleUp,
  faTh,
} from '@fortawesome/free-solid-svg-icons'
import {getStudentHomeworkByIdAndCourseId} from "@/api";
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import myList from "@/components/myList";

library.add(
    faTrashAlt,
    faCheck,
    faAngleDown,
    faAngleUp,
    faTh,
    faCalendarAlt,
);

export default {
  name: "testHomeWork",
  props: {
    courseId: Number,
    studentId: Number,
  },
  components: {
    'font-awesome-icon': FontAwesomeIcon,
    "my-list": myList
  },
  data() {
    return {
      homeworkList: [],
      fields: [
        {label: "ID", key: "id"},
        {label: "标题", key: "title"},
        {label: "分数", key: "score"}
      ]
    }
  },
  mounted() {
    getStudentHomeworkByIdAndCourseId(this.studentId, this.courseId).then(res => {
      if (res.code === 100) {
        this.homeworkList = res.data;
        console.log(this.homeworkList)
      } else {
        this.$bvToast.toast("获取作业列表失败", {
          title: "提示",
          variant: "danger",
          solid: true,
          autoHideDelay: 2000
        });
      }
    })
  },
  computed: {
    items() {
      let return_item = [];
      for (let i = 0; i < this.homeworkList.length; ++i) {
        return_item.push({
          _showDetails: false,
          isActive: true,
          id: this.homeworkList[i].id,
          title: this.homeworkList[i].title,
          score: this.homeworkList[i].score,
        });
      }
      return return_item;
    }
  },
  methods: {
    checkHomework(homeworkId) {
    }
  }
}
</script>

<style scoped>

</style>