<template>
<div class="form-group row">
        <label for="userIDImageFront" class="col-sm-3">身份证正面：</label>
        <div class="col-sm-5">
            <input id="userIDImageFront" type="file" class="file" data-preview-file-type="text" required name="imgPath">
        </div>
        <!-- <img class="col-sm-4" src="@/assets/img/frontPic.png" alt="样图" /> -->
      </div>

</template>

<script>
import $ from 'jquery'
require('bootstrap-fileinput/js/fileinput.js') // 引入图片上传插件  input 的逻辑全部都写在了这个文件内部了  需要注意！！！
require('bootstrap-fileinput/js/locales/zh.js') // 引入图片插件的汉化包
require('bootstrap-fileinput/themes/fa/theme.js') // 引入主题包
require('bootstrap/dist/js/bootstrap.js') // 引入 bootstrap
export default {
  name: "test5",
  data(){
  return{
    // 图片上传接口
    imgUploadAPI: 'xxx'
  }
}
,
mounted(){
  // 初始化图片上传控件
    this.initInputFile($('input.file[type=file]'), this.imgUploadAPI)
},

methods:{
  // 初始化图片上传控件
    initInputFile: function(eles, posturl) {
      const me = this
      let $input = eles
      if ($input.length) {
        $input
          .fileinput({
            /**
             * theme icon 主题 需要引入相应的主题包
             * language 语言设置 需要引入相应的语言包
             * uploadUrl 上传路径
             * showCaption 是否展示 input 文字的说明 -- 标题
             * showUpload 是否显示上传按钮
             * showRemove 是否可以删除
             * dropZoneEnabled 是否开启拖拽上传功能
             * maxFileCount 最多的文件数量
             * maxFileSize 最大的尺寸
             * allowedFileExtensions 允许的文件扩展名
             */
            theme: 'fa',
            language: 'zh',
            uploadUrl: posturl,
            showUpload: false,
            showRemove: false,
            dropZoneEnabled: false,
            maxFileCount: 1,
            allowedFileExtensions: ['jpg', 'png', 'gif']
          })
          // 实现图片被选中后自动提交
          .on('filebatchselected', function(event, files) {
            // 选中事件
            $(event.target).fileinput('upload')
          })
          .on('fileuploaded', function(event, data) {
            // 提交成功之后
            let eleID = $(event.target).prop('id')
            // console.log(eleID)
            // 通过 ID 判断给相应的字段赋值
            if (eleID === 'userIDImageFront') {
              // 正面
              me.postData.frontPic = JSON.parse(getData.result).url
            } else if (eleID === 'userIDImageBack') {
              // 背面
              me.postData.reversePic = me.postData.frontPic = JSON.parse(
                  getData.result
                ).url
            } else if (eleID === 'userIDSIM') {
              // 手持
              me.postData.handPic = me.postData.frontPic = JSON.parse(
                  getData.result
                ).url
            }
          })
      }
    },
}
}
</script>

<style scoped>

</style>