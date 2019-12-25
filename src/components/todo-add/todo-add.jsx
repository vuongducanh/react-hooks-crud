import React, { useContext, useRef, useState, useMemo, useCallback } from 'react';
import './todo-add.scss';
import Store from './../../context';
import { Input } from 'antd';

function TodoAdd() {
  const { dispatch } = useContext(Store);
  const [title, setTitle] = useState('')
  const inputEl = useRef(null);
  const boxEl = useRef({});
  const [count, setCount] = useState(0)

  function handleChangeInput(value) {
    setTitle(value)
  }

  const handleTestUseMemo = useMemo(
    function test() {
      if (count > 3) {
        console.log(true)
      }
      console.log('change useMemo count', count)
    },
    [count]
  );

  const handleTestFnCallback = useCallback(
    () => {
      console.log('change');
    },
    [],
  );

  return (
    <div className="todo-list">
      <Input placeholder="Basic usage" ref={inputEl} onChange={e => handleChangeInput(e.target.value)} />
      <div ref={boxEl}>test reft</div>
      <button onClick={() => dispatch({ type: 'ADD_TODO', payload: { title: title, description: 'aa' } })}>Add todo</button>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>set Count</button>

      <button onClick={handleTestUseMemo}>Handle test useMemo</button>


      <button onClick={handleTestFnCallback}>Handle test Fn callback</button>

    </div>
  );
}

export default TodoAdd;
