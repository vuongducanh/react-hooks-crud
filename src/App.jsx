import React, { useReducer, useState } from 'react';
import 'antd/dist/antd.css';
import './App.scss';
import TodoList from './components/todo-list/todo-list';
import TodoAdd from './components/todo-add/todo-add';
import todoReducer from './reducer';
import Store from './context';
import TestReduce from './components/test-reduce/test-reduce';
import UseMemo from './components/test-usememo/test-usememo';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import Graphql from './components/graphql-api/graphql-api';
import Chart from './components/chart/chart'

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
      <Router>
        <div className="App container">
          <ul>
            <li>
              <NavLink
                exact to='/'
                className='Header-navLink'
                activeClassName='Header-isActive'
              >Home
              </NavLink>
            </li>

            <li>
              <NavLink
                exact to='/graphql'
                className='Header-navLink'
                activeClassName='Header-isActive'
              >Graphql
              </NavLink>
            </li>

            <li>
              <NavLink
                exact to='/chart'
                className='Header-navLink'
                activeClassName='Header-isActive'
              > chart
              </NavLink>
            </li>
          </ul>
          <Route exact path='/graphql' component={Graphql} />
          <Route exact path='/'>
            <TodoAdd></TodoAdd>
            <TodoList count={count} handleClick={incrementCounter}></TodoList>
            <br></br>
            <TestReduce></TestReduce>
            <br></br>
            <br></br>
            <UseMemo></UseMemo>
          </Route>
        </div>
        <Route exact path='/chart' component={Chart} />
      </Router>
    </Store.Provider>

  );
}

export default App;
