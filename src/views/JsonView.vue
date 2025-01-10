<script setup>
import JsonView from '../components/jsonView/index.vue'
import { ref, computed } from 'vue'
import { useTheme } from '@/utils/theme'
import { isJsonString } from '@/utils/is.js'

const { isDark } = useTheme()

const activeName = ref('json')
const theme = computed(() => {
  return isDark.value ? 'one-dark' : ''
})
const closed = ref(false)
const deep = ref(3)
const iconStyle = ref('triangle')
const color1 = ref('#818181')
const color2 = ref('#818181')
const fontSize = ref(14)
const lineHeight = ref(24)

const text = ref([])
const json = computed(() => {
  if (isJsonString(text.value)) {
    return JSON.parse(text.value)
  }
  return ''
})


const iconColor = computed(() => {
  if (color1.value && color2.value) {
    return [color1.value, color2.value]
  } else {
    return []
  }
})
</script>
<template>
  <div class="m-5">
    <el-tabs tab-position="top" v-model="activeName" class="mb-5">
      <el-tab-pane label="JSON" name="json">
        <el-button> 格式化 </el-button>
        <el-button> 压缩 </el-button>
        <el-button> 去转移 </el-button>
        <el-button> Unicode转中文 </el-button>
        <el-button> 中文转Unicode </el-button>
      </el-tab-pane>
      <el-tab-pane label="base64">
        <el-button> decode </el-button>
        <el-button> encode </el-button>
      </el-tab-pane>
      <el-tab-pane label="url">
        <el-button> decode </el-button>
        <el-button> encode </el-button>
      </el-tab-pane>
    </el-tabs>
    <el-row :gutter="20">
      <el-col :span="10">
        <el-input v-model="text" type="textarea" :rows="30" />
      </el-col>
      <el-col :span="10">
        <JsonView
          v-if="json !== ''"
          :data="json"
          :theme="theme"
          :deep="deep"
          :iconStyle="iconStyle"
          :fontSize="fontSize"
          :lineHeight="lineHeight"
          :closed="closed"
          :iconColor="iconColor"
        />
      </el-col>
    </el-row>
  </div>
</template>
<style></style>
