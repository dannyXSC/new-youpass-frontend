<template>
  <div>
    <b-card>
      <b-list-group>
        <b-list-group-item v-for="comment in comments">
          <h5 class="mb-1">
            <b-avatar class="mr-3"></b-avatar>
            <span class="mr-auto">{{ comment.userName }}</span>
          </h5>
          <p class="commentZone">
            {{ comment.content }}
          </p>
          <b-row>
            <b-col cols="1">
              <span><b-button size="sm" variant="outline-white"><b-icon
                  icon="hand-thumbs-up"></b-icon>{{ comment.supportNum }}</b-button></span>
            </b-col>
            <b-col cols="1">
            <span><b-button size="sm" variant="outline-white" v-b-toggle="'collapse'+comment.commentId"><b-icon
                icon="chat-left"></b-icon>{{ comment.children.length }}</b-button></span>
            </b-col>
            <b-col cols="1">
            <span><b-button size="sm" variant="outline-white" v-b-toggle="'giveComment'+comment.commentId"><b-icon icon="chat-right-text-fill"></b-icon></b-button></span>
            </b-col>
          </b-row>
          <b-collapse :id="'giveComment'+comment.commentId" class="giveComment">
            <b-row>
              <b-col cols="11">
                <b-form-input placeholder="说点什么..." v-model="myComment"></b-form-input>
              </b-col>
            <b-button type="submit" variant="success" @click="submitComment(comment.commentId,myComment)">提交</b-button>
            </b-row>
          </b-collapse>
          <b-collapse :id="'collapse'+comment.commentId">
            <b-list-group>
              <b-list-group-item v-for="child in comment.children">
                <b-avatar size="sm" class="mr-3"></b-avatar>
                <span class="mr-auto">{{ child.userName }}</span>
                <p class="commentZone">
                  {{ child.content }}
                </p>
              </b-list-group-item>
            </b-list-group>
          </b-collapse>
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "CommentSection",
  methods: {
    submitComment(targetId){
      console.log(
          {
            userId:this.$store.state.global.id,
            targetCommentId:targetId,
            content:this.myComment
          }
      );
      this.myComment='';
    }
  },
  data() {
    return {
      comments: [
        {
          userId: 1950000,
          userName: "student",
          commentId: 1,
          content: "第一条评论",
          supportNum: 1,
          children: [
            {
              userId: 1950002,
              userName: "张纪鹏",
              commentId: 3,
              supportNum: 123,
              content: "回复第一条评论",
            },
            {
              userId: 1950003,
              userName: "谢思程",
              commentId: 4,
              supportNum: 123,
              content: "回复第一条评论",
            },
          ],
        },
        {
          userId: 1950001,
          userName: "student2",
          commentId: 2,
          supportNum: 123,
          content: "第二条评论",
          children: [
            {
              userId: 1950004,
              userName: "蒙俊杰",
              commentId: 5,
              supportNum: 123,
              content: "回复第一条评论",
            },
            {
              userId: 1950005,
              userName: "柳淯之",
              commentId: 6,
              supportNum: 123,
              content: "回复第一条评论",
            },
          ],
        },
      ],
      myComment:'',
      openHisChild:-1,
    }
  }
}
</script>

<style scoped>
.commentZone {
  margin-top: 2em;
  margin-bottom: 2em;
}
.giveComment{
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>
