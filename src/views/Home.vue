<template>
  <div>
    <Header @change-Show-Todos="changeShowTodos" />
    <hr />
    <div class="todo-list">
      <TodoItem v-for="todo in ShowTodos" :key="todo.is" v-bind="todo" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TodoItem from '../components/TodoItem.vue'
import Header from '../components/Header.vue'
import $axios from '../plugins/axios'
// 我们通过 vue-property-decorator 导入了 vue 以及 Component
// vue-property-decorator 可以去 typescript 查
// vue-property-decorator 是一个vue 类组装饰器 快速方便的使用类组件内的属性方法
export interface SearchObj {
  title: string;
  type: string;
}
export interface TodoItemObj {
  id: string;
  title: string;
  content: string;
  type: string;
}

@Component({
  components: {
    TodoItem,
    Header
  }
})
export default class Home extends Vue {
  // 将 todos 定义成具体对象的数据，这个对象需要定义接口
  todos: Array<TodoItemObj> = []
  ShowTodos: Array<TodoItemObj> = []
  async created () {
    const res = await $axios.get('/todos')
    this.todos = res.data
    this.ShowTodos = res.data
  }

  changeShowTodos ({ title, type }: SearchObj) {
    // 修改 ShowTodos 不再原来的 ShowTodos 基础上操作
    // this.ShowTodos
    // console.log(Obj)
    if (!title && !type) {
      this.ShowTodos = this.todos
    } else {
      this.ShowTodos = this.todos.filter(
        (item) => item.title.includes(title) && item.type === type
      )
    }
  }
}
</script>

<style lan="ts">
.todo-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
</style>
