import { useDark, useToggle } from '@vueuse/core'

/**
 * 创建主题管理器
 * @returns {Object} 主题相关的状态和方法
 */
export const useTheme = () => {
  // 使用 VueUse 的 useDark 和 useToggle
  const isDark = useDark({
    // 选择器，匹配 html 标签
    selector: 'html',
    // 深色模式类名
    attribute: 'class',
    // 深色模式值
    valueDark: 'dark',
    // 浅色模式值
    valueLight: ''
  })

  // 切换主题的方法
  const toggleDark = useToggle(isDark)

  return {
    isDark,
    toggleDark
  }
}
