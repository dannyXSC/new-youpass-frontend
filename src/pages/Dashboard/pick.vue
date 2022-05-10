<template>
  <div>
    <page-title
      :heading="heading"
      :subheading="subheading"
      :icon="icon"
      :breadcrumb-item="breadcrumbItem"
    ></page-title>
    <b-col cols="8"> </b-col>

    <div class="main-card mb-3 card">
      <div class="card-body">
        <div class="modal-body">
          <div>
            <Form>
              <b-col md="12">
                <b-form-group>
                  <b-container>
                    <b-row>
                      <b-col cols="8">
                        <b-form-input
                          type="text"
                          placeholder="在此搜索课程..."
                          v-model="inputContent"
                          @keyup.enter="search(searchMethod)"
                        />
                      </b-col>

                      <b-col cols="4">
                        <b-dropdown
                          no-flip
                          split
                          text="搜索"
                          class="mb-2 mr-2"
                          variant="primary"
                          @click="search(searchMethod)"
                        >
                          <button
                            type="button"
                            tabindex="1"
                            class="dropdown-item"
                            @click="search(1)"
                          >
                            按照课号搜索
                          </button>
                          <button
                            type="button"
                            tabindex="2"
                            class="dropdown-item"
                            @click="search(2)"
                          >
                            按照课程名搜索
                          </button>
                          <button
                            type="button"
                            tabindex="3"
                            class="dropdown-item"
                            @click="search(3)"
                          >
                            按照教师搜索
                          </button>
                        </b-dropdown>
                      </b-col>
                    </b-row>
                  </b-container>
                </b-form-group>
              </b-col>
            </Form>
          </div>

          <div class="modal-body">
            <div>
              <my-list title="课程搜索结果" y :items="items" :fields="fields">
                <template slot-scope="row">
                  <b-card class="mb-3 nav-justified" no-body>
                    <b-tabs pills card>
                      <b-tab title="教师信息" active>
                        <li class="list-group-item">
                          <div class="widget-content p-0">
                            <div class="widget-content-wrapper">
                              <div class="widget-content-left">
                                <div class="widget-heading">
                                  {{ row.row.item.teacher_name }}
                                </div>
                                <div class="widget-subheading">
                                  {{ row.row.item.teacher_id }}
                                </div>
                              </div>
                              <div class="widget-content-right">
                                <button
                                  type="button"
                                  class="btn btn-light"
                                  v-b-modal.PasswordIn
                                  @click="attendCourse(row.row.item.courseId)"
                                  :disabled="row.row.item.exist"
                                >
                                  加入课程
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      </b-tab>
                      <b-tab title="授课信息" active>
                        <div class="card-body">
                          <ul class="list-group">
                            <li class="list-group-item">
                              <b-container>
                                <b-row>
                                  <b-col cols="8">
                                    <h5>课程名称</h5>
                                  </b-col>
                                  <b-col cols="4"> <h6>{{ row.row.item.courseName }}</h6></b-col>
                                </b-row>
                              </b-container>
                            </li>
                            <li class="list-group-item">
                              <b-container>
                                <b-row>
                                  <b-col cols="8">
                                    <h5>授课时间</h5>
                                  </b-col>
                                  <b-col cols="4"> <h6>{{ row.row.item.courseTime }}</h6></b-col>
                                </b-row>
                              </b-container>
                            </li>
                          </ul>
                        </div>
                      </b-tab>
                      <b-tab title="上课方式">
                        <div class="card-body">
                          <ul class="list-group">
                            <li class="list-group-item">
                              <b-container>
                                <b-row>
                                  <b-col cols="8">
                                    <h5>课程链接</h5>
                                  </b-col>
                                  <b-col cols="4"> <h6>{{ row.row.item.url }}</h6></b-col>
                                </b-row>
                              </b-container>
                            </li>
                          </ul>
                        </div>
                      </b-tab>
                    </b-tabs>
                  </b-card>
                </template>
              </my-list>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal ok-title="确认" cancel-title="取消" id="PasswordIn" @ok="submitAttend">
      <b-form>
        <b-form-input placeholder="请输入密码" v-model="attendCoursePassword">
        </b-form-input>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import PageTitle from "@/layout/Components/PageTitle.vue";
import MyList from "@/components/myList";
import {searchCourse1, searchCourse2, searchCourse3 ,attendCourse} from "@/api";

export default {
  name: "pick",
  components: { MyList, PageTitle },
  data() {
    return {
      attendCourseId:0,
      attendCoursePassword:'',
      heading: "搜索课程",
      subheading:
        "",
      icon: "pe-7s-plane icon-gradient bg-tempting-azure",

      fields: ["课程名称", "课程编号","授课教师"],

      searchMethod: 2,
      inputContent: "",
      breadcrumbItem: [
        {
          text: "",
          active: true,
        },
      ],
      searchedCourse:[]
    };
  },
  computed: {
    items() {
      let return_item = [];
      for (let i = 0; i < this.searchedCourse.length; ++i) {
        return_item.unshift({
          _showDetails: false,
          isActive: true,
          课程名称: this.searchedCourse[i].name,
          courseName:this.searchedCourse[i].name,
          课程编号: this.searchedCourse[i].courseId,
          courseId:this.searchedCourse[i].courseId,
          password:this.searchedCourse[i].password,
          teacher_id:
            this.searchedCourse[i].teacherId,
          teacher_name: this.searchedCourse[i].teacherName,
          授课教师:this.searchedCourse[i].teacherName,
          url:this.searchedCourse[i].url,
          courseTime:this.searchedCourse[i].courseTime,
          exist:this.searchedCourse[i].exist
        });
      }
      return return_item;
    },
  },
  methods: {
    search(method) {
      if (this.inputContent !== "") {
        if (method === 1) {
          // 课号
          searchCourse1(this.inputContent).then((res)=>{
            if(res.code===100){
              this.searchedCourse=res.data
              this.inputContent = "";
              this.searchMethod = 1;
            }
            else{
              this.$bvToast.toast("未检索到相关课程信息", {
                title: "提示",
                variant: "danger",
                solid: true,
                autoHideDelay: 2000
              });
            }
          })
        } else if (method === 2) {
          // 课程名
          searchCourse2(this.inputContent).then((res)=>{
            if(res.code===100){
              this.searchedCourse=res.data
              this.inputContent = "";
              this.searchMethod = 2;
            }
            else{
              this.$bvToast.toast("未检索到相关课程信息", {
                title: "提示",
                variant: "danger",
                solid: true,
                autoHideDelay: 2000
              });
            }
          })
        } else if (method === 3) {
          // 教师
          searchCourse3(this.inputContent).then((res)=>{
            if(res.code===100){
              this.searchedCourse=res.data
              this.inputContent = "";
              this.searchMethod = 3;
            }
            else{
              this.$bvToast.toast("未检索到相关课程信息", {
                title: "提示",
                variant: "danger",
                solid: true,
                autoHideDelay: 2000
              });
            }
          })
        }
      } else {
        alert("搜索内容不可为空!");
      }
    },
    attendCourse(courseId){
      this.attendCourseId=courseId
    },
    submitAttend(){
      attendCourse(this.attendCourseId,this.attendCoursePassword,this.$store.state.global.id).then(res=>{
        this.$bvToast.toast(res.data, {
          title: "提示",
          variant: "success",
          solid: true,
          autoHideDelay: 2000
        });
      })
      this.searchedCourse=[]
    }
  },
  mounted() {},
  beforeDestroy() {},
};
</script>

<style scoped>
</style>
