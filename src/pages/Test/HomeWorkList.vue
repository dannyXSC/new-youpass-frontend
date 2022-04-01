<template>
  <b-card border-variant="success">
    <div v-if="$store.state.global.accountType === 1" class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="main-card mb-3 card">
            <div class="card-header">
              <h3 class="card-title">Coming Exams</h3>
              <hr/>
              <div
                  class="
                  vertical-time-simple
                  vertical-without-time
                  vertical-timeline
                  vertical-timeline--animate
                  vertical-timeline--one-column
                "
              >
                <div
                    v-for="(exam, index) in $store.state.global.examList"
                    :key="index"
                    class="dot-primary vertical-timeline-element"
                >
                  <div>
                    <span
                        class="vertical-timeline-element-icon bounce-in"
                    ></span>
                    <div class="vertical-timeline-element-content bounce-in">
                      <h4 class="timeline-title">
                        {{
                          new Date(exam.start_time)
                              .format("yyyy-MM-dd hh:mm")
                              .slice(0, 10)
                        }}
                        , at
                        <span class="text-success">{{
                            new Date(exam.start_time)
                                .format("yyyy-MM-dd hh:mm")
                                .slice(11, 16)
                          }}</span>
                      </h4>
                      <div class="col-md-9">
                        <div>
                          <h5>
                            <span class="text-secondary"
                            >{{ exam.title }}
                            </span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </b-card>
</template>

<script>
export default {
  name: "HomeWorkList"
}
</script>

<style scoped>

</style>
