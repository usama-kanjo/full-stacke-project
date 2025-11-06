import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function UserHome() {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mt-5">
      <h1>Hoş Geldiniz, {user?.name}</h1>
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">Kullanıcı Paneli</h5>
          <p className="card-text">
            Bu sizin kişisel kontrol panelinizdir.
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
