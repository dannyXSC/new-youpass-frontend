<template>
   <div id="bar" style="width:1100px;height:450px;"></div>  
</template>

<script>
import * as echarts from 'echarts'
export default {
  name:'BarChart',
  props:["responseList"],
  data(){
      return{
           xlabel:[],
           examScore:[
                {name:"期中考试",value:"100"},
                {name:"期中考试",value:"100"},
                {name:"期中考试",value:"100"}

            ],
          option:{
              title: {
                    text: '所有考试成绩'         
                },
                toolbox: {
                    show: true,
                    feature: {
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                    }
                },
                calculable: true,
                xAxis: [
                    {
                    type: 'category',
                    //这个地方对应的是x轴的label,比如exma1, exam2......
                    data:[] }
                ],
                yAxis: [
                    {
                    type: 'value'
                    }
                ],
                series:[
                    {
                        type:'bar',
                        label:{show:true,position:'inside'},
                        data:"",
                    }

                ]


          }
      }
  },
  mounted()
    {
        //this.option.legend.data=this.course_id
        /*
            examScore:[
                {name:"期中考试",value:"100"},
                {name:"期中考试",value:"100"},
                {name:"期中考试",value:"100"}

            ]
        */
       this.examScore=this.responseList
       console.log(this.examScore)
        for(let i=0;i<this.examScore.length;i++){
            this.xlabel.push(this.examScore[i].name)
        }
        
        this.option.xAxis[0].data=this.xlabel
        console.log( this.option.xAxis[0].data)
        this.option.series[0].data=this.examScore
    
       // 1. 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('bar'))
        
        // 3. 使用刚指定的配置项和数据，显示图表
        myChart.setOption(this.option);         
    },
    
    
  
}
</script>

<style scoped>

</style>