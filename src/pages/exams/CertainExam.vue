<template>
    <div>
        <div class="row">
            <div class="col">
                <page-title :heading=heading
                        :subheading=subheading       
                >
                   
                </page-title>
            </div>

        </div>
        <div>
            <b-card
            header="成绩饼状图" 
            class="mb-3">
                 <grade v-bind:students="students"></grade>
            </b-card>
            <b-card
            header="学生成绩表">
                 <students v-bind:students="students"></students>
            </b-card>
                
        </div>
        
        

    </div>
</template>
<script>
import PageTitle from "@/layout/Components/PageTitle.vue";
import MyList from "@/components/myList";

import Grade from "./Grade.vue"
import Students from "./Students.vue"
import ExamTable from "./ExamsTable.vue"
import { getAllStudents } from '@/api';

export default {
    name: 'CertainExam',
    components: {MyList, PageTitle,Grade,Students,ExamTable},
    created(){
        this.examId=this.$route.params.examId
        this.exam=this.$store.state.global.currentExam
        this.courseId=this.$store.state.global.currentCourseId
        this.heading=this.exam.title
        getAllStudents(this.courseId,this.examId).then(res=>{
            console.log("I'm in!")
            console.log(res.data)
            this.students=res.data
        })
    },
    
    data(){
        return{
            examId:"",
            exam:"",
            courseId:"",
            coursesName:[
                {
                    name:"编译原理",
                    id:"5408378"
                },
                 {
                    name:"计算机网络",
                  
                  id:"5408379"
                },

            ],
            students:"",

            heading:"",
            subheading:"您可以在此处查看班级同学的成绩",
            icon: 'pe-7s-plane icon-gradient bg-tempting-azure',

        }
    }
}
</script>
