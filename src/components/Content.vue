<template>
  <div class="Content-warp">
    <div class="Content" v-if="Todos || $route.name === 'create'">
      <div class="Content-header">
        <div class="Content-title">
          <el-button @click="$router.back()" size="mini" type="primary" plain>返回</el-button>
        </div>
        <div v-if="isEdit && $route.name !== 'create'" class="edit">
          <el-button @click="edit" size="mini" type="primary" plain>编辑</el-button>
          <router-link  to="/content/create"><el-button size="mini" type="primary">创建</el-button></router-link>
        </div>
        <div v-else-if="$route.name !== 'create'">
          <el-button type="danger" size="mini" @click="open">删除</el-button>
          <el-button @click="edit" size="mini" type="warning">取消</el-button>
          <el-button @click="DemoAxios" size="mini" type="success">保存</el-button>
        </div>
        <template v-else>
          <el-button @click="save" size="mini" type="success">保存</el-button>
        </template>
      </div>
      <template v-if="isEdit && $route.name !== 'create'">
        <div class="Content-content">
          <h2>{{ Todos.title }}</h2>
          <p>{{ Todos.content }}</p>
        </div>
        <div class="Content-type">
          <el-tag type="danger">{{ Todos.type }}</el-tag>
        </div>
      </template>
      <template v-if="!isEdit || $route.name === 'create'">
          <div class="Content-content"><el-input placeholder="请输入内容" class="content-one" v-model="input"></el-input>
          <el-input class="content-two" type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea"> </el-input>
        </div>
        <div class="Content-type">
          <el-select v-model="value">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              placeholder="请选择"
            >
            </el-option>
          </el-select>
        </div>
      </template>
    </div>
    <div></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import $axios from '../plugins/axios'
import VueRouter, { Route } from 'vue-router'
import { TodoItemObj } from '../views/Home.vue'

@Component
export default class extends Vue {
  Todos: TodoItemObj | null = null
  $route!: Route
  $router!: VueRouter
  isEdit = true
  input = ''
  textarea = ''
  value = ''
  options = [
    {
      value: 'study'
    },
    {
      value: 'life'
    }
  ]

  created () {
    this.getTodos()
    console.log(this.$route)
    console.log(!this.isEdit || this.$route.name === 'create')
  }

  edit () {
    this.isEdit = !this.isEdit
    if (this.Todos !== null) {
      this.input = this.Todos.title
      this.textarea = this.Todos.content
      this.value = this.Todos.type
    }
  }

  async getTodos () {
    const ID = this.$route.params.id
    if (ID) {
      const res = await $axios.get(`/todos/${ID}`)
      this.Todos = res.data
    } else {
      this.isEdit = false
      console.log(1234)
    }
  }

  async DemoAxios () {
    this.isEdit = !this.isEdit
    const ID = this.$route.params.id
    const res = await $axios.patch(`/todos/${ID}`, {
      content: this.textarea,
      type: this.value,
      title: this.input
    })
    this.Todos = res.data
  }

  async open () {
    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!正在跳转首页'
        })
        this.$router.push('/')
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    const ID = this.$route.params.id
    await $axios.delete(`/todos/${ID}`)
  }

  async save () {
    const res = await $axios.post('/todos', { content: this.textarea, type: this.value, title: this.input })
    console.log(res.data)
    this.textarea = ''
    this.value = ''
    this.input = ''
    this.$message({
      type: 'success',
      message: '创建成功，正在跳转首页'
    })
    this.$router.push('/')
  }
}
</script>
<style lan="ts">
.Content-warp {
  width: 90%;
  margin: 50px auto;
  padding: 30px;
  border-radius: 20px;
  background-color: #fff;
  color: #778087;
}
.Content-header {
  display: flex;
  justify-content: space-between;
}
.Content-content>h2,.content-one{
  margin-top:20px;
}
.Content-content>p,.content-two{
  margin-top: 30px;
  line-height: 34px;
  text-indent: 2em;
}
.Content-type {
  margin-top: 30px;
}

</style>
