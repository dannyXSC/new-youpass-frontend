<template>
<div>
</div>
<!--
<div class="container overflow-hidden"> 
    <div class="row gx-5 gy-5">
        <div class=col-4 v-for="(course,i) in courses" :key="i">
            <div class="card" style="width: 18rem;">
                <img src="..." class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">{{course.name}}</h5>
                    <i class="bi bi-check-all"></i>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
                <div class="btn-toolbar">
                     <a href="#"  class="btn"><i  class="btn btn-primary"></i></a>
                    <a href="#"  class="btn"><i  class="glyphicon  glyphicon-align-center"></i></a>
                    <a href="#"  class="btn"><i  class="glyphicon   glyphicon-align-right"></i></a>

                </div>
      </div>
        </div>
    </div>
</div>        
  --> 

</template>
<script>
export default {
    name:"Courses",
    data(){
        return{
            courses:[
                {id:"50432809",name:"计算机组成原理",img:""},
                {id:"50432432",name:"操作系统",img:""}
            ],
        }
    }
}
</script>