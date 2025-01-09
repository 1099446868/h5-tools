<template>
  <div
    class="title-bar h-[40px] bg-[#303030] flex items-center justify-between px-4"
    data-tauri-drag-region
  >
    <div class="text-sm">{{ title }}</div>
    <div class="window-controls flex items-center space-x-4">
      <el-button
        class="theme-toggle"
        :icon="isDark ? 'Sunny' : 'Moon'"
        circle
        @click="toggleDark()"
      />
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
import { Window } from '@tauri-apps/api/window'
import { message, confirm } from '@tauri-apps/plugin-dialog'
import { getName, getVersion, getTauriVersion } from '@tauri-apps/api/app'
import { listen } from '@tauri-apps/api/event'
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { QuestionFilled, Minus, FullScreen, Close, Sunny, Moon } from '@element-plus/icons-vue'
import { useTheme } from '@/utils/theme'
import { useToggle } from '@vueuse/core'

const { isDark, toggleDark } = useTheme()
// toggleDark()
useToggle()

// 监听主题变化，动态加载 Element Plus 的主题样式
watch(
  isDark,
  dark => {
    // 修改 Element Plus 的主题变量
    console.log(dark)
    if (dark) {
      document.documentElement.setAttribute('class', 'dark')
    } else {
      document.documentElement.removeAttribute('class')
    }
  },
  { immediate: true }
)

const appWindow = new Window('main')

const route = useRoute()

const title = computed(() => {
  return route.meta.title || 'Tauri + Vue3 应用'
})

const isMaximized = ref(false)

//监视窗体最大化和还原状态，修改对应图标
listen('tauri://resize', async () => {
  isMaximized.value = await appWindow.isMaximized()
})

// 窗口控制函数
const handleHelp = async () => {
  // 实现帮助功能
  const aboutMessage =
    `名称：${await getName()}              \r\n` +
    `版本：${await getVersion()}              \r\n` +
    `内核：${await getTauriVersion()}         \r\n`
  await message(aboutMessage)
}

const handleMinimize = async () => {
  // 实现最小化功能
  await appWindow.minimize()
}

const handleMaximize = async () => {
  // 实现最大化功能
  await appWindow.toggleMaximize()
}

const handleClose = async () => {
  // 实现关闭功能
  await confirm('确定要退出嘛？', { title: 'Tauri', kind: 'warning' }).then(res => {
    if (res) {
      appWindow.close()
    }
  })
}

onMounted(async () => {
  isMaximized.value = await appWindow.isMaximized()
})
</script>
