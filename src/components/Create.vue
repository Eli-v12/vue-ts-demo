<template>
  <div class="Content-warp">
    <div class="Content">
      <div class="Content-header">
        <h2 class="Content-title">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </h2>
        <el-button @click="save" size="mini" type="primary" plain>保存</el-button>
      </div>
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="textarea"
      >
      </el-input>
      <div class="Content-type">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import $axios from '../plugins/axios'
@Component
export default class Create extends Vue {
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

  async save () {
    const res = await $axios.post('/todos', { content: this.textarea, type: this.value, title: this.input })
    console.log(res.data)
    this.textarea = ''
    this.value = ''
    this.input = ''
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
</style>
