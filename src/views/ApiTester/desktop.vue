<script setup>
import { ref } from 'vue'
import { ApiView } from './components'
import { ElMessage } from 'element-plus'
import { invoke } from '@tauri-apps/api/core'

const apiView = ref(null)
const loading = ref(false)
const response = ref(null)

// 发送请求
const sendRequest = async () => {
  const params = apiView.value.configs
  if (!params.url) {
    ElMessage.error('请输入请求URL')
    return
  }

  loading.value = true

  try {
    // 构建请求配置
    const config = {
      method: params.method,
      url: params.url,
      headers: params.headers_desktop,
      body_type: params.bodyType,
      body: null
    }

    // 处理请求体
    if (params.bodyType === 'form-data') {
      const formDataObj = {}
      params.formData.forEach(item => {
        if (item.key && item.value) {
          formDataObj[item.key] = item.value
        }
      })
      config.body = JSON.stringify(formDataObj)
    } else if (params.bodyType === 'json' && params.jsonBody) {
      try {
        // 验证JSON格式
        JSON.parse(jsonBody.value)
        config.body = jsonBody.value
      } catch (e) {
        ElMessage.error('JSON格式错误')
        loading.value = false
        return
      }
    }

    // 调用Rust函数发送请求
    const res = await invoke('send_request', { config })
    response.value = {
      status: res.status,
      headers: res.headers.reduce((acc, curr) => {
        acc[curr.key] = curr.value
        return acc
      }, {}),
      data: res.data,
      time: res.time
    }
  } catch (error) {
    ElMessage.error(error.toString())
    response.value = {
      status: 500,
      headers: {},
      data: error.toString(),
      time: 0
    }
  } finally {
    loading.value = false
  }
}

// 尝试解析JSON
const tryParseJson = str => {
  try {
    return JSON.parse(str)
  } catch {
    return str
  }
}
</script>
<template>
  <ApiView ref="apiView" :send-request="sendRequest" :loading="loading" :response="response" />
</template>
<style>
/* @import url('@/assets/dark/element.css');*/
</style>
