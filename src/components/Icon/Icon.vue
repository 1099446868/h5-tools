<template>
  <ElIcon :class="prefixCls" :size="size" :color="color">
    <svg v-if="isLocal" aria-hidden="true">
      <use :xlink:href="symbolId" />
    </svg>

    <Icon v-else :icon="icon" :style="getIconifyStyle" />
  </ElIcon>
</template>
<script setup>
import { computed, unref } from 'vue'
import { ElIcon } from 'element-plus'
import { useDesign } from '@/hooks/web/useDesign'
import { Icon } from '@iconify/vue'
const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('icon')

const props = defineProps({
  // icon name
  icon: String,
  // icon color
  color: String,
  // icon size
  size: Number,
  hoverColor: String
})
const isLocal = computed(() => props.icon.startsWith('svg-icon:'))

const symbolId = computed(() => {
  return unref(isLocal) ? `#icon-${props.icon.split('svg-icon:')[1]}` : props.icon
})

const getIconifyStyle = computed(() => {
  const { color, size } = props
  return {
    fontSize: `${size}px`,
    color
  }
})
</script>
<style scoped></style>
