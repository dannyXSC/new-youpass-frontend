<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col cols="8">
          <div class="main-card mb-3 card">
            <b-card-header v-b-modal.modalBox class="border-1">
              <h3 class="card-title">题目信息</h3>
            </b-card-header>
            <b-card-body>
              <li class="list-group-item">
                <div class="widget-content p-0">
                  <div class="widget-content-wrapper">
                    <div class="widget-content-left">
                      <h5>题目分数</h5>
                    </div>
                    <div class="widget-content-right">
                      <h5>4</h5>
                    </div>
                  </div>
                </div>
              </li>
              <li class="list-group-item">
                <div class="widget-content p-0">
                  <div class="widget-content-wrapper">
                    <div class="widget-content-left">
                      <h5>题目类型</h5>
                    </div>
                    <div class="widget-content-right">
                      <h5>图片题</h5>
                    </div>
                  </div>
                </div>
              </li>
            </b-card-body>
          </div>

          <div class="main-card mb-3 card">
            <div class="card-body">
              <h5 class="card-title">题干信息</h5>
              <hr />
              <p>
                {{question.questionDescription}}
              </p>
              <div class="main-card mb-3 card" v-for="(que,index) in question.questionPic">
                <test61
                  :initDraggable="false"
                  :imgUrl="question.questionPic[index]"></test61>
              </div>
            </div>
          </div>

          <div class="main-card mb-3 card">
            <div class="card-body">
              <h5 class="card-title">学生答案</h5>
              <hr />
              <p>
                {{studentAnswers[0].description}}
              </p>
              <div class="main-card mb-3 card" v-for="(answer,index) in studentAnswers[0].studentAnswer">
                <test62
                    :initDraggable="false"
                    :imgUrl="studentAnswers[0].studentAnswer[index]">
                </test62>
              </div>
                
            </div>
            <b-card-footer>
                <div class="test4-input">
                  <b-container>
                    <b-row class="justify-content-end">
                      <b-col cols="12" md="auto">
                        <b-button pill variant="outline-success" @click="submit"
                          >下载学生答案</b-button
                        >
                      </b-col>
                    </b-row>
                  </b-container>
                </div>
              </b-card-footer>
          </div>

          <div class="main-card mb-3 card">
            <div class="card-body">
              <h5 class="card-title">标准答案</h5>
              <hr />
              <p>
                {{standardAnswer.standardDescription}}
              </p>
              <div class="main-card mb-3 card" v-for="(answer,index) in standardAnswer.standardPic">
              <test63
                :initDraggable="false"
                :imgUrl="standardAnswer.standardPic[index]"></test63>
              </div>
            </div>
          </div>
        </b-col>
        <b-col cols="4">
          <div>
            <b-card body-class="text-center">
              <template #header> 批改信息 </template>

              <h5 class="card-title">已批改人数：<span>5</span></h5>
              <h5 class="card-title">总人数：<span>50</span></h5>

              <b-card-body>
                <b-container style="max-width: 210px">
                  <b-row>
                    <b-col cols="4">
                      <b-button pill variant="success">1</b-button>
                    </b-col>
                    <b-col cols="4">
                      <b-button pill variant="success">2</b-button>
                    </b-col>
                    <b-col cols="4">
                      <b-button pill variant="success">3</b-button>
                    </b-col>
                  </b-row>
                  <br />
                  <b-row>
                    <b-col cols="4">
                      <b-button pill variant="success">4</b-button>
                    </b-col>
                    <b-col cols="4">
                      <b-button pill variant="success">5</b-button>
                    </b-col>
                    <b-col cols="4">
                      <b-button pill variant="success">6</b-button>
                    </b-col>
                  </b-row>
                  <br />
                  <b-row>
                    <b-col cols="4">
                      <b-button pill variant="success">7</b-button>
                    </b-col>
                    <b-col cols="4">
                      <b-button pill variant="success">8</b-button>
                    </b-col>
                    <b-col cols="4">
                      <b-button pill variant="success">9</b-button>
                    </b-col>
                  </b-row>
                  <br />
                  <b-row>
                    <b-col cols="4">
                      <b-button pill variant="success">10</b-button>
                    </b-col>
                    <b-col cols="4">
                      <b-button pill variant="success">11</b-button>
                    </b-col>
                    <b-col cols="4">
                      <b-button pill variant="success">12</b-button>
                    </b-col>
                  </b-row>
                  <br />
                </b-container>
              </b-card-body>

              <div style="display: flex; justify-content: center">
                <b-pagination
                  v-model="currentPage"
                  :total-rows="20"
                  :per-page="1"
                  pills
                  size="sm"
                ></b-pagination>
              </div>

              <b-card-footer>
                <div class="test4-input">
                  <b-container>
                    <b-row>
                      <b-col cols="8">
                        <b-form-input
                          type="number"
                          name="number"
                          id="exampleNumber"
                          placeholder="输入分数..."
                        />
                      </b-col>

                      <b-col cols="4">
                        <button
                          type="button"
                          tabindex="0"
                          class="dropdown-item"
                        >
                          确认
                        </button>
                      </b-col>
                    </b-row>
                  </b-container>
                </div>
              </b-card-footer>
            </b-card>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import 'vue-croppa/dist/vue-croppa.css'
const test61 = () => import('../Test/test6.vue')
const test62 = () => import('../Test/test6.vue')
const test63 = () => import('../Test/test6.vue')

// import MyCountBar from "@/components/myCountBar";
export default {
    name: "test998",
    components:{test61,test62,test63},
    // MyCountBar,
    data(){
        return{
            imgUrl:'https://zhanziyang.github.io/vue-croppa/static/500.jpeg',
            dataUrl: '',
            answer: {},
            studentAnswers:[
              {
                questionId: 4,
                studentId: 4,
                numInPaper: 4,
                description: "第一题xxxx 1_321",
                studentAnswer: ["https://picsum.photos/1024/400/?image=41","https://picsum.photos/1024/400/?image=41"]
              },
              {
                questionId: 4,
                studentId: 5,
                numInPaper: 5,
                description: "第一题xxxx 1_321",
                studentAnswer: ["https://picsum.photos/1024/400/?image=41","https://picsum.photos/1024/400/?image=41"]
              },
            ],
            question:{
              questionPic:["https://picsum.photos/1024/400/?image=41","https://picsum.photos/1024/400/?image=41"],
              questionDescription:"adsadasdadsas"
            },
            standardAnswer:{
              standardPic:["https://picsum.photos/1024/400/?image=41","https://picsum.photos/1024/400/?image=41"],
              standardDescription:"adsadasdadsas"
            }
            
        }
    },
    mounted(){
        
    },
    methods:{
       
    }

};
</script>

<style scoped>
.test4-input {
  margin-top: 13px;
}
</style>
