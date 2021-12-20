<template>
  <div>
    <b-modal id="myModal" size="xl" title="Edit" style="height: 80%">
      <b-container>
        <b-row>
          <b-col cols="6">
            <b-form-textarea
                id="textarea-rows"
                placeholder="Tall textarea"
                rows="8"
            ></b-form-textarea>
          </b-col>
          <b-col cols="6">
            <div class="card-border mb-3 card card-body border-primary" style="height: 100%">
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "myEditModal"
}
</script>

<style scoped>

</style>