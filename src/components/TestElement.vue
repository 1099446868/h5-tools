<template>
  <div class="test-element">
    <!-- 测试按钮 -->
    <el-button type="primary" @click="handleClick">
      <el-icon><Plus /></el-icon>
      测试按钮
    </el-button>
    
    <!-- 测试消息提示 -->
    <el-alert
      title="Element Plus 已成功安装"
      type="success"
      :closable="false"
      class="mt-4"
    />
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'

const handleClick = () => {
  ElMessage({
    message: 'Element Plus 运行正常！',
    type: 'success',
  })
}
</script>

<style scoped>
.test-element {
  padding: 20px;
}
</style>