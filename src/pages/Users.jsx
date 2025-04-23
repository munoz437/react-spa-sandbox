import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import UserDetailModal from '../components/UserDetailModal';
import '../styles/Users.css';

const Users = () => {
  const { users, selectedUser, setSelectedUser } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="users-page">
      <h2>User List</h2>
      <ul>
        {currentUsers.map(user => (
          <li key={user.id} onClick={() => handleUserClick(user)}>
            <strong>{user.name}</strong> — {user.email}
          </li>
        ))}
      </ul>

      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            className={idx + 1 === currentPage ? 'active' : ''}
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      <UserDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
};

export default Users;
