<template>
  <div class="p-6">
    <el-card class="mb-4 !border-none">
      <template #header>
        <div class="flex-between !border-b">
          <span class="text-lg font-bold">时间转换工具</span>
        </div>
      </template>

      <!-- 时间戳转日期时间 -->
      <div class="mb-6">
        <h3 class="text-base mb-4">时间戳转日期时间</h3>
        <div class="flex items-center gap-4">
          <el-input
            v-model="timestamp"
            placeholder="请输入时间戳"
            class="!w-64 custom-input"
            @input="handleTimestampInput"
          >
            <template #append>
              <el-button @click="getCurrentTimestamp" class="!border-none"> 当前时间戳 </el-button>
            </template>
          </el-input>
          <el-input
            v-model="dateTimeStr"
            placeholder="转换后的日期时间"
            class="!w-64 custom-input"
            readonly
          />
          <el-button @click="copyTime(dateTimeStr)"> <Icon icon="ep:copy-document" /> </el-button>
        </div>
      </div>

      <!-- 日期时间转时间戳 -->
      <div>
        <h3 class="text-base mb-4">日期时间转时间戳</h3>
        <div class="flex items-center gap-4">
          <el-date-picker
            v-model="dateTime"
            type="datetime"
            placeholder="选择日期时间"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="x"
            @change="handleDateTimeChange"
            class="custom-date-picker !w-64"
          />
          <el-input
            v-model="convertedTimestamp"
            placeholder="转换后的时间戳"
            class="!w-64 custom-input"
            readonly
          />
          <el-button @click="copyTime(convertedTimestamp)">
            <Icon icon="ep:copy-document" />
          </el-button>
        </div>
      </div>
    </el-card>

    <!-- 常用时间格式 -->
    <el-card class="!border-none">
      <template #header>
        <div class="flex-between !border-b">
          <span class="text-lg font-bold">当前时间的常用格式</span>
          <el-button @click="updateCurrentTime" class="!border-none"> 刷新 </el-button>
        </div>
      </template>
      <div class="grid grid-cols-2 gap-4">
        <div v-for="(time, format) in commonTimeFormats" :key="format" class="flex-between">
          <span>{{ format }}:</span>
          <span>{{ time }}</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import dayjs from 'dayjs'
import { Icon } from '@/components/Icon'
import { writeText } from '@tauri-apps/plugin-clipboard-manager'
import { ElMessage } from 'element-plus'
import { isTauriApp } from '@/utils/environment'

// 时间戳转日期时间
const timestamp = ref('')
const dateTimeStr = ref('')

// 日期时间转时间戳
const dateTime = ref('')
const convertedTimestamp = ref('')

// 常用时间格式
const commonTimeFormats = ref({})

// 定时器
let timer = null

// 获取当前时间戳
const getCurrentTimestamp = () => {
  timestamp.value = Date.now().toString()
  handleTimestampInput()
}

// 处理时间戳输入
const handleTimestampInput = () => {
  if (!timestamp.value) {
    dateTimeStr.value = ''
    return
  }
  try {
    const date = dayjs(Number(timestamp.value))
    if (date.isValid()) {
      dateTimeStr.value = date.format('YYYY-MM-DD HH:mm:ss')
    } else {
      dateTimeStr.value = '无效的时间戳'
    }
  } catch (error) {
    dateTimeStr.value = '无效的时间戳'
  }
}

// 处理日期时间选择
const handleDateTimeChange = () => {
  if (!dateTime.value) {
    convertedTimestamp.value = ''
    return
  }
  convertedTimestamp.value = dateTime.value
}

// 更新当前时间的常用格式
const updateCurrentTime = () => {
  const now = dayjs()
  commonTimeFormats.value = {
    'YYYY-MM-DD HH:mm:ss': now.format('YYYY-MM-DD HH:mm:ss'),
    'YYYY年MM月DD日 HH:mm:ss': now.format('YYYY年MM月DD日 HH:mm:ss'),
    'MM/DD/YYYY HH:mm:ss': now.format('MM/DD/YYYY HH:mm:ss'),
    'Unix时间戳(秒)': Math.floor(now.valueOf() / 1000),
    '时间戳(毫秒)': now.valueOf(),
    'ISO 8601': now.toISOString()
  }
}

// 组件挂载时启动定时器
onMounted(() => {
  updateCurrentTime()
  timer = setInterval(updateCurrentTime, 1000)
})

// 组件卸载时清除定时器
onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})

const copyTime = async dateTimeStr => {
  if (isTauriApp()) {
    await writeText(dateTimeStr)
  } else {
    navigator.clipboard.writeText(dateTimeStr)
  }
  ElMessage.info('已复制')
}
</script>

<style>
/* 自定义输入框样式 */
</style>
