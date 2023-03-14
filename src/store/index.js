import { create } from 'zustand'

const useStore = create((set) => ({
  isLoggedIn: false,
  isLoadingRequest: false,

  actions: {
    setIsLoggedIn: (_isLoggedIn) => { set({ isLoggedIn: _isLoggedIn }) },
    setIsLoadingRequest: (isLoading) => set({ isLoadingRequest: isLoading }),
  }
}));

export default useStore;