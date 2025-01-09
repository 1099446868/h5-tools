export const isJson = str => {
  try {
    JSON.parse(str)
  } catch {
    return false
  }
  return true
}

export const isArray = arr => {
  return Array.isArray(arr)
}

export const isObject = obj => {
  return typeof obj === 'object' && obj !== null
}

export const isString = str => {
  return typeof str === 'string'
}

export const isNumber = num => {
  return typeof num === 'number'
}

export const isBoolean = bool => {
  return typeof bool === 'boolean'
}

export const isFunction = func => {
  return typeof func === 'function'
}

export const isNull = obj => {
  return obj === null
}

export const isUndefined = undefined => {
  return typeof undefined === 'undefined'
}

export const isEmpty = obj => {
  return (
    isNull(obj) ||
    isUndefined(obj) ||
    obj === '' ||
    obj === false ||
    obj === 0 ||
    isEmptyArray(obj) ||
    isEmptyObject(obj) ||
    obj === 'null' ||
    obj === 'undefined' ||
    obj === 'NaN' ||
    obj === 'Infinity' ||
    obj === 'NaN' ||
    obj === '0'
  )
}

export const isEmptyArray = arr => {
  return isArray(arr) && arr.length === 0
}

export const isEmptyObject = obj => {
  return isObject(obj) && Object.keys(obj).length === 0
}

export const isEmptyString = str => {
  return isString(str) && str.length === 0
}

export const isStrictEmpty = obj => {
  return isEmpty(obj) || isEmptyArray(obj) || isEmptyObject(obj) || isNaN(obj)
}

export const isXml = str => {
  return isString(str) && str.startsWith('<?xml')
}

export const isHtml = str => {
  return isString(str) && str.startsWith('<') && str.endsWith('>')
}

export const isJsonString = str => {
  return isString(str) && str.startsWith('{') && str.endsWith('}')
}

export const isXmlString = str => {
  return isString(str) && str.startsWith('<?xml') && str.endsWith('?>')
}
