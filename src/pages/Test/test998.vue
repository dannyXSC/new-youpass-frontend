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
                      <h5>多项选择题</h5>
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
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Labore ipsum itaque
                voluptatibus veniam nobis non enim qui, laborum sequi suscipit.
                Sed corporis suscipit soluta distinctio cupiditate impedit ipsa
                in velit. Lorem ipsum dolor sit amet, consectetuer adipiscing
                elit. Aenean commodo ligula eget dolor. Aenean massa.
              </p>
                <div class="wrapper">
                    <croppa 
                    :height="resizableH"
                    :width="resizableW"
                    :show-remove-button="false"
                    class="resizable-croppa"></croppa>
                    <img src="../../assets/images/resize.png"
                    class="icon-resize"
                    @mousedown.stop.prevent="onResizeTouchStart">
                </div>
            </div>
          </div>

          <div class="main-card mb-3 card">
            <div class="card-body">
              <h5 class="card-title">学生答案</h5>
              <hr />
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Labore ipsum itaque
                voluptatibus veniam nobis non enim qui, laborum sequi suscipit.
                Sed corporis suscipit soluta distinctio cupiditate impedit ipsa
                in velit. Lorem ipsum dolor sit amet, consectetuer adipiscing
                elit. Aenean commodo ligula eget dolor. Aenean massa.
              </p>
                
                  <croppa v-model="picQue"
                    initial-image="https://zhanziyang.github.io/vue-croppa/static/500.jpeg"
                    :width="350"
                    :height="350"
                    :accept="'image/*'"
                    placeholder="Choose an image"
                    :placeholder-font-size="0"
                    :disabled="false"
                    :prevent-white-space="false"
                    :show-remove-button="false">  
                </croppa >
                <div class="modal-footer clearfix">
                <div class="float-right">
                  <b-button variant="success" size="sl" @click="download('image/jpeg')"
                    >Download Answer
                  </b-button>
                </div>
              </div>
            </div>
          </div>

          <div class="main-card mb-3 card">
            <div class="card-body">
              <h5 class="card-title">标准答案</h5>
              <hr />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
                ipsum itaque voluptatibus veniam nobis non enim qui, laborum
                sequi suscipit. Sed corporis suscipit soluta distinctio
                cupiditate impedit ipsa in velit. Lorem ipsum dolor sit amet,
                consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                Aenean massa.
              </p>
              <croppa v-model="picQue"
                    :width="350"
                    :height="350"
                    :accept="'image/*'"
                    placeholder="Choose an image"
                    :placeholder-font-size="0"
                    :disabled="false"
                    :prevent-white-space="false"
                    :show-remove-button="false">  
                </croppa >
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
import Vue from 'vue'
import Croppa from 'vue-croppa'
Vue.use(Croppa)
// import MyCountBar from "@/components/myCountBar";
export default {
  components: {

    name: "test998",
    // MyCountBar,
    data(){
        return{
            resizing: false,
            resizableH: 200,
            resizableW: 300,
            dataUrl: ''
        }
    },
    mounted(){
        document.documentElement.addEventListener('mousemove',(evt)=>{
            evt.preventDefault()
            this.onResizeTouchMove(evt)
        })
        document.documentElement.addEventListener('mouseup',(evt)=>{
            evt.preventDefault()
            this.onResizeTouchEnd(evt)
        })
    },
    methods:{
        download(type, compressionRate) {
      this.croppa.generateBlob((blob) => {
        var url = URL.createObjectURL(blob)
        console.log(url)
        var a = document.createElement('a');
        a.download = 'filename';
        a.href = url;
        a.click();
        URL.revokeObjectURL(url);
      }, type, compressionRate)
    },
        onResizeTouchStart(evt){
            this.resizing = true
        },
        onResizeTouchMove(evt){
            if(!this.resizing)return
            document.documentElement.style.cursor = 'nwse-resize'

            var croppa = document.querySelector('.resizable-croppa')
            this.resizableW = evt.clientX - croppa.getBoundingClientRect().left
            this.resizableH = evt.clientY - croppa.getBoundingClientRect().top
        },
        onResizeTouchEnd(evt){
            this.resizing = false
            document.documentElement.style.cursor = 'default'
        }
    }
  },
};
</script>

<style scoped>
.test4-input {
  margin-top: 13px;
}
.wrapper{
    position: relative;
    display: inline-block;
    font-size: 0;
}
.icon-resize{
    position: absolute;
    right: 4px;
    bottom: 4px;
    font-size: 16px;
    width: 2em;
    cursor: nwse-resize;
}
</style>
