<template>
  <b-card border-variant="success">
    <div v-if="$store.state.global.accountType === 1" class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="main-card mb-3 card">
            <div class="card-header">
              <h3 class="card-title">未完成的作业</h3>
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
//日期格式化
Date.prototype.format = function (fmt) {
  let o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
        RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};
export default {
  name: "HomeWorkList"
}
</script>

<style scoped>

</style>
