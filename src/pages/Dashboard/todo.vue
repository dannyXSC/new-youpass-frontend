<template>
  <div>
    <div class="main-card mb-3 card">
      <div class="card-header"><h3 class="card-title">待办事项</h3></div>
      <ul class="todo-list-wrapper list-group list-group-flush">
        <li class="list-group-item">
          <div class="todo-indicator bg-success"></div>
          <div class="widget-content p-0">
            <div class="widget-content-wrapper">
              <div class="widget-content-left flex2">
                <div class="add-todo">
                  <b-form-input
                    v-model="inputTodo"
                    type="text"
                    name="text"
                    id="exampletext"
                    placeholder="添加代办事项..."
                    @keyup.enter="addTodo"
                  />
                </div>
              </div>
              <div class="widget-content-right">
                <button
                  type="button"
                  tabindex="0"
                  class="dropdown-item"
                  @click="addTodo"
                >
                  添加
                </button>
              </div>
            </div>
          </div>
        </li>

        <li v-for="todo in todos" :key="todo.id" class="list-group-item">
          <div class="todo-indicator bg-success"></div>
          <div class="widget-content p-0">
            <div class="widget-content-wrapper">
              <div class="widget-content-left flex2">
                <div class="widget-heading">{{ todo.content }}</div>
              </div>
              <div class="widget-content-right">
                <button
                  class="border-0 btn-transition btn btn-outline-success"
                  @click="deleteTodo(todo.id)"
                >
                  <font-awesome-icon icon="check" />
                </button>
<!--                <button-->
<!--                  class="border-0 btn-transition btn btn-outline-danger"-->
<!--                  @click="deleteTodo(todo)"-->
<!--                >-->
<!--                  <font-awesome-icon icon="trash-alt" />-->
<!--                </button>-->
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import PageTitle from "../../layout/Components/PageTitle.vue";

// import VuePerfectScrollbar from 'vue-perfect-scrollbar'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {addTodo, getTodo,deleteTodo} from "@/api/index.js";

//日期格式化
Date.prototype.format = function (fmt) {
  let o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

library.add(faTrashAlt, faCheck);

export default {
  components: {
    PageTitle,
    "font-awesome-icon": FontAwesomeIcon,
  },
  computed: {
    id() {
      return this.$store.state.global.id;
    },
  },
  data: () => ({
    inputTodo: "",
    heading: "List Groups",
    subheading:
      "These can be used with other components and elements to create stunning and unique new elements for your UIs.",
    icon: "pe-7s-paint icon-gradient bg-sunny-morning",
    todos: [],
  }),
  methods: {
    deleteTodo(key) {
       console.log("删除了", key);
      deleteTodo(key).then(res=>{
        if(res.code===100){
          console.log("删除成功")
        }
      })
      for (let i = 0; i < this.todos.length; i++) {
        if (this.todos[i].id === key) {
          if (i > -1) {
            this.todos.splice(i, 1);
          }
          break;
        }
      }
      // localStorage.setItem(
      //   this.$store.state.global.id,
      //   JSON.stringify(this.todos)
      // );
    },
    addTodo() {
      console.log(123123)
      if (this.inputTodo !== "") {
        // this.todos.unshift(this.inputTodo);
        addTodo(this.inputTodo).then(res=>{
          if(res.code===100){
            console.log("添加成功")
            getTodo().then(res=>{
              console.log(res)
              if(res.code===100){
                this.todos=res.data
                this.todos.reverse()
              }
              else{
                console.log("在添加时出错")
              }
            })
          }
        })
        // localStorage.setItem(
        //   this.$store.state.global.id,
        //   JSON.stringify(this.todos)
        // );
        this.inputTodo = "";
      } else {
        alert("待做事项不能为空");
      }
    },
  },
  mounted() {
    getTodo().then(res=>{
      console.log(res)
      if(res.code===100){
        this.todos.length = 0
        for(let i = 0 ;i<res.data.length;i++){
          this.todos.unshift(res.data[i])
        }
      }
      else{
        console.log("在添加时出错")
      }
    })
  },
  beforeUpdate() {

    // this.todos = JSON.parse(
    //   localStorage.getItem(this.id) || JSON.stringify([])
    // );
  },
};
</script>

<style scoped>
.add-todo {
  padding-right: 15px;
  padding-left: 35px;
}
</style>
