import React, { useContext, useEffect } from 'react';
import './todo-list.scss';
import Store from './../../context';

function TodoList({count, handleClick}) {
  const { state } = useContext(Store);

  useEffect(() => {
    console.log('components todo-list')
  },[])

  return (
    <div className="todo-list">
       <p>Counter : {count}</p>  
      <button onClick={handleClick}>Increment Counter</button>  
      {state.todos.map((el, index) => (
        <li key={index}>{el.title}</li>
      ))}
    </div>
  );
}

export default TodoList;
