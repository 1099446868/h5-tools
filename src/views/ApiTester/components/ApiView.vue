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
      <el-input
        v-model="url"
        @input="updateParams"
        placeholder="请输入请求URL"
        class="flex-1 custom-input"
      />
      <el-button type="primary" @click="sendRequest" :loading="loading"> 发送请求 </el-button>
    </div>

    <!-- 请求参数配置 -->
    <el-tabs type="border-card" class="custom-tabs">
      <!-- Params -->
      <el-tab-pane label="Params">
        <div class="params-editor">
          <div v-for="(param, index) in params" :key="index" class="mb-2 flex gap-2">
            <el-input
              v-model="param.key"
              @input="updateUrl"
              placeholder="Key"
              class="custom-input"
            />
            <el-input
              v-model="param.value"
              @input="updateUrl"
              placeholder="Value"
              class="custom-input"
            />
            <el-button @click="removeParam(index)"> 删除 </el-button>
          </div>
          <el-button @click="addParam" class="mt-2"> 添加 </el-button>
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
              <el-button @click="removeFormData(index)"> 删除 </el-button>
            </div>
            <el-button @click="addFormData" class="mt-2"> 添加 </el-button>
          </div>

          <!-- Raw JSON -->
          <div v-if="bodyType === 'json'" class="json-editor">
            <el-input
              v-model="jsonBody"
              type="textarea"
              :rows="6"
              placeholder="请输入JSON数据"
              class="custom-textarea"
              @blur="checkJson"
            />
          </div>
        </div>
      </el-tab-pane>
      <!-- Headers -->
      <el-tab-pane label="Headers">
        <div class="params-editor">
          <div v-for="(header, index) in headers" :key="index" class="mb-2 flex gap-2">
            <el-input v-model="header.key" placeholder="Key" class="custom-input" />
            <el-input v-model="header.value" placeholder="Value" class="custom-input" />
            <el-button @click="removeHeader(index)"> 删除 </el-button>
          </div>
          <el-button @click="addHeader" class="mt-2"> 添加 </el-button>
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
        <pre v-if="isString(formattedResponse)" class="response-body">{{ formattedResponse }}</pre>
        <JsonView
          v-else
          :data="formattedResponse"
          :theme="theme"
          :deep="deep"
          :iconStyle="iconStyle"
          :fontSize="fontSize"
          :lineHeight="lineHeight"
          :closed="closed"
          :iconColor="iconColor"
        />
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
import { ref, computed, defineProps } from 'vue'
import { ElMessage } from 'element-plus'
import JsonView from '@/components/jsonView/index.vue'
import { isString } from '@/utils/is'
import { useTheme } from '@/utils/theme'

const props = defineProps({
  sendRequest: Function,
  loading: Boolean,
  response: Object
})

const { isDark } = useTheme()

const theme = computed(() => {
  return isDark.value ? 'one-dark' : ''
})
const closed = ref(false)
const deep = ref(3)
const iconStyle = ref('triangle')
const color1 = ref('#818181')
const color2 = ref('#818181')
const fontSize = ref(14)
const lineHeight = ref(24)

const iconColor = computed(() => {
  if (color1.value && color2.value) {
    return [color1.value, color2.value]
  } else {
    return []
  }
})

// 请求方法
const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
const method = ref('GET')
const url = ref('')
// const loading = ref(false)

// Headers
const headers = ref([{ key: '', value: '' }])
const params = ref([{ key: '', value: '' }])
const updateParams = () => {
  let searchStr = new URL(url.value).search
  let searchParams = new URLSearchParams(searchStr)
  params.value = Array.from(searchParams.entries()).map(([key, value]) => ({ key, value }))
}

const updateUrl = () => {
  let searchUrl = new URL(url.value).origin + new URL(url.value).pathname
  let searchParams = new URLSearchParams()
  params.value.forEach(({ key, value }) => {
    searchParams.set(key, value)
  })
  searchUrl += '?' + searchParams.toString()
  url.value = searchUrl
}
const addHeader = () => headers.value.push({ key: '', value: '' })
const removeHeader = index => headers.value.splice(index, 1)
const addParam = () => params.value.push({ key: '', value: '' })
const removeParam = index => {
  params.value.splice(index, 1)
  updateUrl()
}

// Body
const bodyType = ref('none')
const formData = ref([{ key: '', value: '' }])
const jsonBody = ref('')
const addFormData = () => formData.value.push({ key: '', value: '' })
const removeFormData = index => formData.value.splice(index, 1)

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
  const res = props.response
  if (!res) return ''
  const status = res.status
  if (status >= 200 && status < 300) return 'text-green-500'
  if (status >= 300 && status < 400) return 'text-blue-500'
  if (status >= 400 && status < 500) return 'text-yellow-500'
  return 'text-red-500'
})

// 格式化响应数据
const formattedResponse = computed(() => {
  const res = props.response
  if (!res) return ''
  try {
    return isString(res.data) ? JSON.parse(res.data) : res.data
  } catch {
    return res.data
  }
})

const checkJson = () => {
  try {
    JSON.parse(jsonBody.value)
  } catch (e) {
    ElMessage.error('JSON格式错误')
  }
}

const configs = computed(() => {
  return {
    method: method.value.toLowerCase(),
    url: url.value,
    headers_web: headers.value.reduce((acc, curr) => {
      if (curr.key && curr.value) acc[curr.key] = curr.value
      return acc
    }, {}),
    headers_desktop: headers.value.filter(h => h.key && h.value),
    bodyType: bodyType.value,
    body: null,
    formData: formData.value,
    jsonBody: jsonBody.value
  }
})

defineExpose({
  configs
})
</script>

<style></style>
