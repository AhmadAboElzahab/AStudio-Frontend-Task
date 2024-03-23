import React, { createContext, useReducer } from 'react';
import { UserData } from '../types/type';

interface UsersContextType {
  state: UserData;
  dispatch: React.Dispatch<any>;
}

const initialState: UserData = {
  users: [],
  total: 0,
  skip: 0,
  limit: 5,
  size: 5,
};

export const UsersContext = createContext<UsersContextType>({
  state: initialState,
  dispatch: () => null,
});

export const usersReducer = (state: UserData, action: { type: string; payload: any }): UserData => {
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload.users,
      };
    case 'SET_TOTAL':
      return {
        ...state,
        total: action.payload,
      };

    case 'SET_LIMIT':
      return {
        ...state,
        limit: action.payload,
      };
    case 'SET_SIZE':
      return {
        ...state,
        size: action.payload,
      };
    case 'SET_SKIP':
      return {
        ...state,
        skip: action.payload,
      };

    default:
      return state;
  }
};

interface UsersContextProviderProps {
  children: React.ReactNode;
}

export const UsersContextProvider: React.FC<UsersContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, initialState);

  return <UsersContext.Provider value={{ state, dispatch }}>{children}</UsersContext.Provider>;
};
