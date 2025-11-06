import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import usePageTitle from '../hooks/usePageTitle';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Profile() {
  usePageTitle('Profile');
  const { logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get('/user/profile', {
          withCredentials: true // Important for sending cookies
        });
        console.log('Profile data:', data);
        setUserData(data.data.user);
      } catch (err) {
        console.error('Profile fetch error:', err);

        if (err.response?.status === 401) {
          toast.error('Please login to access your profile');
          navigate('/login');
        } else {
          toast.error('Failed to fetch profile data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.get('/user/logout', {}, { withCredentials: true });
      logout(); // Clear user data in context
      toast.success('Logged out successfully');
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
      toast.error('Failed to logout');
    }
  };



  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="alert alert-danger">
          Failed to load profile data. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">User Profile</h3>
            </div>
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-md-4 text-center">
                  <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '120px', height: '120px', margin: '0 auto' }}>
                    <i className="bi bi-person-fill" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
                  </div>
                </div>
                <div className="col-md-8">
                  <h4>{userData.name}</h4>
                  <p className="text-muted mb-1">
                    <i className="bi bi-envelope me-2"></i>
                    {userData.email}
                  </p>
                  <p className="text-muted mb-1">
                    <i className="bi bi-calendar-check me-2"></i>
                    Member since: {new Date(userData.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-muted">
                    <i className="bi bi-shield-check me-2"></i>
                    Status: {userData.isEmailVerified ? (
                      <span className="text-success">Verified</span>
                    ) : (
                      <span className="text-warning">Not Verified</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button
                  onClick={handleLogout}
                  className="btn btn-danger me-md-2"
                >
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </button>
                <Link
                  to="/profile/edit"
                  className="btn btn-primary">
                  <i className="bi bi-pencil-square me-2"></i>
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
