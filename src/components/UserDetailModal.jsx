import '../styles/UserDetailModal.css';

const UserDetailModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{user.name}</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Website:</strong> {user.website}</p>

        <h4>Address</h4>
        <p>
          {user.address.street}, {user.address.suite},<br />
          {user.address.city} - {user.address.zipcode}
        </p>
        <p><strong>Geo:</strong> {user.address.geo.lat}, {user.address.geo.lng}</p>

        <h4>Company</h4>
        <p><strong>Name:</strong> {user.company.name}</p>
        <p><em>{user.company.catchPhrase}</em></p>
        <p>{user.company.bs}</p>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default UserDetailModal;
