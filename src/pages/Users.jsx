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
    <div className="users-container">
      <div className="users-header">
        <h2 className="users-title">User List</h2>
        <p className="users-count">Total Users: {users.length}</p>
      </div>
      
      <div className="users-list">
        {currentUsers.map(user => (
          <div 
            key={user.id} 
            className="user-card"
            onClick={() => handleUserClick(user)}
          >
            <div className="user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <h3 className="user-name">{user.name}</h3>
              <p className="user-email">{user.email}</p>
            </div>
            <div className="user-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination-container">
          <button 
            className="pagination-button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          
          <div className="pagination-numbers">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                className={`pagination-number ${idx + 1 === currentPage ? 'active' : ''}`}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          
          <button 
            className="pagination-button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}

      <UserDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
};

export default Users;