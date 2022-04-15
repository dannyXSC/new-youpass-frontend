<template>
  <b-modal
      :id="id"
      size="xl"
      title="Edit"
      style="height: 80%"
      @hide="handleExit"
  >
    <b-card>
      <b-form-group
          label-cols-lg="3"
          label="Course information"
          label-size="lg"
          label-class="font-weight-bold pt-0"
          class="mb-0"
      >
        <b-form-group
            label="课程名:"
            label-cols-sm="3"
            label-align-sm="right"
        >
          <b-form-input v-model="title"></b-form-input>
        </b-form-group>

        <b-form-group
            label="密码:"
            label-cols-sm="3"
            label-align-sm="right"
        >
          <b-form-input v-model="password"></b-form-input>
        </b-form-group>

        <b-form-group
            label="直播链接:"
            label-cols-sm="3"
            label-align-sm="right"
        >
          <b-form-input v-model="url"></b-form-input>
        </b-form-group>

      </b-form-group>
    </b-card>
  </b-modal>
</template>

<script>
import parse from "@/utils/parseLatex";

export default {
  name: "myCourseModal",
  props: {
    id: String,
    initTitle: {type: String, default: ""},
    initPassword: {type: String, default: ""},
    initUrl: {type: String, default: ""},
  },
  data() {
    return {
      title: this.initTitle,
      password: this.initPassword,
      url: this.initUrl,
    }
  },
  computed: {
    contentLatex: function () {
      return parse(this.content)
    }
  },
  methods: {
    handleExit(trigger) {
      if (trigger.trigger === "ok") {
        this.$emit("onSubmit", {
          title: this.title,
          password: this.password,
          url: this.url,
        })
      } else {
        this.$emit("onCancel")
      }
      this.title = ""
      this.password = ""
      this.url = ""
    }
  }
}
</script>

<style scoped>

</style>