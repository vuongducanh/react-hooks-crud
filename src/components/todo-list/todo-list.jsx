import React, { useContext } from 'react';
import './todo-list.scss';
import Store from './../../context';

function TodoList() {
  const { state } = useContext(Store);

  return (
    <div className="todo-list">
      {state.todos.map((el, index) => (
        <li key={index}>{el.title}</li>
      ))}
    </div>
  );
}

export default TodoList;
