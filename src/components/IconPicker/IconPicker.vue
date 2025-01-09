<script setup>
import epIcons from './data/icons.ep'
import antIcons from './data/icons.ant-design'
import tIcons from './data/icons.tdesign'
import { computed, ref, unref, watch, nextTick } from 'vue'
import { useIcon } from '@/hooks/web/useIcon'
import { useDesign } from '@/hooks/web/useDesign'
import { writeText } from '@tauri-apps/plugin-clipboard-manager'
import { ElMessage } from 'element-plus'

const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('icon-picker')

const icons = [epIcons, antIcons, tIcons]
const iconName = ref(icons[0].prefix)
const pageSize = ref(150)
const currentPage = ref(1)
const search = ref('')
const size = 'small'
const modelValue = defineModel()

const icon_search = useIcon({ icon: 'ep:search' })

const tabChange = () => {
  currentPage.value = 1
}

const filterIcons = icons => {
  const start = (unref(currentPage) - 1) * unref(pageSize)
  const end = unref(currentPage) * unref(pageSize)
  return icons.slice(start, end)
}

const filterItemIcons = icons => {
  return icons.filter(item => item.includes(unref(search)))
}

const iconSize = computed(() => {
  return unref(size) === 'small'
    ? 'var(--el-component-size-small)'
    : unref(size) === 'large'
      ? 'var(--el-component-size-large)'
      : 'var(--el-component-size)'
})

const currentIconNameIndex = computed(() => {
  return icons.findIndex(item => item.prefix === unref(iconName))
})

const iconSelect = async icon => {
  console.log(icon)
  modelValue.value = icon
  await writeText(icon)
  ElMessage.info(icon + '已复制')
}

const inputClear = () => {
  init(unref(modelValue))
}

const init = async icon => {
  if (!icon) return
  const iconInfo = icon.split(':')
  iconName.value = iconInfo[0]
  const wrapIndex = icons.findIndex(item => item.prefix === iconInfo[0])
  // 查询当前icon的索引
  const index = filterItemIcons(icons[wrapIndex].icons).findIndex(item => item === icon)
  // 计算当前icon的页码
  await nextTick()
  currentPage.value = Math.ceil((index + 1) / unref(pageSize))
}

watch(
  () => modelValue.value,
  async val => {
    await nextTick()
    val && (await init(val))
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div :class="prefixCls">
    <div class="flex justify-center items-center box">
      <el-input
        v-model="search"
        class="mb-20px icon-search"
        clearable
        placeholder="搜索图标"
        @clear="inputClear"
      />
      <el-input class="mb-20px icon-search" disabled v-model="modelValue" />
    </div>
    <div>
      <el-tabs tab-position="top" v-model="iconName" @tab-change="tabChange">
        <el-tab-pane v-for="item in icons" :key="item.name" :label="item.name" :name="item.prefix">
          <div class="flex flex-wrap box-border">
            <div
              v-for="icon in filterIcons(filterItemIcons(item.icons))"
              :key="icon"
              :style="{
                width: iconSize,
                height: iconSize,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                border: `1px solid var(--el-icon-border-color)`,
                boxSizing: 'border-box',
                margin: '10px'
              }"
              @click="iconSelect(icon)"
            >
              <Icon
                :icon="icon"
                :color="icon === modelValue ? 'var(--el-color-primary)' : 'inherit'"
                style="font-size: 20px"
              />
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div
      class="h-50px absolute flex items-center pl-[var(--el-popover-padding)] pr-[var(--el-popover-padding)]"
    >
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :pager-count="5"
        small
        :page-sizes="[100, 200, 300, 400]"
        layout="total, prev, pager, next, jumper"
        :total="filterItemIcons(icons[currentIconNameIndex].icons).length"
      />
    </div>
  </div>
</template>

<style scoped>
.icon-search {
  width: 150px;
}
</style>
