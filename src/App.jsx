import React, { useState } from 'react';
import './App.scss';
import 'antd/dist/antd.css';
import { Button } from 'antd';

function App() {
  const [data, setCount] = useState({ count: 1, name: 'ducanh' });
  const [listUser, addListUser] = useState([]);

  return (
    <div className="App container">
      <p>count: {data.count}</p>
      {/* <button onClick={() => setCount({...data, count: data.count + 1}) }> Plus count </button> */}
      <Button type="primary" onClick={() => setCount({ ...data, count: data.count + 1 })}>
        Plus count
      </Button>

      <Button type="primary" onClick={() => addListUser([...listUser, {name: `user-${listUser.length}`}])}>
        addUser
      </Button>
      {
        listUser.map((value, index) => (
          <li key={index}>{value.name}</li>
        ))
      }
    </div>
  );
}

export default App;
