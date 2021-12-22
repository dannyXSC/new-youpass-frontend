<template>
    <div>
        
        <b-container>
            <b-row>
                <b-col  cols-lg="12">
                   
                 <page-title :heading=heading
                        :subheading=subheading       
                >
                    <template v-slot:button>
                            nothing
                    </template>
                  
                </page-title>
                </b-col>
            </b-row>
            <b-row>
                <b-col id="课程" md="9">
              
                    <b-card 
                        body-border-variant="dark"
                        header="我的课程"
                        header-text-variant="white"
                        header-class="h5"
                        header-bg-variant="dark">
                         <b-row> 
                         <b-col sm="4" v-for="(exam,i) in exams" :key="i">
                             <!--
                              <b-card body-class="courseCard" bg-variant="dark" text-variant="white" title="Card Title">
                                <b-card-text>
                                    加油！
                                </b-card-text>
                                <b-button href="#" variant="primary">Go somewhere</b-button>
                                <b-button class="mr-2 mb-2 border-0 btn-transition" variant="outline-info">
                                    {{variant}}
                                </b-button>
                            </b-card>
                              -->
                            <b-card
                               border-variant="warning"
                                img-src="https://gitee.com/Floriaa/sy/raw/master/1.jpeg"
                                img-alt="Image"
                                img-top
                                title-tag="h5"
                                img-height="120"
                                tag="article"
                                style="max-width: 20rem;"
                                class="mb-4"
                                body-class="pl-3 py-2"
                                @click="gotoExam(exam.id)"
                            >
                            <template style="padding:0px">
                                <b-card-text class="font-weight-bold ">
                                    {{exam.title}}
                                </b-card-text>
                                <b-card-text class="font-weight-light">
                                    开始时间:{{exam.start_time | formatDate}}
                                </b-card-text>
                                <b-card-text class="font-weight-light">
                                    截止时间: {{exam.end_time | formatDate}}
                                </b-card-text>
                               
                            </template>

                                </b-card>
                         </b-col>
                    </b-row>
                    </b-card>
                    <b-card id="成绩">

                    </b-card>
                </b-col >
                <!--
                <b-col id="个人信息" md="3">
                    <b-card 
                        body-border-variant="warning"
                        header="个人信息"
                        header-text-variant="white"
                        header-class="h5"
                        header-bg-variant="warning">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">姓名:{{student.name}}</li>
                            <li class="list-group-item">学号:{{student.student_id}}</li>
                            <li class="list-group-item">邮箱:{{student.email}}</li>
                            <li class="list-group-item">位置:{{student.location}}</li>
                            
                        </ul> 
                    </b-card>


                </b-col>
                -->
            </b-row>
        </b-container>
    </div>
</template>
<style>

</style>
<script>
import PageTitle from "@/layout/Components/PageTitle.vue";
import {getExams} from "@/api/index"


export default {
    
    
    name:"PersonalPage",
    
    components: {PageTitle},
    created(){
        //this.$router.push(`/personal/${1000}`)
        this.courseId=this.$route.params.courseId
        console.log(this.courseId)

        getExams(
            this.courseId
        ).then(res=>{
            this.exams=res.data
            console.log("aaa")
            console.log(res.data)
        })
    },
    methods:{
        gotoExam(examId){
        this.$router.push(`/exam/${examId}`)
        
      },   
    },
    data(){
        return{
            courseId:"",
            student:{student_id:"1956237",name:"娃哈哈",email:"whh@tj.edu.cn",location:"上海"},
            heading:"考试管理",
            subheading:"在此查看所有课程、个人信息以及成绩信息",
            exams:[
                {couseId:'1000',exam_id:"1",title:"小测1",start_time:"2021年5月14日 14:23:23",end_time:"2021年5月14日 15:46:32"},
             
                
    
            ],
        }
      
        
    }
}
</script>