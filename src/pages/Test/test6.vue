<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col cols="8">
          <div class="main-card mb-3 card">
            <div class="card-body">
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

              <croppa v-model="croppa"
                      initial-image="https://zhanziyang.github.io/vue-croppa/static/500.jpeg"
                      :width="350"
                      :height="350"
                      :accept="'image/*'"
                      placeholder="Choose an image"
                      :placeholder-font-size="0"
                      :disabled="false"
                      :prevent-white-space="false"
                      :show-remove-button="false">
              </croppa>
              <div class="modal-footer clearfix">
                <div class="float-right">
                  <b-button variant="success" size="sl" @click="download('image/jpeg')"
                  >Download Answer
                  </b-button>
                </div>
              </div>
            </div>
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


// import MyCountBar from "@/components/myCountBar";
export default {
  name: "test6",
  // MyCountBar,
  data() {
    return {
      resizing: false,
      resizableH: 200,
      resizableW: 300,
      dataUrl: '',
      croppa: {}
    }
  },
  mounted() {
    document.documentElement.addEventListener('mousemove', (evt) => {
      evt.preventDefault()
      this.onResizeTouchMove(evt)
    })
    document.documentElement.addEventListener('mouseup', (evt) => {
      evt.preventDefault()
      this.onResizeTouchEnd(evt)
    })
  },
  methods: {
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
    onResizeTouchStart(evt) {
      this.resizing = true
    },
    onResizeTouchMove(evt) {
      if (!this.resizing) return
      document.documentElement.style.cursor = 'nwse-resize'

      var croppa = document.querySelector('.resizable-croppa')
      this.resizableW = evt.clientX - croppa.getBoundingClientRect().left
      this.resizableH = evt.clientY - croppa.getBoundingClientRect().top
    },
    onResizeTouchEnd(evt) {
      this.resizing = false
      document.documentElement.style.cursor = 'default'
    }
  }
};
</script>

<style scoped>
.test4-input {
  margin-top: 13px;
}

.wrapper {
  position: relative;
  display: inline-block;
  font-size: 0;
}

.icon-resize {
  position: absolute;
  right: 4px;
  bottom: 4px;
  font-size: 16px;
  width: 2em;
  cursor: nwse-resize;
}
</style>
