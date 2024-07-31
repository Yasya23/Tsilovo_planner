import { Store } from '@tanstack/store';
import { useStore } from '@tanstack/react-store';

interface TState {
  isAuth: boolean;
}

const initialState: TState = {
  isAuth: false,
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
