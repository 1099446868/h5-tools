<template>
  <div class="p-6 flex flex-col gap-4">
    <!-- 请求区域 -->
    <div class="flex items-center gap-4">
      <el-select v-model="method" class="!w-24 custom-select" :class="methodColorClass">
        <el-option
          v-for="item in methods"
          :key="item"
          :label="item"
          :value="item"
          :class="getMethodClass(item)"
        />
      </el-select>
      <el-input v-model="url" placeholder="请输入请求URL" class="flex-1 custom-input" />
      <el-button
        type="primary"
        @click="sendRequest"
        :loading="loading"
        class="!bg-[#409eff] !border-none hover:!bg-[#66b1ff]"
      >
        发送请求
      </el-button>
    </div>

    <!-- 请求参数配置 -->
    <el-tabs type="border-card" class="custom-tabs">
      <!-- Headers -->
      <el-tab-pane label="Headers">
        <div class="params-editor">
          <div v-for="(header, index) in headers" :key="index" class="mb-2 flex gap-2">
            <el-input v-model="header.key" placeholder="Key" class="custom-input" />
            <el-input v-model="header.value" placeholder="Value" class="custom-input" />
            <el-button
              @click="removeHeader(index)"
              class="!bg-[#2e2e2e] !text-gray-300 !border-[#333] hover:!bg-[#1d1d1d]"
            >
              删除
            </el-button>
          </div>
          <el-button
            @click="addHeader"
            class="mt-2 !bg-[#2e2e2e] !text-gray-300 !border-[#333] hover:!bg-[#1d1d1d]"
          >
            添加Header
          </el-button>
        </div>
      </el-tab-pane>

      <!-- Body -->
      <el-tab-pane label="Body">
        <div class="body-editor">
          <el-radio-group v-model="bodyType" class="mb-4">
            <el-radio-button label="none">none</el-radio-button>
            <el-radio-button label="form-data">form-data</el-radio-button>
            <el-radio-button label="json">raw JSON</el-radio-button>
          </el-radio-group>

          <!-- Form Data -->
          <div v-if="bodyType === 'form-data'" class="params-editor">
            <div v-for="(param, index) in formData" :key="index" class="mb-2 flex gap-2">
              <el-input v-model="param.key" placeholder="Key" class="custom-input" />
              <el-input v-model="param.value" placeholder="Value" class="custom-input" />
              <el-button
                @click="removeFormData(index)"
                class="!bg-[#2e2e2e] !text-gray-300 !border-[#333] hover:!bg-[#1d1d1d]"
              >
                删除
              </el-button>
            </div>
            <el-button
              @click="addFormData"
              class="mt-2 !bg-[#2e2e2e] !text-gray-300 !border-[#333] hover:!bg-[#1d1d1d]"
            >
              添加参数
            </el-button>
          </div>

          <!-- Raw JSON -->
          <div v-if="bodyType === 'json'" class="json-editor">
            <el-input
              v-model="jsonBody"
              type="textarea"
              :rows="6"
              placeholder="请输入JSON数据"
              class="custom-textarea"
            />
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 响应结果 -->
    <el-tabs v-if="response" type="border-card" class="custom-tabs">
      <el-tab-pane label="Response">
        <div class="response-info mb-2 flex items-center gap-4">
          <span :class="responseStatusClass">状态码: {{ response.status }}</span>
          <span class="text-gray-400">耗时: {{ response.time }}ms</span>
        </div>
        <pre class="response-body">{{ formattedResponse }}</pre>
      </el-tab-pane>
      <el-tab-pane label="Headers">
        <div class="response-headers">
          <div v-for="(value, key) in response.headers" :key="key" class="mb-2">
            <span class="text-gray-400">{{ key }}:</span>
            <span class="text-gray-200 ml-2">{{ value }}</span>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 请求方法
const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
const method = ref('GET')
const url = ref('')
const loading = ref(false)

// Headers
const headers = ref([{ key: '', value: '' }])
const addHeader = () => headers.value.push({ key: '', value: '' })
const removeHeader = index => headers.value.splice(index, 1)

// Body
const bodyType = ref('none')
const formData = ref([{ key: '', value: '' }])
const jsonBody = ref('')
const addFormData = () => formData.value.push({ key: '', value: '' })
const removeFormData = index => formData.value.splice(index, 1)

// Response
const response = ref(null)

// 方法颜色类
const methodColorClass = computed(() => {
  const colors = {
    GET: 'text-green-500',
    POST: 'text-blue-500',
    PUT: 'text-yellow-500',
    DELETE: 'text-red-500',
    PATCH: 'text-purple-500'
  }
  return colors[method.value]
})

const getMethodClass = methodName => {
  const colors = {
    GET: 'text-green-500',
    POST: 'text-blue-500',
    PUT: 'text-yellow-500',
    DELETE: 'text-red-500',
    PATCH: 'text-purple-500'
  }
  return colors[methodName]
}

// 响应状态码样式
const responseStatusClass = computed(() => {
  if (!response.value) return ''
  const status = response.value.status
  if (status >= 200 && status < 300) return 'text-green-500'
  if (status >= 300 && status < 400) return 'text-blue-500'
  if (status >= 400 && status < 500) return 'text-yellow-500'
  return 'text-red-500'
})

// 格式化响应数据
const formattedResponse = computed(() => {
  if (!response.value) return ''
  try {
    return JSON.stringify(response.value.data, null, 2)
  } catch {
    return response.value.data
  }
})

// 发送请求
const sendRequest = async () => {
  if (!url.value) {
    ElMessage.error('请输入请求URL')
    return
  }

  loading.value = true
  const startTime = Date.now()

  try {
    const config = {
      method: method.value.toLowerCase(),
      url: url.value,
      headers: headers.value.reduce((acc, curr) => {
        if (curr.key && curr.value) acc[curr.key] = curr.value
        return acc
      }, {})
    }

    if (bodyType.value === 'form-data') {
      const formDataObj = new FormData()
      formData.value.forEach(item => {
        if (item.key && item.value) formDataObj.append(item.key, item.value)
      })
      config.data = formDataObj
    } else if (bodyType.value === 'json' && jsonBody.value) {
      try {
        config.data = JSON.parse(jsonBody.value)
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

<style>
/* @import url('@/assets/dark/element.css');*/
</style>
