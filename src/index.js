import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { gql } from 'apollo-boost';

import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const GRAPHCMS_API = 'https://us1.prisma.sh/public-ceruleanforger-651/todo-in-react-apollo/dev'
const cache = new InMemoryCache();
cache.writeData({
  data: {
    userList: [{id: '1', completed: true, text: '1234', __typename: 'listUser'}]
  }
})
const client = new ApolloClient({
  link: new HttpLink({ uri: GRAPHCMS_API }),
  cache,
  resolvers: {
    Mutation: {
      filterUser: (_, variables, { cache }) => {
        const { todoes } = cache.readQuery({ query: LIST_USER });

        // const dataFilter = todoes.filter(el => el.title.includes(variables.key));

        // cache.writeQuery({
        //   query: LIST_USER,
        //   data: { todoes: dataFilter },
        // });

        return null;
      },
      setUserList: (_, variables, {cache}) => {
        const { userList } = cache.readQuery({ query: GET_ALL_USER });

        console.log(variables);

        cache.writeQuery({
          query: GET_ALL_USER,
          data: { userList: [...userList, {...variables}] },
        });

        return null
      }
    },
  }
});

export const LIST_USER = gql`
  query todoes {
    todoes {
      id
      title
      completed
    }
  }
`;

const GET_ALL_USER = gql`
  {
    userList @client {
      id
      completed
      text
    }
  }
`;

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
