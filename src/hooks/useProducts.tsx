import { UsersContext } from '../context/userContext';
import { useContext } from 'react';

export const useUserContext = () => {
  const context = useContext(UsersContext);

  if (!context) {
    throw Error('useUsers must be used inside  Users Context');
  }

  return context;
};
