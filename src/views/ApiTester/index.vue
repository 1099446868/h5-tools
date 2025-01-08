<script setup>
import { ref } from 'vue'
import { ApiView } from './components'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const apiView = ref(null)
const loading = ref(false)

const sendRequest = () => {
  loading.value = true
}
</script>
<template>
  <ApiView ref="apiView" :send-request="sendRequest" :loading="loading" />
</template>
