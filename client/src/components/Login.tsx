import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style/login.css';
function Login() {
  const email = useRef<string | any>('');
  const password = useRef<string | any>('');
  const [error, setError] = useState<string | any>('');
  const navigate = useNavigate();
  useEffect(() => {
    //function that check if the user is logged in before
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts: any = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    if (getCookie('accessToken')) {
      const config = {
        headers: { Authorization: `Bearer ${getCookie('accessToken')}` },
      };
      axios
        .post('http://localhost:5000/login', {}, config)
        .then(res => {
          console.log(res);
          navigate('/HomePage');
        })
        .catch(err => {
          console.log(err.response.data.error);
        });
    }
  }, []);
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<any> => {
    try {
      e.preventDefault();
      console.log(email.current.value);
      console.log(password.current.value);
      const res = await axios.post('http://localhost:5000/login', {
        email: email.current.value,
        password: password.current.value,
      });
      document.cookie =
        'accessToken' + '=' + res.data.accessToken + ';expires=' + '120';
      navigate('/HomePage');
    } catch (err: any) {
      console.log(err.response.data.error);
      setError(err.response.data.error);
    }
  };
  return (
    <div className="loginDiv">
      <div className="shape"></div>
      <div className="shape"></div>
      <form className="loginForm" onSubmit={e => handleSubmit(e)}>
        <input type="text" placeholder="email " ref={email} required={true} />
        <input
          type="password"
          placeholder="password"
          ref={password}
          required={true}
        />
        <button type="submit">Login</button>
      </form>
      <div className="errorMessage">{error}</div>
      <button
        className="loginOptionsButtons"
        type="button"
        onClick={() => navigate('/forgetpassword')}
      >
        forget password
      </button>
      <button
        className="loginOptionsButtons"
        type="button"
        onClick={() => navigate('/register')}
      >
        register ?
      </button>
    </div>
  );
}

export default Login;
