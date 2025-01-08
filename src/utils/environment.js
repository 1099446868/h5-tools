/**
 * 判断当前运行环境
 * @returns {boolean} 是否在 Tauri 环境中运行
 */
export const isTauriApp = () => {
  return Boolean(window && window.__TAURI_INTERNALS__)
}

/**
 * 获取详细的运行环境信息
 * @returns {Object} 环境信息对象
 */
export const getEnvironmentInfo = () => {
  return {
    isTauri: Boolean(window && window.__TAURI_INTERNALS__),
    isWeb: !Boolean(window && window.__TAURI_INTERNALS__),
    isDev: import.meta.env.DEV,
    isProd: import.meta.env.PROD
  }
}
