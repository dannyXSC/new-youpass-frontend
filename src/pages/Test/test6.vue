<template>
  <div>
    <b-container fluid>
        <div class="main-card mb-3 card">
            <div class="card-body">
              <div class="wrapper">
                <croppa
                    :initial-image="img"
                    :height="resizableH"
                    :width="resizableW"
                    :show-remove-button="false"
                    class="resizable-croppa"></croppa>
                <img v-if="draggable" src="../../assets/images/resize.png"
                     class="icon-resize"
                     @mousedown.stop.prevent="onResizeTouchStart">
              </div>
              <div v-if="showDownload" class="modal-footer clearfix">
                <div class="float-right">
                  <b-button variant="success" size="sl" @click="download('image/jpeg')"
                  >Download Answer
                  </b-button>
                </div>
              </div>
            </div>
        </div>
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
  props: {
    showDownload:Boolean,
    imgUrl:String,
    initDraggable:Boolean
  },
  data() {
    return {
      img: this.imgUrl,
      draggable:this.initDraggable,
      resizing: false,
      resizableH: 500,
      resizableW: 600,
      dataUrl: '',
      answer: {}
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
      this.answer.generateBlob((blob) => {
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
  font-size: 10px;
  width: 2em;
  cursor: nwse-resize;
}
.resizable-croppa{
    max-width: 600px;
}
</style>
