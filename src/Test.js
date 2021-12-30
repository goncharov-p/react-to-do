import React, { useState  } from 'react';
import logoImg from './logo.svg';


function  Test() {

  const [text, setText] = useState('привет не нажато')
  const func =(text) => {
    setText(text)
  }
  return (
    <div className="App">
      {text}
      </div>
    );
}
export default Test;