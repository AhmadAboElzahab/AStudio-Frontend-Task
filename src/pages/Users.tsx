import { useEffect, useState } from 'react';
import { User } from '../types/type';
import Table from '../components/Table';
import { useUserContext } from '../hooks/useUsers';
import customAxios from '../lib/axios';
import PageSize from '../components/PageSize';
import Pagination from '../components/Pagination';
import Search from '../components/Search';
import FilterOption from '../components/Filters';

export default function Users() {
  const { state: usersData, dispatch: usersDispatch } = useUserContext();
  const [searchValue, setSearchValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const filters = ['firstName', 'Email', 'Birthdate', 'Gender'];
  const totalPages = Math.ceil(100 / (usersData.size ?? 5));

  const handlePageChange = (page: number) => {
    usersDispatch({ type: 'SET_SKIP', payload: page });
  };
  const handleSearchChange = (newValue: string) => {
    setSearchValue(newValue);
  };
  const handleCheckboxChange = (event: any) => {
    const value = event.target.value;
    setSelectedOption(value === selectedOption ? null : value);
  };
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
        <td>{user.university}</td>
        <td>{user.birthDate}</td>
        <td>{user.phone}</td>
      </>
    );
  };

  const filteredUsers = usersData.users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.maidenName.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.age.toString().toLowerCase().includes(searchValue.toLowerCase()) ||
      user.gender.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.bloodGroup.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.eyeColor.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.university.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.birthDate.toLowerCase().includes(searchValue.toLowerCase()),
  );
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let apiUrl = `/users?limit=${usersData.size}&skip=${(usersData.skip - 1) * (usersData.size ?? 5)}`;
        if (selectedOption) {
          apiUrl = `/users/filter?key=${selectedOption}&value=${searchValue}&limit=${usersData.size}&skip=${(usersData.skip - 1) * (usersData.size ?? 5)}`;
        }
        const response = await customAxios.get(apiUrl);
        usersDispatch({ type: 'SET_USERS', payload: response.data });
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [selectedOption, searchValue, usersData.skip, usersData.size, usersDispatch]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let apiUrl = `/users?limit=${usersData.size}&skip=${(usersData.skip - 1) * (usersData.size ?? 5)}`;
        if (selectedOption) {
          apiUrl = `/users/filter?key=${selectedOption}&value=${searchValue}&limit=${usersData.size}&skip=${(usersData.skip - 1) * (usersData.size ?? 5)}`;
        }
        const response = await customAxios.get(apiUrl);
        usersDispatch({ type: 'SET_USERS', payload: response.data });
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [selectedOption, searchValue, usersData.skip, usersData.size, usersDispatch]);

  return (
    <div>
      <div className='flex gap-4 my-10'>
        <PageSize data={usersData.size ?? 5} onPageSizeChange={onPageSizeChange} />
        <Search value={searchValue} onChange={handleSearchChange} />
        <FilterOption
          filters={filters}
          selectedOption={selectedOption}
          handleCheckboxChange={handleCheckboxChange}
        />
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
          'university',
          'birthDate',
          'phone',
        ]}
        data={!filteredUsers ? usersData.users : filteredUsers}
        renderRow={renderUserRow}
      />
      <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}
