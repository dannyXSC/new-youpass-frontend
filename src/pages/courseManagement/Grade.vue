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
                        text: '班级成绩分析',
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
                                { value: 1048, name: '90-100' },
                                { value: 735, name: '80-90' },
                                { value: 580, name: '70-80' },
                                { value: 484, name: '60-70' },
                                { value: 300, name: '0-60' }
                            ]
                        
                        },
                    
                    ]
            },
        }
    },
    mounted(){
         // 1. 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('score'))
		 
		  // 3. 使用刚指定的配置项和数据，显示图表
		  myChart.setOption(this.option);
    }
}
</script>