import React, { useReducer, useState } from 'react';
import './App.scss';
import 'antd/dist/antd.css';
import TodoList from './components/todo-list/todo-list';
import TodoAdd from './components/todo-add/todo-add';
import todoReducer from './reducer';
import Store from './context';
import TestReduce from './components/test-reduce/test-reduce';
import UseMemo from './components/test-usememo/test-usememo';

var initialState = {
  todos: []
}

function App() {
  const [state, dispatch] = useReducer(todoReducer, initialState)
  const [count, setCount] = useState(0)

  const incrementCounter = () => {
    setCount(count + 1)
  }

  return (
    <Store.Provider value={{ state, dispatch }}>
      <div className="App container">
        <TodoAdd></TodoAdd>
        <TodoList count={count} handleClick={incrementCounter}></TodoList>
        <br></br>
        <TestReduce></TestReduce>
        <br></br>
        <br></br>
        <UseMemo></UseMemo>
      </div>
    </Store.Provider>

  );
}

export default App;
