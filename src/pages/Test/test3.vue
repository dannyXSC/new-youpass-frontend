<template>
  <div>
    <my-edit-modal
        @onSubmit="handleSubmit"
        @onCancel="handleCancel"
    />
    <page-title :heading=heading
                :subheading=subheading
                :icon=icon
                :breadcrumb-item="breadcrumbItem"
    ></page-title>
    <b-container fluid v-if="items[onShowId]">
      <b-row>
        <b-col cols="8">
          {{ items[onShowId] }}
          <div class="main-card mb-3 card">
            <div class="card-body">
              <b-form>
                <b-form-group
                    label-cols-lg="3"
                    label="编辑题目信息"
                    label-size="lg"
                    label-class="font-weight-bold pt-0"
                    class="mb-0"
                >
                  <b-form-group
                      label="题目种类:"
                      label-cols-sm="3"
                      label-align-sm="right"
                  >
                    <b-form-select v-model="items[onShowId].type" :options="typeOptions"></b-form-select>
                  </b-form-group>

                  <b-form-group
                      label="学科:"
                      label-cols-sm="3"
                      label-align-sm="right"
                  >
                    <b-form-input v-model="items[onShowId].subject" placeholder="输入学科"></b-form-input>
                  </b-form-group>

                  <b-form-group
                      label="是否私有:"
                      label-cols-sm="3"
                      label-align-sm="right"
                  >
                    <b-form-select v-model="items[onShowId].isPrivate" :options="isPrivateOptions"></b-form-select>
                  </b-form-group>

                  <b-form-group
                      label="内容:"
                      label-cols-sm="3"
                      label-align-sm="right"
                  >
                    <b-button block class="mr-2 mb-3" pill variant="outline-primary" size="sm">编辑</b-button>
                    <div class="card-shadow-success border card card-body border-success">
                      <!--                      <h5 class="card-title">Success Card Shadow</h5>-->
                      With supporting text below as a natural lead-in to additional content.
                    </div>
                  </b-form-group>

                  <b-form-group
                      label="选项:"
                      label-cols-sm="3"
                      label-align-sm="right"
                  >
                    <b-button block class="mr-2 mb-3" pill variant="outline-primary" size="sm">添加</b-button>
                    <b-button block class="mr-2 mb-1" variant="outline-info" size="sm">
                      With supporting text below as a natural lead-in to additional content.
                    </b-button>
                    <b-button block class="mr-2 mb-1" variant="outline-info" size="sm">
                      With supporting text below as a natural lead-in to additional content.
                    </b-button>
                    <b-button block class="mr-2 mb-1" variant="outline-info" size="sm">
                      With supporting text below as a natural lead-in to additional content.
                    </b-button>
                    <b-button block class="mr-2 mb-1" variant="outline-info" size="sm">
                      With supporting text below as a natural lead-in to additional content.
                    </b-button>
                  </b-form-group>

                  <b-form-group
                      label="答案:"
                      label-cols-sm="3"
                      label-align-sm="right"
                  >
                    <b-button block class="mr-2 mb-3" pill variant="outline-primary" size="sm">选择</b-button>
                    <b-button block class="mr-2 mb-1" variant="outline-danger" size="sm" @click="openEdit">
                      With supporting text below as a natural lead-in to additional content.
                    </b-button>
                  </b-form-group>
                </b-form-group>

              </b-form>

            </div>
          </div>
        </b-col>

        <b-col cols="4">

          <my-count-bar
              :currentPage_props="currentPage"
              :total_rows_props="items.length"
              :per_page_props="9"
              :items="items"
              @updatePage="updatePage"
              @onSelect="handleSelect"
          >
            <template v-slot:header>
              相关信息
            </template>
            <template v-slot:footer>
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
            </template>

          </my-count-bar>

        </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>
import PageTitle from "@/layout/Components/PageTitle.vue";
import MyEditModal from "@/components/myEditModal";
import MyCountBar from "@/components/myCountBar";

