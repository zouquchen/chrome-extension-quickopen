import {getUrlByAbbr} from "./file";
import { Button, message, Space } from 'antd';

/**
 * 打开新标签页
 * @param url url
 */
export const createNewTab = (url) => {
  chrome.tabs.create({
    url: url
  })
}