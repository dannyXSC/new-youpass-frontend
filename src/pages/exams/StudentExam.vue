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
            header="成绩条形图" 
            class="mb-3">
                 <bar-chart v-bind:responseList="responseList"></bar-chart>
            </b-card>

            <b-card
            header="学生成绩表">
                 <exams-list v-bind:responseList="responseList"></exams-list>
            </b-card>
                
        </div>
        
        

    </div>
</template>
<script>
import PageTitle from "@/layout/Components/PageTitle.vue";
import MyList from "@/components/myList";
import Grade from "@/pages/exams/Grade.vue"
import BarChart from "@/pages/exams/BarChart.vue"
import Students from "@/pages/exams/Students.vue"
import ExamTable from "@/pages/exams/ExamsTable.vue"
import {getAllStudents } from '@/api';
import ExamsList from './ExamsList.vue';


export default {
    name: 'StudentExam',
    components: {MyList, PageTitle,Grade,Students,ExamTable, BarChart, ExamsList},
    props:["responseList"],
    data(){
        return{  
            examId:"",
            exam:"",
            courseId:"",
            students:"",
            exams:"",
            heading:"成绩",
            subheading:"一下是当前课程的所有考试成绩",
            icon: 'pe-7s-plane icon-gradient bg-tempting-azure',

        }
    }
}
</script>
