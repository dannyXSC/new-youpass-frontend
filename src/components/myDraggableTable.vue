<template>
  <div>
    <table class="table table-striped">
      <thead class="table-primary">
      <tr>
        <th scope="col" v-for="item in fields">{{item.value}}</th>
      </tr>
      </thead>
      <transition-group
          is="draggable"
          tag="tbody"
          v-model="list"
          :name="!drag ? 'flip-list' : null"
          @start="drag = true"
          @end="drag = false"
          animation="200"
      >
        <tr v-for="item in list" :key="item.id">
          <td v-for="fieldItem in fields"> {{item[fieldItem.key]}}</td>
        </tr>
      </transition-group>
    </table>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: "myDraggableTable",
  components: {
    draggable
  },
  props: {
    value: Array,
    fields:Array,
  },
  data() {
    return {
      list: this.value,
      drag: false
    };
  },
  methods:{
    handleInput() {
      this.$emit('input', this.list)
    },
  },
  watch:{
    list: {
      handler() {
        this.handleInput()
      },
      deep: true
    },
    value:{
      handler() {
        this.list = this.value
      },
      deep: true
    }
  }
}
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