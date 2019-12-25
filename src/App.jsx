import React, {useReducer } from 'react';
import './App.scss';
import 'antd/dist/antd.css';
import TodoList from './components/todo-list/todo-list';
import TodoAdd from './components/todo-add/todo-add';
import todoReducer from './reducer';
import Store from './context';

var initialState = {
  todos: []
}

function App() {
  const [state, dispatch] = useReducer(todoReducer, initialState)

  return (
    <Store.Provider value={{ state, dispatch }}>
      <div className="App container">
          <TodoAdd></TodoAdd>
          <TodoList></TodoList>
      </div>
    </Store.Provider>
  );
}

export default App;
