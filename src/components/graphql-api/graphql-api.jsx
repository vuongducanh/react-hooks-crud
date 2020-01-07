import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Table, Button, Modal, Input } from 'antd';

const { Column } = Table;
const { Search } = Input;


const Graphql = () => {
  const [showModal, activeModel] = useState(false);
  const [dataRecord, setDataRecord] = useState({});
  const [statusModal, setStatusModal] = useState('');
  const { loading, error, data } = useQuery(LIST_USER);
  const [originUser, setOriginUser] = useState([])
  const [valueInput, setValueInput] = useState('')

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

  useEffect(() => {
    if(!loading) {
      setOriginUser({...data})
    }
  }, [loading, data])

  const [updateUser] = useMutation(UPDATE_USER)

  const handleShowModal = (record, type) => {
    setDataRecord({})
    activeModel(true)
    setStatusModal(type)
    if (type !== 'create') {
      setDataRecord({ ...dataRecord, ...record })
    }
  };

  const handleHideModal = () => {
    activeModel(false)
  };

  const handleChangeTitle = (e) => {
    setDataRecord({ ...dataRecord, title: e.target.value })
  }

  const handleCreateUser = () => {
    if (!dataRecord.title) return;

    if (statusModal === 'create') {
      createUser({ variables: { title: dataRecord.title } }).then(result => {
        if (result.data) {
          handleHideModal()
        }
      })
    }

    if (statusModal === 'update') {
      updateUser({ variables: { id: dataRecord.id, title: dataRecord.title }}).then(result => {
        if (result.data) {
          handleHideModal()
        }
      })
    }

    if (statusModal === 'delete') {
      remove({ variables: { id: dataRecord.id } }).then(result => {
        handleHideModal()
      })
    }
  }

  const handleSearch = (value) => {
    data.todoes = originUser.todoes.filter(el => el.title.includes(value));
    setValueInput(value)
  }

  if (error) return <h1>Error fetching user!</h1>

  if (!loading && data) {
    return (
      <div className="list-user">
        <div style={{ marginBottom: 30, width: '100%' }}>
          <div style={{ textAlign: 'left', width: '50%', display: 'inline-block' }}>
            <Button type="primary" onClick={() => handleShowModal(null, 'create')}>
              Create User
          </Button>
          </div>
          <div style={{ textAlign: 'right', width: '50%', display: 'inline-block' }}>
            <Search
              placeholder="Search Title"
              onSearch={value => handleSearch(value)}
              style={{ width: 400 }}
              enterButton
            />
          </div>

        </div>

        <Modal
          title={statusModal}
          visible={showModal}
          onOk={handleCreateUser}
          onCancel={handleHideModal}
          okText={statusModal}
          cancelText="cancel"
        >
          {statusModal !== 'delete' && <Input placeholder="title" value={dataRecord.title} onChange={handleChangeTitle} />}
          {statusModal === 'delete' && <span> Do You Want Delete: {dataRecord.title} </span>}
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
              <>
                <Button onClick={() => handleShowModal(record, 'delete')}>Delete</Button>
                <Button type="primary" onClick={() => handleShowModal(record, 'update')} style={{ marginLeft: 10 }}>Update</Button>
              </>
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
export const UPDATE_USER = gql`
  mutation updateTodo($id: ID!, $title: String!) {
    updateTodo(data: {title: $title} where: {id: $id}) {
      id
      title
      completed
    }
  }
`

// const FILTER_USER = gql`
//   mutation FilterUser($key: String!) {
//     filterUser(key: $key) @client
//   }
// `;

export default Graphql;
