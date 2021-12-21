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
                          text="Search"
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

          <h5>{{ $store.state.global.searchedCourse }}</h5>

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
                                  @click="test(row)"
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
                                    <h5>授课地址</h5>
                                  </b-col>
                                  <b-col cols="4"> <h6>广楼 304</h6></b-col>
                                </b-row>
                              </b-container>
                            </li>
                            <li class="list-group-item">
                              <b-container>
                                <b-row>
                                  <b-col cols="8">
                                    <h5>授课时间</h5>
                                  </b-col>
                                  <b-col cols="4"> <h6>星期一 7-8节</h6></b-col>
                                </b-row>
                              </b-container>
                            </li>
                          </ul>
                        </div>
                      </b-tab>
                      <b-tab title="课程简介">
                        <h6>
                          《数据结构》作为一门独立的课程最早是美国的一些大学开设的，1968年美国唐·欧·克努特教授开创了数据结构的最初体系，他所著的《计算机程序设计技巧》第一卷《基本算法》是第一本较系统地阐述数据的逻辑结构和存储结构及其操作的著作。从20世纪60年代末到70年代初，出现了大型程序，软件也相对独立，结构程序设计成为程序设计方法学的主要内容，人们就越来越重视数据结构，认为程序设计的实质是对确定的问题选择一种好的结构，加上设计一种好的算法。从20世纪70年代中期到80年代初，各种版本的数据结构著作就相继出现。
                          目前在我国，《数据结构》也已经不仅仅是计算机专业的教学计划中的核心课程之一，而且是其它非计算机专业的主要选修课程之一。
                        </h6>
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
  </div>
</template>

<script>
import PageTitle from "@/layout/Components/PageTitle.vue";
import MyList from "@/components/myList";

export default {
  name: "pick",
  components: { MyList, PageTitle },
  data() {
    return {
      heading: "Standard Buttons",
      subheading:
        "Wide selection of buttons that feature different styles for backgrounds, borders and hover options!",
      icon: "pe-7s-plane icon-gradient bg-tempting-azure",

      fields: ["课程名称", "ID"],

      searchMethod: 1,
      inputContent: "",
      breadcrumbItem: [
        {
          text: "Admin",
          href: "#",
        },
        {
          text: "Manage",
          href: "#",
        },
        {
          text: "Library",
          active: true,
        },
      ],
    };
  },
  computed: {
    items() {
      console.log("jisuanle", this.$store.state.global.searchedCourse);
      let return_item = [];
      for (let i = 0; i < this.$store.state.global.searchedCourse.length; ++i) {
        return_item.unshift({
          _showDetails: false,
          isActive: true,
          课程名称: this.$store.state.global.searchedCourse[i].title,
          ID: this.$store.state.global.searchedCourse[i].id.courseId,
          teacher_id:
            this.$store.state.global.searchedCourse[i].teacher.id.teacherId,
          teacher_name: this.$store.state.global.searchedCourse[i].teacher.name,
        });
      }
      return return_item;
    },
  },
  methods: {
    search(method) {
      if (this.inputContent != "") {
        console.log(method);
        if (method == 1) {
          // 课号
          this.$store.dispatch("global/searchCourse1", {
            courseId: this.inputContent,
          });
          this.inputContent = "";
          this.searchMethod = 1;
        } else if (method == 2) {
          // 课程名
          this.$store.dispatch("global/searchCourse2", {
            title: this.inputContent,
          });
          this.inputContent = "";
          this.searchMethod = 2;
        } else if (method == 3) {
          // 教师
          this.$store.dispatch("global/searchCourse3", {
            teacherName: this.inputContent,
          });
          this.inputContent = "";
          this.searchMethod = 3;
        }
      } else {
        alert("搜索内容不可为空!");
      }
    },
    test(row) {
      console.log(row);
    },
  },
  mounted() {},
  beforeDestroy() {},
};
</script>

<style scoped>
</style>