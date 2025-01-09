<script setup>
import { ref } from 'vue'
import { ApiView } from './components'
import axios from 'axios'
import { ElMessage } from 'element-plus'

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
  const startTime = Date.now()

  try {
    const config = {
      method: params.method,
      url: params.url,
      headers: params.headers_web,
      data: null
    }

    if (params.bodyType === 'form-data') {
      const formDataObj = new FormData()
      params.formData.forEach(item => {
        if (item.key && item.value) formDataObj.append(item.key, item.value)
      })
      config.data = formDataObj
    } else if (params.bodyType === 'json' && params.jsonBody) {
      try {
        config.data = JSON.parse(params.jsonBody)
      } catch (e) {
        ElMessage.error('JSON格式错误')
        loading.value = false
        return
      }
    }

    const res = await axios(config)
    response.value = {
      status: res.status,
      headers: res.headers,
      data: res.data,
      time: Date.now() - startTime
    }
  } catch (error) {
    response.value = {
      status: error.response?.status || 500,
      headers: error.response?.headers || {},
      data: error.response?.data || error.message,
      time: Date.now() - startTime
    }
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <ApiView ref="apiView" :send-request="sendRequest" :loading="loading" :response="response" />
</template>
<style>
/* @import url('@/assets/dark/element.css');*/
</style>
