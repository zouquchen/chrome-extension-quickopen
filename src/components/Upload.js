import {message} from "antd";
import {chromeStorageSyncSet} from "../functions/file";

const XLSX = require('xlsx');
export const uploadProps = {
  name: 'file',
  // action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  headers: {
    authorization: 'authorization-text',
  },
  showUploadList: false,
  onChange(info) {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 文件上传成功！`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败！`);
    }
  },
  // 读取excel文件
  beforeUpload: (file, fileList) => {
    let rABS = true;
    const f = fileList[0];
    let reader = new FileReader();
    reader.onload = function (e) {
      let data = e.target.result;
      if (!rABS) data = new Uint8Array(data);
      let workbook = XLSX.read(data, {
        type: rABS ? 'binary' : 'array'
      });
      // 假设我们的数据在第一个标签
      let first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
      // XLSX自带了一个工具把导入的数据转成json
      let excelData = XLSX.utils.sheet_to_json(first_worksheet, {header:1});
      // 添加excelData
      chromeStorageSyncSet(excelData)
    };
    if (rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f);
  }
};