<template>
  <div class="title-bar h-[40px] bg-[#252525] flex items-center justify-between px-4">
    <div class="text-sm">{{ title }}</div>
    <div class="window-controls flex items-center space-x-4">
      <el-icon class="cursor-pointer" @click="handleHelp">
        <QuestionFilled />
      </el-icon>
      <el-icon class="cursor-pointer" @click="handleMinimize">
        <Minus />
      </el-icon>
      <el-icon class="cursor-pointer" @click="handleMaximize">
        <FullScreen />
      </el-icon>
      <el-icon class="cursor-pointer text-red-500" @click="handleClose">
        <Close />
      </el-icon>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  QuestionFilled,
  Minus,
  FullScreen,
  Close
} from '@element-plus/icons-vue'

const route = useRoute()

const title = computed(() => {
  return route.meta.title || 'Tauri + Vue3 应用'
})

// 窗口控制函数
const handleHelp = () => {
  // 实现帮助功能
}

const handleMinimize = () => {
  // 实现最小化功能
}

const handleMaximize = () => {
  // 实现最大化功能
}

const handleClose = () => {
  // 实现关闭功能
}
</script> 