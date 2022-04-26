<template>
  <div>
    <my-edit-modal
        v-if="editOwner !== OwnerEnum.NoOwner"
        :id="editModalId"
        :init-content="editInitContent"
        @onSubmit="handleSubmit"
        @onCancel="handleCancel"
    />
    <b-form-group
        label="题干:"
        label-cols-sm="3"
        label-align-sm="right"
        aria-placeholder="无"
    >
      <b-button block
                class="mr-2 mb-3"
                pill
                variant="outline-primary"
                size="sm"
                @click="handleEditDescription"
      >
        编辑
      </b-button>
      <div class="card-shadow-success border card card-body border-success">
        <katex-element
            :expression="parseLatex(questionInfo.description)"
            :throw-on-error="false"
            :strict="false"
        />
      </div>
    </b-form-group>

    <b-form-group
        label="答案:"
        label-cols-sm="3"
        label-align-sm="right"
    >
      <b-button block class="mr-2 mb-3" pill variant="outline-primary" size="sm"
                @click="handleEditStandAnswer">编辑
      </b-button>
      <div class="card-shadow-danger border card card-body border-danger">
        <katex-element
            :expression="parseLatex(questionInfo.standardAnswer)"
            :throw-on-error="false"
            :strict="false"
        />
      </div>
    </b-form-group>
  </div>
</template>

<script>
import parseLatex from "@/utils/parseLatex";
import MyEditModal from "@/components/myEditModal";

class OwnerEnum {
  static Description = new OwnerEnum("题目描述(题干)")
  static StandardAnswer = new OwnerEnum("正确答案的文本内容")
  static NoOwner = new OwnerEnum("无")

  constructor(value) {
    this.value = value
  }
};

export default {
  name: "Filling",
  props: {
    value: Object,
  },
  components:{MyEditModal},
  data() {
    return {
      OwnerEnum,
      editOwner: OwnerEnum.NoOwner,
      editInitContent: "",
      editModalId: "edit-modal",
      questionInfo: this.value,
    }
  },
  methods: {
    parseLatex,
    handleInput() {
      this.$emit('input', this.questionInfo)
    },
    openEdit() {
      this.$bvModal.show(this.editModalId)
    },
    handleEditDescription() {
      this.editOwner = OwnerEnum.Description
      this.editInitContent = this.questionInfo.description
      this.$nextTick(this.openEdit)
    },
    handleEditStandAnswer() {
      this.editOwner = OwnerEnum.StandardAnswer
      this.editInitContent = this.questionInfo.standardAnswer
      this.$nextTick(this.openEdit)
    },
    handleSubmit(content) {
      switch (this.editOwner) {
        case OwnerEnum.Description:
          this.questionInfo.description = content
          break
        case OwnerEnum.StandardAnswer:
          this.questionInfo.standardAnswer = content
          break
        default:
          break
      }
      this.editOwner = OwnerEnum.NoOwner
      this.editInitContent = ""
      this.handleInput()
    },
    handleCancel() {
      this.editOwner = OwnerEnum.NoOwner
      this.editInitContent = ""
    }
  }
}
</script>

<style scoped>

</style>