export default {
  name: "test3",
  components: {MyCountBar, MyEditModal, PageTitle,},
  data() {
    return {
      heading: '上传题目',
      subheading: '您可以在此页面上传题目',
      icon: 'pe-7s-plane icon-gradient bg-tempting-azure',


      breadcrumbItem: [
        {
          text: 'Admin',
          href: '#'
        },
        {
          text: 'Manage',
          href: '#'
        },
        {
          text: 'Test1',
          href: '#'
        },
        {
          text: 'Test2',
          active: true
        }
      ],

      items: [],

      currentPage: 1,
      expanded: false,
      barStyle: {
        backgroundColor: '#69aa8a'
      },

      typeOptions: [
        {value: null, text: 'Please select an option'},
        {value: 0, text: '单择题'},
        {value: 1, text: '多选题'},
        {value: 2, text: '填空题'},
        {value: 3, text: '大题'}
      ],
      isPrivateOptions: [
        {value: null, text: 'Please select an option'},
        {value: 1, text: '私有'},
        {value: 0, text: '共有'},
      ],
      selected: null,
      text: "",


      onShowId: 0,
      editOwner: null,
      editContent: ""
    }
  },
  mounted() {
    for (var i = 0; i < 30; i++) {

      this.items.push({
        id: i,
        type: Math.floor(Math.random() * 4),
        description: "填空题",
        standAnswer: "填空题答案",
        subject: "数学",
        createTime: "123",
        isPrivate: 1,
        option: [],
        pool: 0,
        courseId: 123
      })
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    onSidebarChanged() {
    },
    openEdit() {
      this.$bvModal.show('myModal')
    },
    updatePage(page) {
      this.currentPage = page
    },
    handleSelect(item) {
      this.onShowId = item.id
    },
    handleSubmit(content) {
      // switch (editOwner){
      //   case ""
      // }
      this.editOwner = null
      this.editContent = content
    },
    handleCancel() {
      this.editOwner = null
      this.editContent = ""
    }
  }
}
</script>

<style scoped>

</style>


<!--
{
          description: "123",
          type: 0,
          standAnswer: "1",
          subject: "数学",
          createTime: "123",
          isPrivate: 1,
          option: [
            {optionId: 0, description: "选择题内容1"},
            {optionId: 1, description: "选择题内容2"}
          ],
          pool: 0,
          courseId: 123
        },
        {
          description: "123",
          type: 1,
          standAnswer: "1",
          subject: "数学",
          createTime: "123",
          isPrivate: 1,
          option: [
            {optionId: 0, description: "选择题内容1"},
            {optionId: 1, description: "选择题内容2"}
          ],
          pool: 0,
          courseId: 123
        },
        {
          description: "填空题",
          type: 2,
          standAnswer: "填空题答案",
          subject: "数学",
          createTime: "123",
          isPrivate: 1,
          option: [],
          pool: 0,
          courseId: 123
        },
        {
          description: "填空题",
          type: 3,
          standAnswer: "大题答案",
          subject: "数学",
          createTime: "123",
          isPrivate: 1,
          option: [],
          pool: 0,
          courseId: 123
        },
        {
          description: "123",
          type: 0,
          standAnswer: "1",
          subject: "数学",
          createTime: "123",
          isPrivate: 1,
          option: [
            {optionId: 0, description: "选择题内容1"},
            {optionId: 1, description: "选择题内容2"}
          ],
          pool: 0,
          courseId: 123
        },
        {
          description: "123",
          type: 1,
          standAnswer: "1",
          subject: "数学",
          createTime: "123",
          isPrivate: 1,
          option: [
            {optionId: 0, description: "选择题内容1"},
            {optionId: 1, description: "选择题内容2"}
          ],
          pool: 0,
          courseId: 123
        },
        {
          description: "填空题",
          type: 2,
          standAnswer: "填空题答案",
          subject: "数学",
          createTime: "123",
          isPrivate: 1,
          option: [],
          pool: 0,
          courseId: 123
        },
        {
          description: "填空题",
          type: 3,
          standAnswer: "大题答案",
          subject: "数学",
          createTime: "123",
          isPrivate: 1,
          option: [],
          pool: 0,
          courseId: 123
        },
        {
          description: "123",
          type: 0,
          standAnswer: "1",
          subject: "数学",
          createTime: "123",
          isPrivate: 1,
          option: [
            {optionId: 0, description: "选择题内容1"},
            {optionId: 1, description: "选择题内容2"}
          ],
          pool: 0,
          courseId: 123
        },
        {
          description: "123",
          type: 1,
          standAnswer: "1",
          subject: "数学",
          createTime: "123",
          isPrivate: 1,
          option: [
            {optionId: 0, description: "选择题内容1"},
            {optionId: 1, description: "选择题内容2"}
          ],
          pool: 0,
          courseId: 123
        },
        {
          description: "填空题",
          type: 2,
          standAnswer: "填空题答案",
          subject: "数学",
          createTime: "123",
          isPrivate: 1,
          option: [],
          pool: 0,
          courseId: 123
        },
        {
          description: "填空题",
          type: 3,
          standAnswer: "大题答案",
          subject: "数学",
          createTime: "123",
          isPrivate: 1,
          option: [],
          pool: 0,
          courseId: 123
        },
        {
          description: "123",
          type: 0,
          standAnswer: "1",
          subject: "数学",
          createTime: "123",
          isPrivate: 1,
          option: [
            {optionId: 0, description: "选择题内容1"},
            {optionId: 1, description: "选择题内容2"}
          ],
          pool: 0,
          courseId: 123
        },
        {
          description: "123",
          type: 1,
          standAnswer: "1",
          subject: "数学",
          createTime: "123",
          isPrivate: 1,
          option: [
            {optionId: 0, description: "选择题内容1"},
            {optionId: 1, description: "选择题内容2"}
          ],
          pool: 0,
          courseId: 123
        },
        {
          description: "填空题",
          type: 2,
          standAnswer: "填空题答案",
          subject: "数学",
          createTime: "123",
          isPrivate: 1,
          option: [],
          pool: 0,
          courseId: 123
        },
        {
          description: "填空题",
          type: 3,
          standAnswer: "大题答案",
          subject: "数学",
          createTime: "123",
          isPrivate: 1,
          option: [],
          pool: 0,
          courseId: 123
        },
        {
          description: "123",
          type: 0,
          standAnswer: "1",
          subject: "数学",
          createTime: "123",
          isPrivate: 1,
          option: [
            {optionId: 0, description: "选择题内容1"},
            {optionId: 1, description: "选择题内容2"}
          ],
          pool: 0,
          courseId: 123
        },
        {
          description: "123",
          type: 1,
          standAnswer: "1",
          subject: "数学",
          createTime: "123",
          isPrivate: 1,
          option: [
            {optionId: 0, description: "选择题内容1"},
            {optionId: 1, description: "选择题内容2"}
          ],
          pool: 0,
          courseId: 123
        },
        {
          description: "填空题",
          type: 2,
          standAnswer: "填空题答案",
          subject: "数学",
          createTime: "123",
          isPrivate: 1,
          option: [],
          pool: 0,
          courseId: 123
        },
        {
          description: "填空题",
          type: 3,
          standAnswer: "大题答案",
          subject: "数学",
          createTime: "123",
          isPrivate: 1,
          option: [],
          pool: 0,
          courseId: 123
        }


-->