import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, Route, Routes, useMatch } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import User from './User'

const UserList = ({ users }) => {
  const table = () => (
    <Table>
      <tbody>
        <tr>
          <td></td>
          <td>
            <strong>blogs created</strong>
          </td>
        </tr>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
  return (
    <div>
      <h1>Users</h1>
      {users ? table() : null}
    </div>
  )
}

export default UserList

