<template>
  <div>
    <div class="app-page-title">
      <div class="page-title-wrapper">
        <div class="page-title-heading">
          <div class="page-title-icon">
            <i :class="icon" />
          </div>
          <div>
            {{ heading }}
            <div class="page-title-subheading">
              {{ subheading }}
            </div>
          </div>
        </div>
        <div class="page-title-actions">
        </div>
      </div>
    </div>
    <b-breadcrumb v-if="noBar" :items="breadcrumbItem"></b-breadcrumb>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faArrowLeft, faArrowRight);

export default {
  components: {
    "font-awesome-icon": FontAwesomeIcon,
  },
  props: {
    icon: String,
    heading: String,
    subheading: String,
    breadcrumbItem: Array,
    NoBar:Boolean
  },
  data(){
    return{
      noBar:true
    }
  },
  mounted() {
    if(this.NoBar===true){
      this.noBar=false
    }
  }
};
</script>
