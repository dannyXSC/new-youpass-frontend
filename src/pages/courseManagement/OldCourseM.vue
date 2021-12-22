<template>
    <div>
        <div class="row">
            <div class="col">
                <page-title :heading=heading
                        :subheading=subheading       
                >
                    <template v-slot:button>
                            <b-dropdown id="dropdown-left" text="选择课程" variant="primary" class="m-2">
                                <b-dropdown-item v-for="(courseName,i) in coursesName" :key="i">{{courseName.name}}</b-dropdown-item>
                            </b-dropdown>
                    </template>
                  
                </page-title>
            </div>

        </div>
        <div>
            <b-card no-body>
                <b-tabs card>
                <b-tab title="人员">
                    <students :v-bind="students"></students>
                </b-tab>
                <b-tab title="考试成绩分析">
                    <exam-table></exam-table>
                    <grade></grade>
                </b-tab>
                
                <b-tab title="发布考试">
                </b-tab>
                <b-tab title="批改考试">
                </b-tab>
                </b-tabs>
            </b-card>
        </div>
        
        

    </div>
</template>
<script>
import PageTitle from "@/layout/Components/PageTitle.vue";
import MyList from "@/components/myList";
import Courses from "./Courses.vue"
import Grade from "./Grade.vue"
import Students from "./Students.vue"
import ExamTable from "./ExamsTable.vue"

export default {
    name: 'CourseManagement',
    components: {MyList, PageTitle,Courses,Grade,Students,ExamTable},
    created(){
        this.courseId=kthis.$route.params.id
    },
    data(){
        return{
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
            students:[
                {
                    name:"coco",
                    id:"1953275",
                    score:"100"
                },
                {
                    name:"coco",
                    id:"1953275",
                    score:"100"
                },
                {
                    name:"coco",
                    id:"1953275",
                    score:"100"
                },
                {
                    name:"coco",
                    id:"1953275",
                    score:"100"
                },
                {
                    name:"coco",
                    id:"1953275",
                    score:"100"
                },
                {
                    name:"coco",
                    id:"1953275",
                    score:"100"
                },
            ],

            heading:"班级管理",
            subheading:"在这里管理班级，查看学生",
            icon: 'pe-7s-plane icon-gradient bg-tempting-azure',

        }
    }
}
</script>
