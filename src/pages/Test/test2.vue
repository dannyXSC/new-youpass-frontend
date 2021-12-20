<template>
  <div>
    <page-title :heading=heading
                :subheading=subheading
                :icon=icon
                :breadcrumb-item="breadcrumbItem"
    ></page-title>

    <div class="main-card mb-3 card">
      <div class="card-body">
        <b-form>
          <b-form-group
              label-cols-lg="3"
              label="发布考试"
              label-size="lg"
              label-class="font-weight-bold pt-0"
              class="mb-0"
          >
            <b-form-group
                label="考试名称:"
                label-for="examTitle"
                label-cols-sm="3"
                label-align-sm="right"
            >
              <b-form-input id="examTitle"></b-form-input>
            </b-form-group>

            <b-form-group
                label="考试开始时间:"
                label-cols-sm="3"
                label-align-sm="right"
            >
              <b-form-group
                  label="date:"
                  label-cols-sm="3"
                  label-align-sm="right"
              >
                <b-form-input id="startDate" type="date" class="text-center"></b-form-input>
              </b-form-group>
              <b-form-group
                  label="time:"
                  label-cols-sm="3"
                  label-align-sm="right"
              >
                <b-form-input id="startTime" type="time" class="text-center"></b-form-input>
              </b-form-group>
            </b-form-group>

            <b-form-group
                label="考试结束时间:"
                label-cols-sm="3"
                label-align-sm="right"
            >
              <b-form-group
                  label="date:"
                  label-cols-sm="3"
                  label-align-sm="right"
              >
                <b-form-input id="startDate" type="date" class="text-center"></b-form-input>
              </b-form-group>
              <b-form-group
                  label="time:"
                  label-cols-sm="3"
                  label-align-sm="right"
              >
                <b-form-input id="startTime" type="time" class="text-center"></b-form-input>
              </b-form-group>
            </b-form-group>

            <b-form-group
                label="单选题信息:"
                label-cols-sm="3"
                label-align-sm="right"
            >
              <b-form-group
                  label="题目数量:"
                  label-cols-sm="3"
                  label-align-sm="right"
              >
                <b-form-spinbutton
                    id="selectNum"
                    placeholder="--"
                    wrap
                    min="1"
                    max="25"
                    class="text-center"
                />
              </b-form-group>
              <b-form-group
                  label="题目分值:"
                  label-cols-sm="3"
                  label-align-sm="right"
              >
                <b-form-spinbutton
                    id="selectScore"
                    placeholder="--"
                    wrap
                    min="1"
                    max="25"
                    class="text-center"
                />
              </b-form-group>
            </b-form-group>

            <!--多选-->
            <b-form-group
                label="多选题信息:"
                label-cols-sm="3"
                label-align-sm="right"
            >
              <b-form-group
                  label="题目数量:"
                  label-cols-sm="3"
                  label-align-sm="right"
              >
                <b-form-spinbutton
                    id="multiSelectNum"
                    placeholder="--"
                    wrap
                    min="1"
                    max="25"
                    class="text-center"
                />
              </b-form-group>
              <b-form-group
                  label="题目分值:"
                  label-cols-sm="3"
                  label-align-sm="right"
              >
                <b-form-spinbutton
                    id="multiSelectScore"
                    placeholder="--"
                    wrap
                    min="1"
                    max="25"
                    class="text-center"
                />
              </b-form-group>
            </b-form-group>

            <!--填空-->
            <b-form-group
                label="填空信息:"
                label-cols-sm="3"
                label-align-sm="right"
            >
              <b-form-group
                  label="题目数量:"
                  label-cols-sm="3"
                  label-align-sm="right"
              >
                <b-form-spinbutton
                    id="fillNum"
                    placeholder="--"
                    wrap
                    min="1"
                    max="25"
                    class="text-center"
                />
              </b-form-group>
              <b-form-group
                  label="题目分值:"
                  label-cols-sm="3"
                  label-align-sm="right"
              >
                <b-form-spinbutton
                    id="fillScore"
                    placeholder="--"
                    wrap
                    min="1"
                    max="25"
                    class="text-center"
                />
              </b-form-group>
            </b-form-group>

            <!--大题-->
            <b-form-group
                label="大题信息:"
                label-cols-sm="3"
                label-align-sm="right"
            >
              <b-form-group
                  label="题目数量:"
                  label-cols-sm="3"
                  label-align-sm="right"
              >
                <b-form-spinbutton
                    id="compilationNum"
                    placeholder="--"
                    wrap
                    min="1"
                    max="25"
                    class="text-center"
                />
              </b-form-group>
              <b-form-group
                  label="题目分值:"
                  label-cols-sm="3"
                  label-align-sm="right"
              >
                <b-form-spinbutton
                    id="compilationScore"
                    placeholder="--"
                    wrap
                    min="1"
                    max="25"
                    class="text-center"
                />
              </b-form-group>
            </b-form-group>

          </b-form-group>

          <b-row class="justify-content-end">
            <b-col cols="12"  md="auto">
              <b-button pill variant="outline-danger">提交</b-button>
            </b-col>
          </b-row>

        </b-form>
      </div>
    </div>
  </div>


</template>

<script>
import PageTitle from "@/layout/Components/PageTitle.vue";

export default {
  name: "test2.vue",
  components: {PageTitle},
  data() {
    return {
      heading: '发布考试',
      subheading: '您可以在此页面发布一场考试',
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
          text: 'Library',
          active: true
        }
      ],
    }
  }
}
</script>

<style scoped>

</style>