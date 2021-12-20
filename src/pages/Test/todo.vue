<template>
  <div>
    <page-title
      :heading="heading"
      :subheading="subheading"
      :icon="icon"
      :breadcrumb-item="breadcrumbItem"
    ></page-title>

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
                    type="text"
                    name="text"
                    id="exampletext"
                    placeholder="Add Todo..."
                  />
                </div>
              </div>
              <div class="widget-content-right">
                <button type="button" tabindex="0" class="dropdown-item">
                  Add
                </button>
              </div>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="todo-indicator bg-success"></div>
          <div class="widget-content p-0">
            <div class="widget-content-wrapper">
              <div class="widget-content-left mr-2">
                <div class="custom-checkbox custom-control">
                  <input
                    type="checkbox"
                    id="exampleCustomCheckbox2"
                    class="custom-control-input"
                  /><label
                    class="custom-control-label"
                    for="exampleCustomCheckbox2"
                    >&nbsp;</label
                  >
                </div>
              </div>
              <div class="widget-content-left flex2">
                <div class="widget-heading">Development Task</div>
                <div class="widget-subheading">Finish Vue ToDo List App</div>
              </div>
              <div class="widget-content-right">
                <button class="border-0 btn-transition btn btn-outline-success">
                  <font-awesome-icon icon="check" />
                </button>
                <button class="border-0 btn-transition btn btn-outline-danger">
                  <font-awesome-icon icon="trash-alt" />
                </button>
              </div>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="todo-indicator bg-success"></div>
          <div class="widget-content p-0">
            <div class="widget-content-wrapper">
              <div class="widget-content-left mr-2">
                <div class="custom-checkbox custom-control">
                  <input
                    type="checkbox"
                    id="exampleCustomCheckbox3"
                    class="custom-control-input"
                  /><label
                    class="custom-control-label"
                    for="exampleCustomCheckbox3"
                    >&nbsp;</label
                  >
                </div>
              </div>
              <div class="widget-content-left flex2">
                <div class="widget-heading">Development Task</div>
                <div class="widget-subheading">Finish Vue ToDo List App</div>
              </div>
              <div class="widget-content-right">
                <button class="border-0 btn-transition btn btn-outline-success">
                  <font-awesome-icon icon="check" />
                </button>
                <button class="border-0 btn-transition btn btn-outline-danger">
                  <font-awesome-icon icon="trash-alt" />
                </button>
              </div>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="todo-indicator bg-success"></div>
          <div class="widget-content p-0">
            <div class="widget-content-wrapper">
              <div class="widget-content-left mr-2">
                <div class="custom-checkbox custom-control">
                  <input
                    type="checkbox"
                    id="exampleCustomCheckbox4"
                    class="custom-control-input"
                  /><label
                    class="custom-control-label"
                    for="exampleCustomCheckbox4"
                    >&nbsp;</label
                  >
                </div>
              </div>
              <div class="widget-content-left flex2">
                <div class="widget-heading">Development Task</div>
                <div class="widget-subheading">Finish Vue ToDo List App</div>
              </div>
              <div class="widget-content-right">
                <button class="border-0 btn-transition btn btn-outline-success">
                  <font-awesome-icon icon="check" />
                </button>
                <button class="border-0 btn-transition btn btn-outline-danger">
                  <font-awesome-icon icon="trash-alt" />
                </button>
              </div>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="todo-indicator bg-success"></div>
          <div class="widget-content p-0">
            <div class="widget-content-wrapper">
              <div class="widget-content-left mr-2">
                <div class="custom-checkbox custom-control">
                  <input
                    type="checkbox"
                    id="exampleCustomCheckbox5"
                    class="custom-control-input"
                  /><label
                    class="custom-control-label"
                    for="exampleCustomCheckbox5"
                    >&nbsp;</label
                  >
                </div>
              </div>
              <div class="widget-content-left flex2">
                <div class="widget-heading">Development Task</div>
                <div class="widget-subheading">Finish Vue ToDo List App</div>
              </div>
              <div class="widget-content-right">
                <button class="border-0 btn-transition btn btn-outline-success">
                  <font-awesome-icon icon="check" />
                </button>
                <button class="border-0 btn-transition btn btn-outline-danger">
                  <font-awesome-icon icon="trash-alt" />
                </button>
              </div>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="todo-indicator bg-success"></div>
          <div class="widget-content p-0">
            <div class="widget-content-wrapper">
              <div class="widget-content-left mr-2">
                <div class="custom-checkbox custom-control">
                  <input
                    type="checkbox"
                    id="exampleCustomCheckbox6"
                    class="custom-control-input"
                  /><label
                    class="custom-control-label"
                    for="exampleCustomCheckbox6"
                    >&nbsp;</label
                  >
                </div>
              </div>
              <div class="widget-content-left flex2">
                <div class="widget-heading">Development Task</div>
                <div class="widget-subheading">Finish Vue ToDo List App</div>
              </div>
              <div class="widget-content-right">
                <button class="border-0 btn-transition btn btn-outline-success">
                  <font-awesome-icon icon="check" />
                </button>
                <button class="border-0 btn-transition btn btn-outline-danger">
                  <font-awesome-icon icon="trash-alt" />
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <div class="d-block text-right card-footer">
        <button class="mr-2 btn btn-link btn-sm">Cancel</button>
        <button class="btn btn-success btn-lg">Save</button>
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
    heading: "List Groups",
    subheading:
      "These can be used with other components and elements to create stunning and unique new elements for your UIs.",
    icon: "pe-7s-paint icon-gradient bg-sunny-morning",
  }),
};
</script>

<style scoped>
.add-todo {
  padding-right: 15px;
  padding-left: 35px;
}
</style>
