import { Store } from '@tanstack/store';
import { useStore } from '@tanstack/react-store';
import { UserAuth } from '@/types/userAuth.type';
interface TState {
  userAuth: UserAuth | null;
}

const initialState: TState = {
  userAuth: null,
};

export const store = new Store<TState>(initialState);

export const setStore = (state: Partial<TState>) => {
  store.setState((prevState) => ({
    ...prevState,
    ...state,
  }));
};

export const useStoreSelector = <T,>(selector: (state: TState) => T): T => {
  return useStore(store, selector);
};
