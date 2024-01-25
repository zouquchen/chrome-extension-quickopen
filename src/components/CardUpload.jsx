import React from 'react';
import {Button, Card, Upload} from 'antd';
import {uploadProps} from "./Upload";
import {UploadOutlined,DownloadOutlined} from "@ant-design/icons";

export const CardUpload = () => {
  return(
    <Card title="数据文件">
	    <Button icon={<DownloadOutlined />} size={'middle'}>
		    点击下载excel配置
	    </Button>
			｜
      <Upload {...uploadProps} maxCount={1} accept={".xlsx"}>
          <Button icon={<UploadOutlined />}>点击上传Excel配置</Button>
      </Upload>
    </Card>
  )
}
