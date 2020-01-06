import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Table, Button, Modal, Input } from 'antd';
import { useMutation } from '@apollo/react-hooks';

const { Column } = Table;

const Graphql = () => {
  const [showModal, activeModel] = useState(false);
  const [title, setTitle] = useState('');
  const { loading, error, data } = useQuery(LIST_USER);

  const [remove, { loading: loadingApi }] = useMutation(REMOVE_USER, {
    update(cache, { data: { deleteTodo } }) {
      const { todoes } = cache.readQuery({ query: LIST_USER });
      cache.writeQuery({
        query: LIST_USER,
        data: { todoes: todoes.filter(el => el.id !== deleteTodo.id) },
      });
    }
  });

  const [createUser] = useMutation(CREATE_USER, {
    update(cache, { data: { createTodo } }) {
      const { todoes } = cache.readQuery({ query: LIST_USER });
      cache.writeQuery({
        query: LIST_USER,
        data: { todoes: todoes.concat([createTodo]) },
      });
    }
  });

  const handleDeleteUser = (id) => {
    remove({ variables: { id: id } })
  }

  const handleShowModal = () => {
    setTitle('')
    activeModel(true)
  };

  const handleHideModal = () => {
    activeModel(false)
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleCreateUser = () => {
    if(!title) return;

    createUser({ variables: { title: title } }).then(result => {
      if(result.data) {
        handleHideModal()
      }
    })
  }

  if (error) return <h1>Error fetching user!</h1>
  if (!loading && data) {
    return (
      <div className="list-user">
        <div style={{ marginBottom: 30, textAlign: 'left'}}>
          <Button type="primary" onClick={handleShowModal}>
            Create User
          </Button>
        </div>

        <Modal
          title="Create User"
          visible={showModal}
          onOk={handleCreateUser}
          onCancel={handleHideModal}
          okText="Save"
          cancelText="cancel"
        >
          <Input placeholder="title" value={title} onChange={handleChangeTitle}/>
        </Modal>

        <Table dataSource={data.todoes} rowKey="id" loading={loadingApi}>
          <Column
            title="Title"
            key="title"
            dataIndex="title"
          />

          <Column
            title="Completed"
            key="completed"
            dataIndex="completed"
            render={(text, record) => (
              <span>{record.completed ? 'true' : 'false'}</span>
            )}
          />

          <Column
            title="Action"
            key="id"
            render={(text, record) => (
              <Button onClick={() => handleDeleteUser(record.id)}>Delete</Button>
            )}
          />
        </Table>
      </div>
    )
  }

  return <h2>Loading data...</h2>
}

export const LIST_USER = gql`
  query todoes {
    todoes {
      id
      title
      completed
    }
  }
`

export const REMOVE_USER = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(where: {id: $id}) {
      id
    }
  }
`

export const CREATE_USER = gql`
  mutation createTodo($title: String!) {
    createTodo(data: {title: $title}) {
      id
      title
      completed
    }
  }
`

export default Graphql;
