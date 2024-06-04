import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import Edit from '../../assets/edit.svg'
import api from '../../services/api'

function Home() {

  const [users, setUsers] = useState([])
  const [editingUserId, setEditingUserId] = useState(null)
  const inputName = useRef()
  const inputEmail = useRef()
  const inputAge = useRef()
  const inputAddress = useRef()

  async function getUsers() {
    const usersFromApi = await api.get('/users')
    setUsers(usersFromApi.data)
  }

  async function createUser() {
    await api.post('/users', {
      name: inputName.current.value,
      email: inputEmail.current.value,
      age: inputAge.current.value,
      address: inputAddress.current.value
    })

    getUsers()
    clearForm()
  }

  async function deleteUser(id) {
    await api.delete(`/users/${id}`)
    getUsers()
  }

  async function editUser(id) {
    const user = users.find(u => u.id === id)
    inputName.current.value = user.name
    inputEmail.current.value = user.email
    inputAge.current.value = user.age
    inputAddress.current.value = user.address
    setEditingUserId(id)
  }

  async function updateUser() {
    await api.put(`/users/${editingUserId}`, {
      name: inputName.current.value,
      email: inputEmail.current.value,
      age: inputAge.current.value,
      address: inputAddress.current.value
    })

    getUsers()
    clearForm()
    setEditingUserId(null)
  }

  function clearForm() {
    inputName.current.value = ''
    inputEmail.current.value = ''
    inputAge.current.value = ''
    inputAddress.current.value = ''
  }

  function handleSubmit() {
    if (editingUserId) {
      updateUser()
    } else {
      createUser()
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de usuários</h1>
        <input id="inputName" placeholder="Nome" name="name" type="text" ref={inputName}></input>
        <input id="inputEmail" placeholder="E-mail" name="email" type="email" ref={inputEmail}></input>
        <input id="inputAge" placeholder="Idade" name="age" type="number" ref={inputAge}></input>
        <input name="inputAddress" placeholder="Endereço" type="text" ref={inputAddress}></input>
        <button id="buttonCreateUser" type="button" onClick={handleSubmit}>
          {editingUserId ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Email: <span>{user.email}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Endereço: <span>{user.address}</span></p>
          </div>
          <span>
            <button onClick={() => editUser(user.id)}>
              <img src={Edit} />
            </button>
            <button onClick={() => deleteUser(user.id)}>
              <img src={Trash} />
            </button>
          </span>
        </div>
      ))}
    </div>
  )
}

export default Home
