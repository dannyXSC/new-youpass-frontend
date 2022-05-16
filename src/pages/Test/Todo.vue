<template>
  <b-card border-variant="success">
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
                      placeholder="添加一条待办事项..."
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

        <li v-for="todo in todos" :key="todo" class="list-group-item">
          <div class="todo-indicator bg-success"></div>
          <div class="widget-content p-0">
            <div class="widget-content-wrapper">
              <div class="widget-content-left flex2">
                <div class="widget-heading">{{ todo }}</div>
              </div>
              <div class="widget-content-right">
                <button
                    class="border-0 btn-transition btn btn-outline-success"
                    @click="deleteTodo(todo)"
                >
                  <font-awesome-icon icon="check" />
                </button>
                <button
                    class="border-0 btn-transition btn btn-outline-danger"
                    @click="deleteTodo(todo)"
                >
                  <font-awesome-icon icon="trash-alt" />
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </b-card>
</template>

<script>
import PageTitle from "../../layout/Components/PageTitle.vue";

// import VuePerfectScrollbar from 'vue-perfect-scrollbar'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faTrashAlt, faCheck);

export default {
  name:'Todo',
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
    heading: "任务清单",
    subheading:
        "",
    icon: "pe-7s-paint icon-gradient bg-sunny-morning",
    todos: [],
  }),
  methods: {
    deleteTodo(key) {
      // console.log("删除了", key);
      for (let i = 0; i < this.todos.length; i++) {
        if (this.todos[i] == key) {
          if (i > -1) {
            this.todos.splice(i, 1);
          }
          break;
        }
      }
      localStorage.setItem(
          this.$store.state.global.id,
          JSON.stringify(this.todos)
      );
    },
    addTodo() {
      if (this.inputTodo != "" && !this.todos.includes(this.inputTodo)) {
        // console.log("添加Todo", this.inputTodo);
        this.todos.unshift(this.inputTodo);
        localStorage.setItem(
            this.$store.state.global.id,
            JSON.stringify(this.todos)
        );
        this.inputTodo = "";
      } else {
        alert("无法添加ToDo!");
      }
    },
  },
  beforeUpdate() {
    this.todos = JSON.parse(
        localStorage.getItem(this.id) || JSON.stringify([])
    );
  },
};
</script>

<style scoped>
.add-todo {
  padding-right: 15px;
  padding-left: 35px;
}
</style>

