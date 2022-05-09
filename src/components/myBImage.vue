<template>
  <b-img :src="imageUrl" fluid></b-img>
</template>

<script>
import {getImageUrl} from "@/api";

export default {
  name: "myBImage",
  props:["id"],
  data(){
    return{
      imageUrl: ""
    }
  },
  mounted() {
    getImageUrl(this.id).then(res=>{
      this.imageUrl = res.data.url
    })
  },
  watch:{
    id:function (newval, oldVal){
      getImageUrl(newval).then(res=>{
        this.imageUrl = res.data.url
      })
    }
  }
}
</script>

<style scoped>

</style>