import { useState } from 'react';
import api from '../api/axiosConfig';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/register', {
        firstName,
        lastName,
        email,
        password,
      });

      // Handle the response as needed
      console.log(response.data);
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
