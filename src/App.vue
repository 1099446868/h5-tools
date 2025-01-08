<template>
  <AppLayout />
</template>

<script setup>
import AppLayout from './components/layout/AppLayout.vue'
import { isTauriApp, getEnvironmentInfo } from './utils/environment'

console.log(isTauriApp())
console.log(getEnvironmentInfo())
</script>

<style>
/* CSS Reset */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden; /* 防止出现双滚动条 */
}

/* 移除列表样式 */
ul,
ol {
  list-style: none;
}

/* 移除链接下划线 */
a {
  text-decoration: none;
  color: inherit;
}

/* 移除按钮默认样式 */
button {
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
}

/* 移除输入框默认样式 */
input,
textarea {
  border: none;
  outline: none;
}

/* 图片默认样式 */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* 修改滚动条样式 - 使用display控制显示隐藏 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  display: none; /* 默认隐藏 */
}

/* 鼠标悬停或滚动时显示滚动条 */
*:hover::-webkit-scrollbar,
*:active::-webkit-scrollbar {
  display: block;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(102, 102, 102, 0.3);
  border-radius: 3px;
  transition: background 0.3s;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(153, 153, 153, 0.5);
}

/* 特定容器的滚动条样式 */
.scroll-container {
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: rgba(102, 102, 102, 0.3) transparent; /* Firefox */
}

.scroll-container:hover {
  scrollbar-width: thin;
}

/* 禁用文本选择 */
.no-select {
  user-select: none;
  -webkit-user-select: none;
}

/* 设置根字体大小，方便使用rem */
:root {
  font-size: 16px;
}

/* 平滑滚动 */
html {
  scroll-behavior: smooth;
}

/* 移除表单元素的默认样式 */
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* 设置基础文本颜色和背景 */
body {
  color: #fff;
  background: #1e1e1e;
}

/* 移除 Firefox 的输入框内部填充 */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
