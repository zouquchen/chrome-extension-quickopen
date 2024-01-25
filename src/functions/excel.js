const XLSX = require('xlsx');

/**
 * 根据数组生成excel
 * @param array
 */
export const arrayData2excel = (array) => {
  // 创建一个工作簿
  const workbook = XLSX.utils.book_new();
  // 创建一个工作表
  const worksheet = XLSX.utils.aoa_to_sheet(array);
  // 将工作表添加到工作簿
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  // 将工作簿保存为Excel文件
  XLSX.writeFile(workbook, 'quickOpen-data.xlsx');
}
