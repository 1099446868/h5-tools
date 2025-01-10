<template>
  <div
    class="left-sidebar w-[60px] fixed left-0 top-0 h-full flex flex-col bg-[--el-color-info-light-9]"
  >
    <!--- bg-[#303030] --->
    <div class="menu-items space-y-2 py-4">
      <div
        v-for="(item, index) in menuItems"
        :key="index"
        :class="`menu-item h-[50px] flex-center cursor-pointer ${hover}`"
        @click="handleMenuClick(item.route)"
      >
        <!-- <el-icon class="text-xl"><component :is="item.icon" /></el-icon> -->
        <Icon :icon="item.icon" class="text-xl" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { isTauriApp } from '@/utils/environment'
import { useTheme } from '@/utils/theme'
import { Icon } from '@/components/Icon'
const { isDark } = useTheme()

const hover = computed(() => {
  return isDark.value ? 'hover:bg-[#333]' : 'hover:bg-[--el-color-info-light-7]'
})

const router = useRouter()

const menuItems = ref([
  { icon: 'ep:home-filled', route: '/' },
  { icon: 'tdesign:time-filled', route: '/time', title: '时间转换' },
  { icon: 'tdesign:order-adjustment-column', route: '/json-view', title: 'json视图' },
  { icon: 'tdesign:icon', route: '/icon-picker', title: '图标选择器' }
])

if (isTauriApp()) {
  menuItems.value.push({
    icon: 'tdesign:map-connection',
    route: '/api-test-desktop',
    title: 'API测试-桌面'
  })
} else {
  menuItems.value.push({ icon: 'tdesign:map-connection', route: '/api-test', title: 'API测试' })
}

const handleMenuClick = route => {
  router.push(route)
}
</script>
