<template>
  <b-modal
      :id="id"
      size="xl"
      title="请确认选择的题目并调整顺序"
      style="height: 80%"
      @hide="handleExit"
  >
    <b-container>
      <draggable v-model="myArray">
        <div v-for="element in myArray" :key="element.id">
          {{ element.questionId }}-----{{ element.description }}
          <hr>
        </div>
      </draggable>
    </b-container>
  </b-modal>
</template>

<script>
import parse from "@/utils/parseLatex";
import draggable from 'vuedraggable'

export default {
  name: "mychooseModal",
  components: {
    draggable,
  },
  props: {
    initArray: Array,
    id: {
      type: String,
      default: "choose-modal"

    }
  },
  data() {
    return {
      myArray: this.initArray,
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
        this.$emit("onSubmit", this.myArray)
      } else {
        this.$emit("onCancel")
      }
    }
  }
}
</script>

<style scoped>

</style>