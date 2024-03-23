import React from 'react';
import { useUserContext } from '../hooks/useUsers';

export default function PageSize() {
  const { state: usersData, dispatch: usersDispatch } = useUserContext();

  return (
    <div>
      <select
        value={usersData.size}
        onChange={(e) => {
          usersDispatch({ type: 'SET_SIZE', payload: e.target.value });
          usersDispatch({ type: 'SET_SKIP', payload: 0 });
        }}
      >
        <option value='5'>5</option>
        <option value='10'>10</option>
        <option value='20'>20</option>
        <option value='30'>30</option>
      </select>
    </div>
  );
}
