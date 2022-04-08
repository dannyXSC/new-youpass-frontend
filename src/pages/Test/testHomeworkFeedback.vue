<template>
  <div>
    <div class="main-card mb-3 card" v-for="(questionInfo,index) in questionInfos">
      <my-feedback v-model:value="questionInfos[index]"/>
    </div>
  </div>
</template>

<script>
import MyFeedback from "@/components/myFeedback";

export default {
  name: "testHomeworkFeedback",
  components: {MyFeedback},
  data() {
    return {
      questionInfos: [
        {
          type: 0,
          questionId: 1,
          numInPaper: 1,
          description: "第一题xxxx 1_321",
          options: [
            {
              optionId: 1,
              description: "答案1",
            },
            {
              optionId: 2,
              description: "答案2",
            },
            {
              optionId: 3,
              description: "答案3",
            },
            {
              optionId: 4,
              description: "答案4",
            }
          ],
          studentAnswer: [1],
          standardAnswer: [2],
          textComment: "加油1",
          pictureComment: ["http://dannyxsc.xyz/img/image-20220225233444664.png"],
        },
        {
          type: 1,
          questionId: 2,
          numInPaper: 2,
          description: "第一题xxxx 1_321",
          options: [
            {
              optionId: 1,
              description: "答案1",
            },
            {
              optionId: 2,
              description: "答案2",
            },
            {
              optionId: 3,
              description: "答案3",
            },
            {
              optionId: 4,
              description: "答案4",
            }
          ],
          studentAnswer: [2, 1],
          standardAnswer: [0, 1, 2, 3],
          textComment: "加油2",
          pictureComment: ["http://dannyxsc.xyz/img/image-20220225233444664.png"],
        },
        {
          type: 2,
          questionId: 3,
          numInPaper: 3,
          description: "第一题xxxx 1_321",
          studentAnswer: "321321_{qwer}",
          standardAnswer: "我爱你中国",
          textComment: "加油3",
          pictureComment: ["http://dannyxsc.xyz/img/image-20220225233444664.png"],
        },
        {
          type: 3,
          questionId: 4,
          numInPaper: 4,
          description: "第一题xxxx 1_321",
          pictureDescriptions: ["https://picsum.photos/1024/400/?image=41"],
          studentAnswer: "33333",
          // studentPictureAnswers: ["https://picsum.photos/1024/400/?image=41"],
          standardAnswer: "我爱你中国222",
          standardPictureAnswers: [
            "http://dannyxsc.xyz/img/%E6%88%AA%E5%B1%8F2022-02-25%20%E4%B8%8A%E5%8D%8811.18.30.png",
            "http://dannyxsc.xyz/img/image-20220225222647576.png"
          ],
          textComment: "加油4",
          pictureComment: ["http://dannyxsc.xyz/img/image-20220225233444664.png"],
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>