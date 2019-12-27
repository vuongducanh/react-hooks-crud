import React, { useContext, useRef, useState, useMemo, useCallback, useEffect } from 'react';
import './todo-add.scss';
import Store from './../../context';
import { Input } from 'antd';

function TodoAdd({counts,handleClick}) {
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
    },
    [count]
  );

  const handleTestFnCallback = useCallback(
    () => {
      console.log('change');
    },
    [],
  );

  useEffect(() => {
    console.log('components todo-add')

    return () => {
      console.log('remove')
    }
  },[])

  useEffect(() => {
    // console.log('khi count update')
  },[count])

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
