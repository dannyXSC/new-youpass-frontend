<template>
  <div>
    <homework-info-card style="margin-bottom: 2em" :homework-id="homeworkId"></homework-info-card>
    <b-card>
      <b-list-group>
        <b-list-group-item v-for="comment in comments" style="margin-bottom: 1.5em">
          <h5 class="mb-1">
            <b-avatar button class="mr-3" :src="comment.userAvater" @click="showHisInfo(comment.userId)"></b-avatar>
            <span class="mr-auto">{{ comment.userName }}</span>
          </h5>
          <p class="commentZone">
            {{ comment.content }}
          </p>
          <p style="font-size: 0.5em">
            {{ comment.createTime }}
          </p>
          <b-row>
            <b-col cols="1">
              <span><b-button size="lg" variant="outline-white" :disabled="comment.supported"
                              @click="giveLike(comment.commentId)"><b-icon
                  icon="hand-thumbs-up"></b-icon></b-button>{{ comment.supportNum }}</span>
            </b-col>
            <b-col cols="1">
            <span><b-button size="lg" variant="outline-white" v-b-toggle="'collapse'+comment.commentId"><b-icon
                icon="chat-left"></b-icon></b-button>{{ comment.children.length }}</span>
            </b-col>
            <b-col cols="1">
              <span><b-button size="lg" variant="outline-white" v-b-toggle="'giveComment'+comment.commentId"><b-icon
                  icon="chat-right-text-fill"></b-icon> </b-button></span>
            </b-col>
          </b-row>
          <b-collapse :id="'giveComment'+comment.commentId" class="giveComment">
            <b-row>
              <b-col cols="10">
                <b-form-textarea
                    v-model="comment.myComment"
                    placeholder="说点什么..."
                    rows="3"
                    max-rows="6"
                ></b-form-textarea>
              </b-col>
              <b-col cols="2">
                <b-button-group vertical size="lg">
                  <b-button type="submit" style="height: 2em" variant="success"
                            @click="thesubmitComment(comment.commentId)">提交
                  </b-button>
                  <b-button type="reset" style="height: 2em" variant="danger" @click="clearComment(comment.commentId)">
                    清除
                  </b-button>
                </b-button-group>
              </b-col>
            </b-row>
          </b-collapse>
          <b-collapse :id="'collapse'+comment.commentId">
            <b-list-group>
              <b-list-group-item v-for="child in comment.children">
                <b-avatar size="sm" class="mr-3" :src="child.userAvater" button
                          @click="showHisInfo(child.userId)"></b-avatar>
                <span class="mr-auto">{{ child.userName }}</span>
                <p class="commentZone">
                  {{ child.content }}
                </p>
                <p style="font-size: 0.5em">
                  {{ child.createTime }}
                  <span><b-button size="sm" variant="outline-white" :disabled="child.supported"
                                  @click="giveLike(child.commentId)"><b-icon
                      icon="hand-thumbs-up"></b-icon></b-button>{{ child.supportNum }}</span>
                </p>
              </b-list-group-item>
            </b-list-group>
          </b-collapse>
        </b-list-group-item>
      </b-list-group>
    </b-card>
    <b-modal size="lg" ref="HisInfo" hide-footer header-bg-variant="success">
      <OthersInfo :user-id="checkHisInfo"></OthersInfo>
    </b-modal>
  </div>
</template>

<script>
import OthersInfo from "@/pages/Test/OthersInfo";
import {getCommentsByAssignmentId, submitComment, addLike} from "@/api";
import HomeworkInfoCard from "@/components/homeworkInfoCard";

export default {
  name: "commentSection",
  components: {HomeworkInfoCard, OthersInfo},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.homeworkId = this.$route.query.homeworkId
      getCommentsByAssignmentId(this.homeworkId).then((res) => {
        this.comments = res.data[0].comments
        this.comments.sort((c, d) => {
          console.log(c.supportNum.toString())
          return d.supportNum - c.supportNum
        })
        for (let i = 0; i < this.comments.length; i++) {
          this.comments[i].children.sort((a, b) => {
            return b.supportNum - a.supportNum
          })
        }
      })
    },
    thesubmitComment(targetId) {
      let submitContent = ''
      for (var i = 0; i < this.comments.length; i++) {
        if (this.comments[i].commentId === targetId) {
          submitContent = this.comments[i].myComment
          break
        }
      }
      submitComment(this.$store.state.global.id, -1, targetId, this.$store.state.global.accountType, submitContent).then((res) => {
        if (res.code === 100) {
          this.clearComment(targetId)
        }
      })
      this.init()
    },
    clearComment(targetId) {
      for (var i = 0; i < this.comments.length; i++) {
        if (this.comments[i].commentId === targetId) {
          this.comments[i].myComment = ''
        }
      }
    },
    showHisInfo(userId) {
      this.checkHisInfo = userId;
      this.$refs['HisInfo'].show();
    },
    giveLike(targetId) {
      addLike(this.$store.state.global.id, targetId, this.$store.state.global.accountType).then((res) => {
        if (res.code === 100) {
          for (let i = 0; i < this.comments.length; i++) {
            if (this.comments[i].commentId === targetId) {
              this.$set(this.comments[i], 'supported', true)
              this.$set(this.comments[i], 'supportNum', this.comments[i].supportNum + 1)
              break
            }
            for (let j = 0; j < this.comments[i].children.length; j++) {
              if (this.comments[i].children[j].commentId === targetId) {
                this.$set(this.comments[i].children[j], 'supported', true)
                this.$set(this.comments[i].children[j], 'supportNum', this.comments[i].children[j].supportNum + 1)
                break
              }
            }
          }
        } else {
          this.$bvToast.toast("点赞失败", {
            title: "提示",
            variant: "danger",
            solid: true,
            autoHideDelay: 2000
          });
        }
      })
    }
  },
  data() {
    return {
      comments: {},
      openHisChild: -1,
      checkHisInfo: -1,
      homeworkId: '',
    }
  }
}
</script>


<style scoped>
.commentZone {
  margin-top: 2em;
  margin-bottom: 2em;
}

.giveComment {
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>
