import { UsersContext } from '../context/usersContex';
import { useContext } from 'react';

export const useUserContextContext = () => {
  const context = useContext(UsersContext);

  if (!context) {
    throw Error('useUsers must be used inside  Users Context');
  }

  return context;
};