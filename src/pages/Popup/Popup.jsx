import React, {useEffect, useState} from 'react';

import {AutoComplete, Input, Button, message, Card, Space} from 'antd';
import {createNewTab} from "../../functions/newTab";
import {fuzzyMathByAbbr, getAllAbbr, getUrlByAbbr} from "../../functions/file";

const Popup = () => {
  const onSearch = async(value, _e, info) => {
    let url = await getUrlByAbbr(value)
    if (url === "") {
      message.error("配置不存在，请重新输入！")
    } else {
      createNewTab(url)
    }
  }

  const [options, setOptions] = useState([]);
  const handleSearch = async (value) => {
    let data = await fuzzyMathByAbbr(value)
    let optionsData = []
    for (const dataDatum of data) {
      optionsData.push({value: dataDatum})
    }
    setOptions(value ? optionsData : []);
  };

  const onSelect = (value) => {
    console.log('onSelect', value);
  };

  return (
      <Card title="Quick Open" extra={<a target="_blank" href="/options.html">配置</a>} style={{ width: 300 }}>
        <AutoComplete
          popupMatchSelectWidth={252}
          options={options}
          onSelect={onSelect}
          onSearch={handleSearch}
          autoFocus
          backfill
        >
          <Input.Search placeholder="请输入..." onSearch={onSearch} enterButton />
        </AutoComplete>
      </Card>
  );
};

export default Popup;
