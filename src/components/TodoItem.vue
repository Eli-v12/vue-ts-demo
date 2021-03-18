<template>
  <div class="todo-item">
    <router-link class="todo-title" tag="span" :to="`/content/${id}`"><el-button type="primary" size="mini">{{ title }}</el-button></router-link>
    <div class="todo-content">{{ content }}</div>
    <div class="item-type"><el-tag>{{ type }}</el-tag></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class TodoItem extends Vue {
  @Prop(String)
  id!: string

  @Prop(String)
  title!: string

  @Prop(String)
  content!: string

  @Prop(String)
  type!: string
}
</script>

<style lan="ts">
.todo-item{
  width: 22%;
  height: 170px;
  border-radius: 6px;
  margin: 10px;
  padding: 15px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  /* background-image: url("../assets/1.jpg"); */
}
.todo-title{
  cursor: pointer;
  color: #444;
}
.todo-content{
  height: 70px;
  margin:10px 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
   white-space: pre-wrap;
}
/* .item-type{
  color:rgb(238, 10, 116)
} */
</style>
