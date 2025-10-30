import create from 'zustand';

type Profile = { id: string; name: string };
type User = { id: string; name: string; email?: string; profile?: Profile } | null;

type State = {
  user: User;
  setUser: (u: User) => void;
};

const useStore = create<State>((set) => ({
  user: null,
  setUser: (u) => set({ user: u })
}));

export default useStore;
