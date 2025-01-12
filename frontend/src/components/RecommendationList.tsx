import React from 'react'
import useStore from '../store/useStore'
import { Recommendation } from '../types'

const RecommendationList = ({ recommendations }: { recommendations: Recommendation[] }) => {
  const { sendFriendRequest } = useStore()

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {recommendations.map((recommendation:any, index) => (
        <li key={ index } className="bg-white shadow rounded-lg p-4">
          <h3 className="font-semibold">{recommendation.username}</h3>
          <p className="text-sm text-gray-600">
            {recommendation.mutualFriendsCount} mutual friends
          </p>
          <p className="text-sm text-gray-600">
            {recommendation.commonInterests} common interests
          </p>
          <button
            onClick={() => sendFriendRequest(recommendation._id)}
            className="mt-2 bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 transition duration-200"
          >
            Add Friend
          </button>
        </li>
      ))}
    </ul>
  )
}

export default RecommendationList

