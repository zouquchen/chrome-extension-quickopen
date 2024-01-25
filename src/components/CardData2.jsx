import React, {useEffect, useState} from 'react';
import {Card, Button, Table, Space} from 'antd';
import {getAllValues} from "../functions/file";

export const CardData2 = () => {
    return (
        <Card title="数据">
            <DataTable/>
        </Card>
    )
}

const columns = [
    {
        title: 'abbr(缩写)',
        dataIndex: 'abbr',
    },
    {
        title: 'url(链接)',
        dataIndex: 'url',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
              <a>Delete</a>
          </Space>
        ),
    },
];

const DataTable = () => {

    const [data,setData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const allData = await getAllValues();
            if (allData){
                const data = []
                for (let i = 0; i < allData.length; i++) {
                    data.push({
                        key: i,
                        abbr: allData[i][0],
                        url: allData[i][1],
                    });
                }
                setData(data)
            }
        }
        fetchData()
    },[])

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    return (
      <Table columns={columns} dataSource={data} rowClassName={() => 'editable-row'} />
    );
};