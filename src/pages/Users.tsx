import { useEffect } from 'react';
import { User } from '../types/type';
import Table from '../components/Table';
import { useUserContext } from '../hooks/useUsers';
import customAxios from '../lib/axios';
import PageSize from '../components/PageSize';
export default function Users() {
  const { state: usersData, dispatch: usersDispatch } = useUserContext();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await customAxios.get('/users');
        usersDispatch({ type: 'SET_USERS', payload: response.data });
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [usersDispatch]);

  const renderUserRow = (user: User, index: number) => {
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

  return (
    <div>
      <PageSize />
      {
        <Table
          size={usersData?.size ?? 5}
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
          data={usersData.users}
          renderRow={renderUserRow}
        />
      }
    </div>
  );
}
