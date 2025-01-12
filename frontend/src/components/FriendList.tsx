import React from 'react'
import useStore from '../store/useStore'
import { Friend } from '../types'

const FriendList = ({ friends }: { friends: Friend[] }) => {
  const { unfriend } = useStore()

  return (
    <ul className="divide-y divide-gray-200">
      {friends.map(friend => (
        <li key={friend.id} className="py-4 flex justify-between items-center">
          <span>{friend.username}</span>
          <button
            onClick={() => unfriend(friend.id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
          >
            Unfriend
          </button>
        </li>
      ))}
    </ul>
  )
}

export default FriendList

