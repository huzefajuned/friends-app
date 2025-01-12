import { create } from "zustand";
import axios from "axios";
import { User, Friend, Recommendation } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

axios.defaults.baseURL = API_BASE_URL;

type State = {
  user: User | null;
  friends: Friend[];
  recommendations: Recommendation[];
  searchResults: User[];
  isLoading: boolean;
  error: string | null;
  token: string | null;
  isAuthenticated: boolean;
  
};

type Actions = {
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  getFriends: () => Promise<void>;
  getRecommendations: () => Promise<void>;
  searchUsers: (query: string) => Promise<void>;
  sendFriendRequest: (userId: string) => Promise<void>;
  acceptFriendRequest: (userId: string) => Promise<void>;
  rejectFriendRequest: (userId: string) => Promise<void>;
  unfriend: (userId: string) => Promise<void>;
};

const useStore = create<State & Actions>((set, get) => ({
  user: null,
  friends: [],
  recommendations: [],
  searchResults: [],
  isLoading: false,
  error: null,
  isAuthenticated: false,
  token: null,

  login: async (username, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });
      const { token, userId } = response.data;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      set({ user: { id: userId, username },isAuthenticated:true, isLoading: false });
    } catch (error) {
      set({ error: "Login failed", isAuthenticated:false, isLoading: false });
    }
  },

  signup: async (username, password) => {
    console.log("signup hit :", API_BASE_URL);
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post("/api/auth/signup", {
        username,
        password,
      });
      const { token, userId } = response.data;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      set({ user: { id: userId, username }, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ error: "Signup failed", isLoading: false });
    }
  },

  checkAuth: async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await axios.get("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        set({ token, isAuthenticated: true, user: res.data });
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("token");
        set({ token: null, isAuthenticated: false, user: null });
      }
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    set({ user: null, friends: [], recommendations: [], searchResults: [] });
  },

  getFriends: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get("/api/friends/list");
      set({ friends: response.data, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch friends", isLoading: false });
    }
  },

  getRecommendations: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get("/api/users/recommendations");
      set({ recommendations: response.data, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch recommendations", isLoading: false });
    }
  },

  searchUsers: async (query) => {
    console.log('query ',query)
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`/api/users/search?query=${query}`);
      set({ searchResults: response.data, isLoading: false });
    } catch (error) {
      set({ error: "Search failed", isLoading: false });
    }
  },

  sendFriendRequest: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      await axios.post("/api/friends/request", { friendId: userId });
      set({ isLoading: false });
    } catch (error) {
      set({ error: "Failed to send friend request", isLoading: false });
    }
  },

  acceptFriendRequest: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      await axios.post("/api/friends/accept", { friendId: userId });
      get().getFriends();
    } catch (error) {
      set({ error: "Failed to accept friend request", isLoading: false });
    }
  },

  rejectFriendRequest: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      await axios.post("/api/friends/reject", { friendId: userId });
      set({ isLoading: false });
    } catch (error) {
      set({ error: "Failed to reject friend request", isLoading: false });
    }
  },

  unfriend: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      await axios.post("/api/friends/unfriend", { friendId: userId });
      get().getFriends();
    } catch (error) {
      set({ error: "Failed to unfriend", isLoading: false });
    }
  },
}));

export default useStore;
