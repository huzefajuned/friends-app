import react, { useEffect, useState } from 'react'
import useStore from '../store/useStore'
import UserList from '../components/UserList'
import FriendList from '../components/FriendList'
import RecommendationList from '../components/RecommendationList'
import React from 'react'

const Home = () => {
  const { getFriends, getRecommendations, searchUsers, friends, recommendations, searchResults } = useStore()
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    getFriends()
    getRecommendations()
  }, [getFriends, getRecommendations])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    searchUsers(searchQuery)
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Search Users</h2>
          <form onSubmit={handleSearch} className="mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users..."
              className="w-full p-2 border rounded"
            />
            <button type="submit" className="mt-2 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition duration-200">
              Search
            </button>
          </form>
          <UserList users={searchResults} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Friends</h2>
          <FriendList friends={friends} />
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Recommended Friends</h2>
        <RecommendationList recommendations={recommendations} />
      </div>
    </div>
  )
}

export default Home

