import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function Signup() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    axios.post('/user', { name, email, password })
      .then(result => {
        console.log(result)
        toast.success('Registration successful! Please login.')
        navigate('/login')
      })
      .catch(err => {
        console.error(err)

        // Hata mesajı için kapsamlı kontrol
        let errorMessage = 'Registration failed. Please try again.';

        if (err.response) {
          // Backend'den gelen özel hata mesajı
          errorMessage = err.response.data?.message ||
            err.response.data?.error?.message ||
            err.response.data?.errors?.msg ||
            err.response.data?.errors?.[0]?.msg ||
            err.response.data?.error ||
            err.response.statusText;
        } else if (err.message) {
          errorMessage = err.message;
        }
        toast.error(errorMessage);
        //Registration failed. Please try again.
      })
  }


  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Name</strong>
            </label>
            <input type="text" placeholder="Enter name" autoComplete="off" name="name" className="form-control rounded-0" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input type="email" placeholder="Enter Email" autoComplete="off" name="email" className="form-control rounded-0" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Password</strong>
            </label>
            <input type="password" placeholder="Enter Password" name="password" className="form-control rounded-0" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">Register</button>
          <p>Already Have an Acount</p>
          <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Login</Link>
        </form>
      </div>
    </div >
  );
};

export default Signup;
