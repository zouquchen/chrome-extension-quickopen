import {arrayData2excel} from "./excel";

/**
 * 根据缩写获取url
 * @param input 输入
 * @returns {*}
 */
export const getUrlByAbbr = async(input) => {
  let array = await getAllValues() || []
  for (let i = 0; i < array.length; i++) {
    if (array[i][0] === input) {
      return array[i][1];
    }
  }
  return "";
}

/**
 * 设置abbr、url
 * @param abbr
 * @param url
 */
export const saveAbbrUrl = async(abbr, url) => {
  let jsonData = await buildNewValues(abbr, url)
  await chromeStorageSyncSet(jsonData)
}

/**
 * 获取历史所有数据
 */
export const getAllValues = async() => {
  let data = await chrome.storage.sync.get('quickOpen')
  if (Object.keys(data).length === 0) {
    await initData()
    data = await chrome.storage.sync.get('quickOpen')
  }
  return data.quickOpen
}

/**
 * 初始化数据
 */
export const initData = async() => {
  const newPair = ["git", "https://github.com/zouquchen/chrome-extension-quickopen"]
  let data = []
  data.push(newPair)
  await chromeStorageSyncSet(data)
}

/**
 * 获取所有历史数据的简写
 */
export const getAllAbbr = async() => {
  let allData = await getAllValues()
  let data = []
  for (const allDatum of allData) {
    data.push(allDatum[0])
  }
  return data
}

/**
 * 以前缀进行模糊匹配
 * @param input
 * @returns {Promise<*[]>}
 */
export const fuzzyMathByAbbr = async(input) => {
  let array = await getAllAbbr()
  const matches = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].startsWith(input)) {
      matches.push(array[i]);
    }
  }
  return matches;
}

/**
 * 新增配置时，重建json
 * @param abbr
 * @param url
 * @returns {string}
 */
const buildNewValues = async(abbr, url) => {
  let oldArray = await getAllValues()
  const newPair = [abbr, url]
  if (!oldArray){
    oldArray = []
  }
  oldArray.push(newPair)
  return oldArray
}

/**
 * 如果同步功能处于启用状态，数据会同步到用户登录的任何 Chrome 浏览器。
 * 如果停用，则其行为类似于 storage.local。
 * 当浏览器处于离线状态时，Chrome 会将数据存储在本地，并在其恢复在线状态后继续同步。
 * 配额限制大约为 100 KB，每项内容 8 KB。
 */
export const chromeStorageSyncSet = async(data) => {
  await chrome.storage.sync.set({'quickOpen' : data}).then(() => {

  })
}

/**
 * 清除已有配置
 */
export const clearStore = () => {
  let data = {'quickOpen' : []}
  chrome.storage.sync.set(data).then(() => {

  })
}

/**
 * 根据已有配置生成excel
 * @returns {Promise<void>}
 */
export const generateExcel = async() => {
  let data = await getAllValues()
  arrayData2excel(data)
}