import React from 'react';
import {Space} from 'antd';
import {CardData} from "../../components/CardData";
import {CardUpload} from "../../components/CardUpload";

const Options = () => {
    return (
        <div>
            <h1 className="text-center"> QuickOpen Setting</h1>

            <Space
                direction="vertical"
                size="middle"
                style={{
                    display: 'flex',
                    margin: 15
                }}
            >
                <CardData />
                <CardUpload />
            </Space>

        </div>
    )
};
export default Options;