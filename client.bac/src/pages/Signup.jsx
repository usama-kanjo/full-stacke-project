import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import usePageTitle from '../hooks/usePageTitle';

function Signup() {
  usePageTitle('Signup');
  const [Data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Data.email || !Data.password || !Data.name) {
      toast.error('Please fill all fields');
      return;
    }
    if (Data.password !== Data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const { name, email, password } = Data;
      const { data } = await axios.post('/user/register', { name, email, password })
      toast.success('Registration successful! Please check your email for verification.')
      navigate('/login')
    } catch (err) {
      console.error('Signup error:', err)
      const errorMessages = err.response?.data?.errors?.map(error => error.msg)
        || [err.response?.data?.message || 'Registration failed. Please try again.'];
      errorMessages.forEach(message => {
        toast.error(message);
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary min-vh-100 p-3">
      <div className="bg-white p-3 rounded w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter name"
              autoComplete="off"
              id="name"
              name="name"
              className="form-control rounded-0"
              value={Data.name}
              onChange={(e) => setData({ ...Data, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              id="email"
              name="email"
              className="form-control rounded-0"
              value={Data.email}
              onChange={(e) => setData({ ...Data, email: e.target.value })}
            />
          </div>
          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label">
              <strong>Password</strong>
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                id="password"
                name="password"
                className="form-control rounded-0"
                value={Data.password}
                onChange={(e) => setData({ ...Data, password: e.target.value })}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <i className="bi bi-eye-slash"></i>
                ) : (
                  <i className="bi bi-eye"></i>
                )}
              </button>
            </div>
          </div>
          <div className="mb-3 position-relative">
            <label htmlFor="confirmPassword" className="form-label">
              <strong>Confirm Password</strong>
            </label>
            <div className="input-group">
              <input
                type={showconfirmPassword ? "text" : "password"}
                placeholder="Enter Confirm Password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control rounded-0"
                value={Data.confirmPassword}
                onChange={(e) => setData({ ...Data, confirmPassword: e.target.value })}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowconfirmPassword(!showconfirmPassword)}
                aria-label={showconfirmPassword ? "Hide password" : "Show password"}
              >
                {showconfirmPassword ? (
                  <i className="bi bi-eye-slash"></i>
                ) : (
                  <i className="bi bi-eye"></i>
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-success w-100 rounded-0 mb-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Registering...
              </>
            ) : 'Register'}
          </button>
          <p className="text-center mb-2">Already Have an Account</p>
          <Link
            to="/login"
            className="btn btn-outline-secondary w-100 rounded-0 text-decoration-none"
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
