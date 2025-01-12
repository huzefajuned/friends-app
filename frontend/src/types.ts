export interface User {
  id: string
  username: string
}

export interface Friend extends User {}

export interface Recommendation extends User {
  mutualFriendsCount: number
  commonInterests: number
}

