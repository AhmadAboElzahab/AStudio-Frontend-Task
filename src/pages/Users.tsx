import React, { useEffect, useState } from 'react';
import { UserData, User } from '../types/type';
import customAxios from '../lib/axios';
import Table from '../components/Table';

export default function Users() {
  const [users, setUsers] = useState<UserData>({ users: [], total: 0, skip: 0, limit: 0 });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await customAxios.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

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
        data={users.users}
        renderRow={renderUserRow}
      />
    </div>
  );
}
