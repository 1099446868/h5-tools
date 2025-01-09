<template>
  <div class="left-sidebar w-[60px] fixed left-0 top-0 h-full bg-[#303030] flex flex-col">
    <div class="menu-items space-y-2 py-4">
      <div
        v-for="(item, index) in menuItems"
        :key="index"
        class="menu-item h-[50px] flex-center cursor-pointer hover:bg-[#333]"
        @click="handleMenuClick(item.route)"
      >
        <el-icon class="text-xl"><component :is="item.icon" /></el-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { HomeFilled, Setting, Tools, Timer, Connection } from '@element-plus/icons-vue'
import { isTauriApp } from '@/utils/environment'

const router = useRouter()

const menuItems = ref([
  { icon: 'HomeFilled', route: '/' },
  { icon: 'Tools', route: '/test' },
  { icon: 'Timer', route: '/time', title: '时间转换' },
  { icon: 'Document-copy', route: '/json-view', title: 'json视图' },
  { icon: 'Dessert', route: '/icon-picker', title: '图标选择器' },
  { icon: 'Setting', route: '/settings' }
])

if (isTauriApp()) {
  menuItems.value.push({ icon: 'Connection', route: '/api-test-desktop', title: 'API测试-桌面' })
} else {
  menuItems.value.push({ icon: 'Connection', route: '/api-test', title: 'API测试' })
}

const handleMenuClick = route => {
  router.push(route)
}
</script>
