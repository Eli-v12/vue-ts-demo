<template>
  <div>
    <div>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </div>
    <div>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button @click="search({title:input, type:value})" type="primary">搜索</el-button>
      <el-button type="primary">添加</el-button>
      <!-- <router-link class="create" to="/create">
        <el-button type="primary" icon="el-icon-edit">创建</el-button>
      </router-link> -->
        <el-button @click="$router.push('/content/create')" type="primary" icon="el-icon-edit">创建</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator'
import { SearchObj } from '../views/Home.vue'

@Component
export default class Header extends Vue {
  input = ''
  value = ''
  options = [
    {
      value: 'study'
    },
    {
      value: 'life'
    }
  ]

  @Emit('change-Show-Todos')
  handle (Obj: SearchObj) {
    return Obj
  }

  search ({ title, type }: SearchObj) {
    this.handle({ title, type })
  }
}
</script>

<style lan="ts">
.create{
  margin-left: 50px;
}
</style>
