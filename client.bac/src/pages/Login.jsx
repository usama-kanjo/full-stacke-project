import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import usePageTitle from '../hooks/usePageTitle';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Login() {
  usePageTitle('Login');
  const { login } = useContext(AuthContext);
  const [Data, setData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!Data.email || !Data.password) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const { email, password } = Data;
      const { data } = await axios.post('/user/login', { email, password });
      login(data.data.user);

      if (data.data.user.isEmailVerified === false) {
        const message = 'Please verify your email first. Check your inbox!';
        setErrorMessage(message);
        toast.error(message);
        return;
      }
      toast.success('Login successful!');
      navigate('/user/home');
    } catch (err) {
      console.error('Login error:', err);
      const message = (err.response?.data?.errors && err.response.data.errors[0]?.msg) ||
        err.message || 'Login failed. Please check your credentials and try again.';
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary min-vh-100 p-3">
      <div className="bg-white p-3 rounded w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleSubmit}>
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

          {errorMessage === 'Please verify your email first. Check your inbox!' && (
            <div className="alert alert-warning mb-3">
              <p className="mb-1">Your email is not verified.</p>
              <p className="mb-0">
                Check your inbox or <Link to="/resend-verification" className="alert-link">resend verification email</Link>
              </p>
            </div>
          )}

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

          <button
            type="submit"
            className="btn btn-success w-100 rounded-0 mb-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Logging in...
              </>
            ) : 'Login'}
          </button>

          <p className="text-center mb-2">Don't have an account?</p>
          <Link 
            to="/register" 
            className="btn btn-outline-secondary w-100 rounded-0 text-decoration-none"
          >
            Register
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;