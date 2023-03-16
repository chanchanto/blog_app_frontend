import { create } from 'zustand'

const useStore = create((set) => ({
  isLoggedIn: false,
  isLoadingRequest: false,
  currentUser: {
    id: null,
    email: null
  },

  actions: {
    setIsLoggedIn: (_isLoggedIn) => { set({ isLoggedIn: _isLoggedIn }) },
    setIsLoadingRequest: (isLoading) => set({ isLoadingRequest: isLoading }),
    setCurrentUser: (user) => set({ currentUser: user }),
  }
}));

export default useStore;