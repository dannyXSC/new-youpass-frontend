<template>
  <div>
    <my-draggable-table :fields="fields" v-model:value="list"/>
    <button @click="test">click me</button>
    {{list}}
  </div>
</template>

<script>
import MyDraggableTable from "@/components/myDraggableTable";

export default {
  name: "transition-example-2",
  components: {MyDraggableTable},
  data() {
    return {
      list: [
        {
          id: 1,
          name: "张三",
          age: 18,
        },
        {
          id: 2,
          name: "张二",
          age: 32,
        }
      ],
      fields: [
        {
          key: "id",
          value: "ID"
        },
        {
          key: "name",
          value: "姓名"
        },
        {
          key: "age",
          value: "年龄"
        }
      ]
    }
  },
  methods: {
    test() {
      if (!this.id) this.id =10
      console.log(this.list)
      this.list = [{
        id: this.id,
        name: "张三",
        age: 18,
      }]
      console.log(this.list)
    }
  }
};
</script>

<style scoped>
.button {
  margin-top: 35px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
</style>