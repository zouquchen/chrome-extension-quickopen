import {getAllValues} from "./file";

/**
 * 获取所有配置数据并进行映射
 */
export const getAllData = async () => {
	const allData = await getAllValues();
	const data = []
	for (let i = 0; i < allData.length; i++) {
		data.push({
			key: i,
			abbr: allData[i][0],
			url: allData[i][1],
		});
	}
	return data
}