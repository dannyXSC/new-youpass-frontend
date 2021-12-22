<template>
  <div>
    <div class="main-card mb-3 card">
      <div class="card-header"><h3 class="card-title">Todos</h3></div>
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
                    placeholder="Add Todo..."
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
                  Add
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

    <div class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="main-card mb-3 card">
            <div class="card-header">
              <h3 class="card-title">Coming Exams</h3>
              <hr />
              <div
                class="vertical-time-simple vertical-without-time vertical-timeline vertical-timeline--animate vertical-timeline--one-column"
              >
                <div
                  v-for="(exam, index) in $store.state.global.examList"
                  :key="index"
                  class="dot-primary vertical-timeline-element"
                >
                  <div>
                    <span
                      class="vertical-timeline-element-icon bounce-in"
                    ></span>
                    <div class="vertical-timeline-element-content bounce-in">
                      <h4 class="timeline-title">
                        {{ exam.start_time.slice(0, 10) }} , at
                        <span class="text-success">{{
                          exam.start_time.slice(11, 16)
                        }}</span>
                      </h4>
                      <div class="col-md-9">
                        <div>
                          <h5>
                            <span class="text-secondary"
                              >{{ exam.title }}
                            </span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "../../layout/Components/PageTitle.vue";

// import VuePerfectScrollbar from 'vue-perfect-scrollbar'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faTrashAlt, faCheck);

export default {
  components: {
    PageTitle,
    "font-awesome-icon": FontAwesomeIcon,
  },
  data: () => ({
    inputTodo: "",
    heading: "List Groups",
    subheading:
      "These can be used with other components and elements to create stunning and unique new elements for your UIs.",
    icon: "pe-7s-paint icon-gradient bg-sunny-morning",
    breadcrumbItem: [
      {
        text: "Admin",
        href: "#",
      },
      {
        text: "Manage",
        href: "#",
      },
      {
        text: "Test1",
        href: "#",
      },
      {
        text: "Library",
        active: true,
      },
    ],
    todos: [],
  }),
  methods: {
    deleteTodo(key) {
      console.log("删除了", key);
      for (var i = 0; i < this.todos.length; i++) {
        if (this.todos[i] == key) {
          if (i > -1) {
            this.todos.splice(i, 1);
          }
          break;
        }
      }
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    addTodo() {
      if (this.inputTodo != "" && !this.todos.includes(this.inputTodo)) {
        console.log("添加Todo", this.inputTodo);
        this.todos.unshift(this.inputTodo);
        localStorage.setItem("todos", JSON.stringify(this.todos));
        this.inputTodo = "";
      } else {
        alert("无法添加ToDo!");
      }
    },
  },
  mounted() {
    this.todos = JSON.parse(localStorage.getItem("todos") || []);
  },
};
</script>

<style scoped>
.add-todo {
  padding-right: 15px;
  padding-left: 35px;
}
</style>
