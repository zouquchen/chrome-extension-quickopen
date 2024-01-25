import React, {useState} from 'react';
import {Button, Upload} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import './Newtab.css';
import './Newtab.scss';

import {saveAbbrUrl, clearStore, generateExcel} from "../../functions/file";
import Popup from "../Popup/Popup";
import {uploadProps} from "../../components/Upload";


const XLSX = require('xlsx');


const Newtab = () => {
  const [saveAbbr, setSaveAbbr] = useState()
  const [saveUrl, setSaveUrl] = useState()

  return (
    <div className="App">
      <header className="App-header">
        <div>
          abbr: <input onChange={e => {setSaveAbbr(e.target.value)}} />
          url: <input onChange={e => {setSaveUrl(e.target.value)}} />
          <button onClick={() => saveAbbrUrl(saveAbbr, saveUrl)} id="save">Save</button>
        </div>

        <div>
          <button onClick={() => clearStore()}>clear</button>
        </div>

        <div>
          <button onClick={() => generateExcel()}>生成excel</button>
        </div>

        <div>
          <Upload {...uploadProps} maxCount={1} accept={".xlsx"}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </div>
        <Popup />
      </header>
    </div>
  );
};


export default Newtab;
