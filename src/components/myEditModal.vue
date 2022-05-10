<template>
  <b-modal
      :id="id"
      size="xl"
      title="编辑"
      style="height: 80%"
      @hide="handleExit"
      ok-title="确认"
      cancel-title="取消"
  >
    <b-container>
      <b-row>
        <b-col cols="6">
          <b-form-textarea
              id="textarea-rows"
              placeholder="请输入内容..."
              rows="8"
              style="height: 50vh;"
              v-model="content"
          ></b-form-textarea>
        </b-col>
        <b-col cols="6">
          <div class="card-border mb-3 card card-body border-primary" style="height: 50vh;overflow: scroll">
            <katex-element
                :expression="contentLatex"
                :throw-on-error="false"
                :strict="false"
            />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
</template>

<script>
import parse from "@/utils/parseLatex";

export default {
  name: "myEditModal",
  props: {
    initContent: String,
    id: {
      type: String,
      default: "edit-modal"
    }
  },
  data() {
    return {
      content: this.initContent
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
        this.$emit("onSubmit", this.content)
      } else {
        this.$emit("onCancel")
      }
      this.content = ""
    }
  }
}
</script>

<style scoped>

</style>