<template>
  <div>
    <page-title :heading=heading
                :subheading=subheading
                :icon=icon
                :breadcrumb-item="breadcrumbItem"
    ></page-title>
    <my-edit-modal/>
    <b-container fluid>
      <b-row>
        <b-col cols="8">
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
                    <b-form-select v-model="selected" :options="options"></b-form-select>
                  </b-form-group>

                  <b-form-group
                      label="学科:"
                      label-cols-sm="3"
                      label-align-sm="right"
                  >
                    <b-form-input v-model="text" placeholder="输入学科"></b-form-input>
                  </b-form-group>

                  <b-form-group
                      label="是否私有:"
                      label-cols-sm="3"
                      label-align-sm="right"
                  >
                    <b-form-select v-model="selected" :options="options"></b-form-select>
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
                    <b-button block class="mr-2 mb-1" variant="outline-danger" size="sm" @click="handleClick">
                      With supporting text below as a natural lead-in to additional content.
                    </b-button>
                  </b-form-group>
                </b-form-group>

              </b-form>

            </div>
          </div>
        </b-col>

        <b-col cols="4">
          <my-count-bar>

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

      items: [
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5},
        {id: 6},
        {id: 7},
        {id: 8},
        {id: 9},
        {id: 10},
      ],

      currentPage: 1,
      expanded: false,
      barStyle: {
        backgroundColor: '#69aa8a'
      },

      options: [
        {value: null, text: 'Please select an option'},
        {value: 'a', text: 'This is First option'},
        {value: 'b', text: 'Selected Option'},
        {value: {C: '3PO'}, text: 'This is an option with object value'},
        {value: 'd', text: 'This one is disabled', disabled: true}
      ],
      selected: null,
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
    handleClick() {
      this.$bvModal.show('myModal')
    }
  }
}
</script>

<style scoped>

</style>