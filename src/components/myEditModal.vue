<template>
  <div>
    <b-modal
        id="myModal"
        size="xl"
        title="Edit"
        style="height: 80%"
        @hide="handleExit"
    >
      <b-container>
        <b-row>
          <b-col cols="6">
            <b-form-textarea
                id="textarea-rows"
                placeholder="Tall textarea"
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
              />
            </div>
          </b-col>

        </b-row>
      </b-container>
    </b-modal>

  </div>
</template>

<script>
import parse from "@/utils/parseLatex";

export default {
  name: "myEditModal",
  data() {
    return {
      content: ""
    }
  },
  computed: {
    contentLatex: function () {
      return parse(this.content)
    }
  },
  mounted() {
    this.content = ""
  },
  methods: {
    handleExit(trigger) {
      if(trigger.trigger=="ok"){
        this.$emit("onSubmit",this.content)
      }else{
        console.log("123")
        this.$emit("onCancel")
      }
    }
  }
}
</script>

<style scoped>

</style>