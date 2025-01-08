import { createRouter, createWebHashHistory } from 'vue-router'

// 引入页面组件
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('../components/TestElement.vue'),
    meta: {
      title: '测试页面'
    }
  },
  {
    path: '/time',
    name: 'TimeConverter',
    component: () => import('../views/TimeConverter.vue'),
    meta: {
      title: '时间转换'
    }
  },
  // 添加API测试工具路由
  {
    path: '/api-test',
    name: 'ApiTester',
    component: () => import('../views/ApiTester/web.vue'),
    meta: {
      title: 'API测试'
    }
  },
  {
    path: '/api-test-desktop',
    name: 'ApiTesterDesktop',
    component: () => import('../views/ApiTester/desktop.vue'),
    meta: {
      title: 'API测试-桌面'
    }
  },
  {
    path: '/json-view',
    name: 'JsonView',
    component: () => import('../views/JsonView.vue'),
    meta: {
      title: 'json视图'
    }
  },
  {
    path: '/icon-picker',
    name: 'IconPicker',
    component: () => import('../components/IconPicker/IconPicker.vue'),
    meta: {
      title: '图标选择器'
    }
  }
]

const router = createRouter({
  // 使用 hash 模式构建路由（#）
  history: createWebHashHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title || 'Tauri App'
  next()
})

export default router
