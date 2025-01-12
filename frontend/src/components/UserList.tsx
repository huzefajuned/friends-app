import React from 'react'
import useStore from '../store/useStore'
import { User } from '../types'

const UserList = ({ users }: { users: User[] }) => {
  const { sendFriendRequest } = useStore()

  return (
    <ul className="divide-y divide-gray-200">
      {users.map(user => (
        <li key={user.id} className="py-4 flex justify-between items-center">
          <span>{user.username}</span>
          <button
            onClick={() => sendFriendRequest(user.id)}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-200"
          >
            Add Friend
          </button>
        </li>
      ))}
    </ul>
  )
}

export default UserList

