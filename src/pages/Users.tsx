import { useEffect, useState } from 'react';
import { User } from '../types/type';
import Table from '../components/Table';
import { useUserContext } from '../hooks/useUsers';
import customAxios from '../lib/axios';
import PageSize from '../components/PageSize';

import Pagination from '../components/Pagination';
import Search from '../components/Search';

export default function Users() {
  const { state: usersData, dispatch: usersDispatch } = useUserContext();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await customAxios.get(
          `/users?limit=${searchValue ? 0 : usersData.size}&skip=${searchValue ? 0 : (usersData.skip - 1) * (usersData.size ?? 5)}`,
        );
        usersDispatch({ type: 'SET_USERS', payload: response.data });
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [searchValue, usersData.skip, usersData.size, usersDispatch]);

  const onPageSizeChange = (newSize: string) => {
    usersDispatch({ type: 'SET_SIZE', payload: newSize });
    usersDispatch({ type: 'SET_SKIP', payload: 0 });
  };

  const renderUserRow = (user: User) => {
    return (
      <>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.maidenName}</td>
        <td>{user.age}</td>
        <td>{user.gender}</td>
        <td>{user.email}</td>
        <td>{user.username}</td>
        <td>{user.bloodGroup}</td>
        <td>{user.eyeColor}</td>
      </>
    );
  };

  const totalPages = Math.ceil(100 / (usersData.size ?? 5));
  const handlePageChange = (page: number) => {
    usersDispatch({ type: 'SET_SKIP', payload: page });
  };
  const filteredUsers = usersData.users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.username.toLowerCase().includes(searchValue.toLowerCase()),
  );
  const handleSearchChange = (newValue: string) => {
    setSearchValue(newValue);
  };
  return (
    <div>
      <div className='flex gap-4 my-10'>
        {!searchValue ? (
          <PageSize data={usersData.size ?? 5} onPageSizeChange={onPageSizeChange} />
        ) : (
          ''
        )}

        <Search value={searchValue} onChange={handleSearchChange} />
      </div>
      <Table
        headers={[
          'First Name',
          'Last Name',
          'Maiden Name',
          'Age',
          'Gender',
          'Email',
          'Username',
          'Bloodgroup',
          'EyeColor',
        ]}
        data={!filteredUsers ? usersData.users : filteredUsers}
        renderRow={renderUserRow}
      />
      {!searchValue ? <Pagination totalPages={totalPages} onPageChange={handlePageChange} /> : ''}
    </div>
  );
}
