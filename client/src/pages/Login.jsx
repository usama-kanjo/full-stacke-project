import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function Login() {
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false); // Yükleme durumu
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    //const { email, password } = data;
    //axios.post('/user/login', { email, password })
    //  .then(result => {
    //    console.log(result)
    //    toast.success('Login successful!')
    //    navigate('/home')
    //  })
    //  .catch(err => {
    //    console.error(err)
    //    
    //    toast.error('Login failed. Please try again.')
    //  })
    try {
      const { email, password } = data;
      const { resData } = await axios.post('/user/login', { email, password });
      // localStorage.setItem('token', resData.token);
      toast.success('Login successful!');
      navigate('/home');
    } catch (err) {
      console.error('Login error:', err);

      // Kapsamlı hata mesajı yönetimi
      const errorMessage = err.response?.data?.message ||
        err.response?.data?.error ||
        (err.response?.data?.errors && err.response.data.errors[0]?.msg) ||
        err.message ||
        'Login failed. Please check your credentials and try again.';

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} >
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input type="email" placeholder="Enter Email" autoComplete="off" name="email" className="form-control rounded-0" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input type="password" placeholder="Enter Password" name="password" className="form-control rounded-0" onChange={(e) => setData({ ...data, password: e.target.value })} />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0" disabled={loading} >{loading ? 'Logging in...' : 'Login'}</button>
          <p>Don't have an account?</p>
          <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Register</Link>
        </form>
      </div>
    </div >
  );
};

export default Login;
