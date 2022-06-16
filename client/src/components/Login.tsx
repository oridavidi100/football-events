import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style/login.css';
import { useDispatch } from 'react-redux';
import { setUser } from '../reducer/actions/action';
import { getCookie } from '../service/servicesfunc';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
function Login() {
  const notyf = new Notyf();
  const dispatch = useDispatch();
  const email = useRef<string | any>('');
  const password = useRef<string | any>('');
  const navigate = useNavigate();
  useEffect(() => {
    //function that check if the user is logged in before

    if (getCookie('accessToken')) {
      const config = {
        headers: { Authorization: `Bearer ${getCookie('accessToken')}` },
      };
      axios
        .post('http://localhost:5000/api/login', {}, config)
        .then(res => {
          dispatch(setUser(res.data));
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
      const res = await axios.post('http://localhost:5000/api/login', {
        email: email.current.value,
        password: password.current.value,
      });

      dispatch(setUser(res.data.body));
      document.cookie =
        'accessToken' + '=' + res.data.accessToken + ';expires=' + '120';
      navigate('/HomePage');
    } catch (err: any) {
      console.log(err.response.data.error);
      notyf.error(err.response.data.error);
    }
  };
  return (
    <div className="loginDiv">
      <div className="shape"></div>
      <div className="login">
        <form className="loginForm" onSubmit={e => handleSubmit(e)}>
          <input
            type="text"
            placeholder="email "
            ref={email}
            required={true}
            className="inputL"
          />
          <input
            className="inputL"
            type="password"
            placeholder="password"
            ref={password}
            required={true}
          />
          <button type="submit" className="buttonl">
            Login
          </button>
        </form>
        <button
          className="buttonl"
          type="button"
          onClick={() => navigate('/forgetpassword')}
        >
          forget password
        </button>
        <button
          className="buttonl"
          type="button"
          onClick={() => navigate('/register')}
        >
          register ?
        </button>
      </div>
    </div>
  );
}

export default Login;
