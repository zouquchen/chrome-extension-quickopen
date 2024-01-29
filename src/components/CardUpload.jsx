import React from 'react';
import {Button, Card, Upload} from 'antd';
import {uploadProps} from "./Upload";
import {UploadOutlined,DownloadOutlined} from "@ant-design/icons";
import {generateExcel} from "../functions/file";

export const CardUpload = () => {

  return(
    <Card title="数据文件">
	    <Button icon={<DownloadOutlined />} size={'middle'} onClick={generateExcel}>
		    点击下载excel配置
	    </Button>
			｜
      <Upload {...uploadProps} maxCount={1} accept={".xlsx"}>
          <Button icon={<UploadOutlined />}>点击上传Excel配置</Button>
      </Upload>
    </Card>
  )
}
