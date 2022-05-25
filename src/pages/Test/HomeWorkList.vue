<template>
  <b-card border-variant="warning">
    <div v-if="$store.state.global.accountType === 1" class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="main-card mb-3 card">
            <div class="card-header">
              <h3 class="card-title">尚未截止的作业</h3>
              <hr/>
              <div v-if="ifHomeWork" style="margin-bottom: 2em">
                <h5>当前没有作业哦！</h5></div>
              <div
                  v-else
                  class="
                  vertical-time-simple
                  vertical-without-time
                  vertical-timeline
                  vertical-timeline--animate
                  vertical-timeline--one-column
                "
              >
                <div
                    v-for="exam in examList"
                    v-if="exam.ifShow"
                    :key="exam.id"
                    class="dot-primary vertical-timeline-element"
                >
                  <div>
                    <span
                        class="vertical-timeline-element-icon bounce-in"
                    ></span>
                    <div class="vertical-timeline-element-content bounce-in">
                      <h4 class="timeline-title">
                        {{
                          new Date(exam.endTime)
                              .format("yyyy-MM-dd hh:mm")
                              .slice(0, 10)
                        }}
                        , at
                        <span class="text-success">{{
                            new Date(exam.endTime)
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
import {getHomeworkByStudent} from "@/api";
//日期格式化
Date.prototype.format = function (fmt) {
  let o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getHours()-8<=0?this.getDate()-1:this.getDate(), //日
    "h+": this.getHours()-8<=0?this.getHours()-16:this.getHours()-8,//小时
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
  name: "HomeWorkList",
  data(){
    return{
      examList: [],
      ifHaveNotPassed:false
    }
  },
  methods:{
    sort() {
      this.examList.sort((a,b) => {
        let x=new Date(a.endTime.replace('T',' ')).getTime()
        let y=new Date(b.endTime.replace('T',' ')).getTime()
        return x-y
      })
      console.log(this.examList)
    },
    init(){
      getHomeworkByStudent(this.$store.state.global.id).then(res=>{
        this.examList=res.data
        console.log(res.data)
        this.examList.forEach(item=>{
          //展示还没有截止并且尚未完成的作业
          let x=new Date(item.endTime.replace('T',' ')).getTime()
          let y=new Date().getTime()
          if(x-y>0 ){
            item.ifShow=true
            this.ifHaveNotPassed=true
          }
          else {
            item.ifShow=false
          }
        })
      })
    },
  },
  computed:{
    ifHomeWork(){
      if(this.ifHaveNotPassed===false){
        return true
      }
      return this.examList.length === 0;
    }
  },
  mounted() {
    this.init()
    console.log(this.examList)
  },
  beforeUpdate() {
    this.sort()
  }
}
</script>

<style scoped>

</style>
