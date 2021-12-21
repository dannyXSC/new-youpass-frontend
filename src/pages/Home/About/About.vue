<template>
  <section class="about" id="about">
    <div class="title-container">
      <h2 class="title">About our project</h2>
    </div>

    <div class="info-container">
      <div class="left">
        <img src="@/assets/img/about.jpg" alt="" class="img-thumbnail">
      </div>
      <div class="right">
        <div class="text text-center">让你成为<span class="type1"></span></div>
        <p>
          Youpass是一款以大学生信息化教育为基础，以网络在线的形式为大学生学业水平情况诊断、学习指导和考试教学的一款综合
          性教学考试辅导系统。
          <br>
          面向学生，它具有参与课程、进行考试、查阅检查考试与成绩等基础教学功能。
          <br>
          面向教师，它具有创建管理课程 、发布考试、批改试卷等等相关的教学功能。
          <br>
          够在这样的信息化普及度较高的时代，极大程度地增加学生的学习效率与教师的办公效率。
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "About"
}
</script>

<style scoped>
.about {
  font-family: "Ubuntu", "Ma Shan Zheng", cursive, sans-serif;
  /*background: url("~@/assets/img/about_background.jpg") no-repeat center;*/
  /*background-size: cover;*/

}

.about .title::after {
  content: "what it's about";
}

.info-container{
  display: flex;
}

.left{
  display: inline-block;
  height: 100%;
  width: 40%;
  /*overflow: hidden;*/
}

.right{
  display: inline-block;
  height: 100%;
  width: 60%;
  padding: 0 30px;

}

.left img{
  height: 100%;
  width: 100%;
  object-fit: cover
}

.about .text {
  font-size: 35px;
  font-weight: 600;
  margin-bottom: 10px;
}

.about .text span {
  color: crimson;
}

.right {
  padding: 20px;
  background: rgba(255, 255, 255, 0.5);
}

.right p {
  padding: 20px 50px;
  font-size: 25px;
  /*margin-top: 30px;*/
}

</style>