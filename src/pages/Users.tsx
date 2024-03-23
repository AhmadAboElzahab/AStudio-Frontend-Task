import React, { useEffect, useState } from 'react';
import { User } from '../types/type';
import Table from '../components/Table';
import { useUserContext } from '../hooks/useUsers';
import customAxios from '../lib/axios';
import PageSize from '../components/PageSize';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';

export default function Users() {
  const { state: usersData, dispatch: usersDispatch } = useUserContext();
  const [skip, setSkip] = useState(0);
  const numbers: any = [];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await customAxios.get(
          `/users?limit=${usersData.size}&skip=${skip * (usersData.size ?? 5)}`,
        );
        usersDispatch({ type: 'SET_USERS', payload: response.data });
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [skip, usersData.size, usersDispatch]);

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

  const totalPages = Math.ceil(100 / (usersData.size ?? 5));

  const generatePageNumbers = () => {
    const maxVisiblePages = 5;
    const currentPage = skip + 1;
    const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);
    let start = currentPage - halfMaxVisiblePages;
    let end = currentPage + halfMaxVisiblePages;

    if (start <= 0) {
      start = 1;
      end = maxVisiblePages;
    } else if (end > totalPages) {
      end = totalPages;
      start = end - maxVisiblePages + 1;
    }

    for (let i = start; i <= end; i++) {
      numbers.push(i);
    }

    return { start, end };
  };

  const { start, end } = generatePageNumbers();

  const goToPreviousPage = () => {
    if (skip > 0) {
      setSkip(skip - 1);
    }
  };

  const goToNextPage = () => {
    if (skip < totalPages - 1) {
      setSkip(skip + 1);
    }
  };

  return (
    <div>
      <PageSize />
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
        data={usersData.users}
        renderRow={renderUserRow}
      />
      <div className='flex justify-center p-10'>
        <button
          className={`mr-2 h-10 pb-5 ${skip === 0 ? 'hidden' : ''} `}
          onClick={goToPreviousPage}
          disabled={skip === 0}
        >
          <FaLongArrowAltLeft />
        </button>
        {start > 1 && (
          <>
            <span className='mr-2' onClick={() => setSkip(0)}>
              1
            </span>
            <span className='mr-2'>...</span>
          </>
        )}
        {numbers.map((num: number) => (
          <span
            key={num}
            className={`mr-10${num === skip + 1 ? ' font-bold text-lg scale-125  h-10 pb-20 ' : ''}`}
            onClick={() => setSkip(num - 1)}
          >
            {num}
          </span>
        ))}
        {end < totalPages && (
          <>
            <span className='mr-2'>...</span>
            <span onClick={() => setSkip(totalPages - 1)}>{totalPages}</span>
            <button
              className={`ml-2 h-10 pb-5 ${skip === totalPages - 1 ? 'hidden' : ''} `}
              onClick={goToNextPage}
              disabled={skip === totalPages - 1}
            >
              <FaLongArrowAltRight />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
