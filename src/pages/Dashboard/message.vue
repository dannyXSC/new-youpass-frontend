<template>
  <div>
    <page-title
      :heading="heading"
      :subheading="subheading"
      :icon="icon"
      :breadcrumb-item="breadcrumbItem"
    ></page-title>

    <div class="col-md-12">
      <div class="main-card mb-3 card">
        <div class="card-body">
          <h3 class="card-title">Message</h3>
          <hr />
          <div
            class="vertical-time-simple vertical-without-time vertical-timeline vertical-timeline--animate vertical-timeline--one-column"
          >
            <div
              class="dot-danger vertical-timeline-element"
              v-for="(item, index) in items"
              :key="index"
            >
              <div>
                <span class="vertical-timeline-element-icon bounce-in"></span>
                <div class="vertical-timeline-element-content bounce-in">
                  <h4 class="timeline-title">
                    {{ item.time.slice(0, 10) }}, at
                    <span class="text-success"
                      >{{ item.time.slice(11, 16) }}PM</span
                    >
                  </h4>
                  <div class="col-md-10">
                    <div
                      class="card-shadow-primary border mb-3 card card-body border-primary"
                    >
                      <h5 class="card-title">
                        <span class="text-success"
                          >Message From Course Id：</span
                        >{{ item.courseId }}
                      </h5>
                      <h6>
                        {{ item.content }}
                      </h6>
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
</template>

<script>
import PageTitle from "@/layout/Components/PageTitle.vue";
import MyList from "@/components/myList";

Date.prototype.format = function (fmt) {
  var o = {
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
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

export default {
  name: "message",
  components: { MyList, PageTitle },
  data() {
    return {
      heading: "Always Check Your Message",
      subheading: "不要错过重要的通知哦！",
      icon: "pe-7s-plane icon-gradient bg-tempting-azure",

      breadcrumbItem: [
        {
          text: "消息",
          active: true,
        },
      ],
    };
  },
  computed: {
    items() {
      console.log("computed" + this.$store.state.global.messageList);
      let return_item = [];
      for (let i = 0; i < this.$store.state.global.messageList.length; ++i) {
        return_item.unshift({
          content: this.$store.state.global.messageList[i].content,
          time: new Date(this.$store.state.global.messageList[i].time).format(
            "yyyy-MM-dd hh:mm"
          ),
          courseId: this.$store.state.global.messageList[i].courseId,
        });
      }
      return return_item;
    },
  },
  methods: {},
};
</script>

<style scoped></style>
