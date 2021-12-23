<template>
    <div>
         <div class="content">
        <b-row>
          <b-col md="12">
            <div id="score" style="width:1100px;height:450px;"></div>
          </b-col>
        </b-row>
         </div>
    </div>
</template>
<script>
import * as echarts from 'echarts'
export default {
    name:"Grade",
    props:["students"],
    created(){
        
       
    },
    methods:{
        countNums(){
            
            for(let i=0;i<this.students.length;i++){
                if(this.students[i].score>=90){
                    this.option.series[0].data[0].value+=1;

                }
                else if(this.students[i].score>=80){
                    this.option.series[0].data[1].value+=1;
                }
                else if(this.students[i].score>=70){
                    this.option.series[0].data[2].value+=1;
                }
                else if(this.students[i].score>=60){
                    this.option.series[0].data[3].value+=1;
                }
                else {
                    this.option.series[0].data[4].value+=1;
                }
            }
            
        }
    },
    data(){
        return{
          
            option:{
                tooltip: {
                        trigger: 'item'
                    },
                legend: {
                    top: '90%',
                    left: 'right'
                },
                title: [
                    {
                        text: '成绩分析',
                        left: 'center'
                    },
                  
                ],
                color:[
                '#5470c6',
                '#91cc75',
                '#fac858',
                '#ee6666',
                '#73c0de',
                '#3ba272',
                '#fc8452',],

                series: [
                        {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: true,
                        },
                        emphasis: {
                            label: {
                            show: true,
                            fontSize: '20',
                            fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: true
                        },
                         data: [
                                { value: '', name: '90-100' },
                                { value:'', name: '80-90' },
                                { value: '', name: '70-80' },
                                { value: '', name: '60-70' },
                                { value: '', name: '0-60' }
                            ]
                        
                        },
                    
                    ]
            },
        }
    },
    mounted(){
        this.option.series[0].data[0].value=0
        this.option.series[0].data[1].value=0
        this.option.series[0].data[2].value=0
        this.option.series[0].data[3].value=0
        this.option.series[0].data[4].value=0
         this.countNums()
        console.log(this.option.series[0].data)
         // 1. 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('score'))
		 
		  // 3. 使用刚指定的配置项和数据，显示图表
		  myChart.setOption(this.option);
    }
}
</script>