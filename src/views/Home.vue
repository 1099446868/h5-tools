<template>
  <div class="home p-6">
    <!-- 欢迎横幅 -->
    <div class="welcome-banner relative h-[200px] rounded-lg overflow-hidden mb-6">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80"></div>
      <div class="relative z-10 h-full flex-col flex-center p-6 text-center">
        <h1 class="text-3xl font-bold mb-2">Tauri + Vue3 应用</h1>
        <p class="text-gray-200 max-w-2xl">让AI与你一同创作，让应用随心所欲！</p>
      </div>
    </div>

    <!-- 功能卡片区 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <el-card
        v-for="(card, index) in functionCards"
        :key="index"
        class="border-none transition-colors cursor-pointer"
        shadow="never"
      >
        <template #header>
          <div class="flex items-center space-x-2">
            <el-icon class="text-xl"><component :is="card.icon" /></el-icon>
            <span>{{ card.title }}</span>
          </div>
        </template>
        <p class="text-gray-400">{{ card.description }}</p>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Document, Setting, Connection, ChatDotSquare } from '@element-plus/icons-vue'

const functionCards = ref([
  {
    icon: 'Document',
    title: '文件夹',
    description: '管理您的本地文件和项目'
  },
  {
    icon: 'Setting',
    title: '自定义节点',
    description: '创建和管理自定义节点'
  },
  {
    icon: 'Connection',
    title: '输入输出',
    description: '处理输入输出数据流'
  },
  {
    icon: 'ChatDotSquare',
    title: '交流群',
    description: '加入社区交流讨论'
  },
  {
    icon: 'ChatDotSquare',
    title: '交流群',
    description: '加入社区交流讨论'
  },
  {
    icon: 'ChatDotSquare',
    title: '交流群',
    description: '加入社区交流讨论'
  },
  {
    icon: 'ChatDotSquare',
    title: '交流群',
    description: '加入社区交流讨论'
  },
  {
    icon: 'ChatDotSquare',
    title: '交流群',
    description: '加入社区交流讨论'
  },
  {
    icon: 'ChatDotSquare',
    title: '交流群',
    description: '加入社区交流讨论'
  },
  {
    icon: 'ChatDotSquare',
    title: '交流群',
    description: '加入社区交流讨论'
  },
  {
    icon: 'ChatDotSquare',
    title: '交流群',
    description: '加入社区交流讨论'
  },
  {
    icon: 'ChatDotSquare',
    title: '交流群',
    description: '加入社区交流讨论'
  },
  {
    icon: 'ChatDotSquare',
    title: '交流群',
    description: '加入社区交流讨论'
  },
  {
    icon: 'ChatDotSquare',
    title: '交流群',
    description: '加入社区交流讨论'
  },
  {
    icon: 'ChatDotSquare',
    title: '交流群',
    description: '加入社区交流讨论'
  },
  {
    icon: 'ChatDotSquare',
    title: '交流群',
    description: '加入社区交流讨论'
  },
  {
    icon: 'ChatDotSquare',
    title: '交流群',
    description: '加入社区交流讨论'
  }
])
</script>

<style scoped>
.welcome-banner {
  background-image: url('@/assets/banner-bg.jpg');
  background-size: cover;
  background-position: center;
}
</style>
