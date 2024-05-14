import React, {useState} from 'react';
import './Newtab.css';
import './Newtab.scss';
import Popup from "../Popup/Popup";

const Newtab = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Popup />
      </header>
    </div>
  );
};


export default Newtab;
