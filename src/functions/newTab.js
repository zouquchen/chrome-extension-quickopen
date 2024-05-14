
/**
 * 打开新标签页
 * @param url url
 */
export const createNewTab = (url) => {
  chrome.tabs.create({
    url: url
  })
}