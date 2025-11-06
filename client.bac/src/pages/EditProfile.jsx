import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


function EditProfile() {
  const [userData, setUserData] = useState({
    name: '',
    email: ''
  });
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Mevcut kullanıcı bilgilerini yükle
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('/user/profile');
        setUserData({
          name: data.data.user.name,
          email: data.data.user.email
        });
      } catch (err) {
        toast.error('Failed to load profile data');
        navigate('/user/profile');
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.put('/user/profile', userData);
      toast.success('Profile updated successfully');

      // Email değiştiyse kullanıcıyı uyar
      if (data.data.user.isEmailVerified === false) {
        toast('Please verify your new email address', { icon: '✉️' });
      }
      login(data.data.user);
      navigate('/user/home');
    } catch (err) {
      console.error('Update error:', err);
      const errorMessage = err.response?.data?.message || 'Update failed';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Edit Profile</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                    type="button"
                    className="btn btn-secondary me-md-2"
                    onClick={() => navigate('/user/home')}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update Profile'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
