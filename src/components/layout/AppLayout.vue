<template>
  <div class="app-container bg-[#262626] min-h-screen text-gray-200">
    <SideMenu />
    <div class="main-content ml-[60px] h-screen flex flex-col">
      <TitleBar />
      <!-- 路由视图 -->
      <div class="flex-1 overflow-auto scroll-container">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import SideMenu from './SideMenu.vue'
import TitleBar from './TitleBar.vue'
</script>

<style>
:root {
  --el-color-primary: #409eff;
}

.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-300 ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style> 