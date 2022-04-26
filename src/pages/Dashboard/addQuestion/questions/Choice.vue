<template>
  <div>
    <my-edit-modal
        v-if="editOwner !== OwnerEnum.NoOwner"
        :id="editModalId"
        :init-content="editInitContent"
        @onSubmit="handleSubmit"
        @onCancel="handleCancel"
    />
    <my-select
        v-if="onShowAnswer!==0"
        :init-option-list="questionInfo.option"
        :init-answer-list="questionInfo.standardAnswer"
        :onShowAnswer="onShowAnswer"
        @onSubmit="handleSubmitOption"
        @onCancel="handleCancelOption"
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
        label="选项:"
        label-cols-sm="3"
        label-align-sm="right"
    >
      <b-button block
                class="mr-2 mb-3"
                pill
                variant="outline-primary"
                size="sm"
                @click="handleAddOption"
      >
        添加
      </b-button>
      <b-button v-for="option in questionInfo.option"
                :key="option.id"
                block
                class="mr-2 mb-1 text-left"
                variant="outline-info"
                size="sm"
                @click="handleClickOption(option.id)"
      >
        <katex-element
            :expression="parseLatex(option.description)"
            :throw-on-error="false"
            :strict="false"
        />
      </b-button>
    </b-form-group>

    <b-form-group
        label="答案:"
        label-cols-sm="3"
        label-align-sm="right"
    >
      <template v-if="questionInfo.type===0">
        <b-button block
                  class="mr-2 mb-3"
                  pill
                  variant="outline-primary"
                  size="sm"
                  @click="handleSelectOptionStandAnswer"
        >
          选择
        </b-button>
      </template>
      <template v-else>
        <b-button block
                  class="mr-2 mb-3"
                  pill
                  variant="outline-primary"
                  size="sm"
                  @click="handleSelectMultiOptionStandAnswer"
        >
          选择
        </b-button>
      </template>

      <template v-for="option in questionInfo.option">
        <div :key="option.id"
             v-if="questionInfo.standardAnswer.includes(option.id)"
             class="card-shadow-danger border card card-body border-danger mr-2 mb-1">
          <katex-element
              :expression="parseLatex(option.description)"
              :throw-on-error="false"
              :strict="false"
          />
        </div>
      </template>
    </b-form-group>
  </div>
</template>

<script>
import parseLatex from "@/utils/parseLatex";
import MyEditModal from "@/components/myEditModal";
import MySelect from "@/components/mySelect";

class OwnerEnum {
  static Description = new OwnerEnum("题目描述(题干)")
  static OptionAdd = new OwnerEnum("选项添加")
  static OptionEdit = new OwnerEnum("选项编辑")
  static NoOwner = new OwnerEnum("无")

  constructor(value) {
    this.value = value
  }
};

export default {
  name: "Choice",
  props: {
    value: Object,
  },
  components: {MyEditModal, MySelect},
  data() {
    return {
      OwnerEnum,
      editModalId: "edit-modal",
      selectModalId: "select-modal",
      // 标识谁在使用editModal
      editOwner: OwnerEnum.NoOwner,
      // editModal的初始内容
      editInitContent: "",
      // 选择单选的选项还是多选的选项
      onShowAnswer: 0,
      // 是哪个选项在被编辑
      onEditOptionId: -1,
      // 用于判断选择题选项点了几次
      optionClickId: null,
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
    openSelect() {
      this.$bvModal.show(this.selectModalId)
    },
    updateId() {
      // 维护id始终是从0 - n的连续数组
      const optionCompare = (a, b) => {
        return a.id > b.id ? 1 : -1;
      };
      this.questionInfo.option.sort(optionCompare);
      let cnt = 0;
      this.questionInfo.option.forEach((value, index) => {
        this.questionInfo[index].id = cnt;
        cnt += 1
      })
      this.handleInput()
    },
    getMaxOptionId() {
      let id = 0;
      this.questionInfo.option.forEach((value) => {
        id = Math.max(id, value.id + 1);
      });
      return id;
    },

    handleClickOption(id) {
      //实现点两次编辑，点一次删除的功能
      if (this.optionClickId === id) {
        clearTimeout(this.optionTimer);
        this.optionClickId = null;
        this.handleDeleteOption(id);
      } else {
        this.optionClickId = id;
        if (this.optionTimer != null) {
          clearTimeout(this.optionTimer);
        }
        this.optionTimer = setTimeout(() => {
          this.optionClickId = null;
          this.handleEditOption(id);
        }, 300);
      }
    },
    handleDeleteOption(id) {
      this.questionInfo.option = this.questionInfo.option.filter(item => item.id !== id)
      this.updateId()
    },
    handleEditOption(id) {
      this.editOwner = OwnerEnum.OptionEdit
      this.editInitContent = this.questionInfo.option.find(item => item.id === id).description || ""
      this.onEditOptionId = id
      this.$nextTick(this.openEdit)
    },
    handleAddOption() {
      this.editOwner = OwnerEnum.OptionAdd
      this.editInitContent = ""
      this.$nextTick(this.openEdit)
    },
    handleSelectOptionStandAnswer() {
      this.onShowAnswer = 1
      this.$nextTick(this.openSelect)
    },
    handleSelectMultiOptionStandAnswer() {
      this.onShowAnswer = 2
      this.$nextTick(this.openSelect)
    },
    handleEditDescription() {
      this.editOwner = OwnerEnum.Description
      this.editInitContent = this.questionInfo.description
      this.$nextTick(this.openEdit)
    },


    handleSubmit(content) {
      switch (this.editOwner) {
        case OwnerEnum.Description: {
          this.questionInfo.description = content
          break
        }
        case OwnerEnum.OptionAdd: {
          let maxId = this.getMaxOptionId()
          this.questionInfo.option.push({description: content, id: maxId})
          break
        }
        case OwnerEnum.OptionEdit: {
          this.questionInfo.option.forEach((value, index) => {
            if (value.id === this.onEditOptionId) {
              this.questionInfo.option[index].description = content
            }
          })
          this.onEditOptionId = -1
          break
        }
      }
      this.editOwner = OwnerEnum.NoOwner
      this.editInitContent = ""
      this.handleInput()
    },
    handleCancel() {
      this.editOwner = OwnerEnum.NoOwner
      this.editInitContent = ""
    },
    handleSubmitOption(answerList) {
      this.questionInfo.standardAnswer = JSON.parse(JSON.stringify(answerList))
      this.onShowAnswer = 0
      this.handleInput()
    },
    handleCancelOption() {
      this.onShowAnswer = 0
    },
  }
}
</script>

<style scoped>

</style>