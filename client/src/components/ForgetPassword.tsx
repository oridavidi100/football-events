import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
function ForgetPassword() {
  const email = useRef<string | any>('');
  const password = useRef<string | any>('');
  const nameOfPet = useRef<string | any>('');
  const notyf = new Notyf();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/login/forgetPassword', {
        email: email.current.value,
        nameOfPet: nameOfPet.current.value,
        newPassword: password.current.value,
      });
      navigate('/');
    } catch (err: any) {
      console.log(err.response.data.error);
      notyf.error(err.response.data.error);
    }
  };
  return (
    <div className="loginDiv">
      <div className="login">
        <form onSubmit={e => handleSubmit(e)}>
          <input
            type="text"
            placeholder="email"
            className="inputL"
            ref={email}
            required={true}
          />
          <input
            type="text"
            placeholder="new password"
            className="inputL"
            ref={password}
            required={true}
          />
          <input
            type="text"
            placeholder="name of your pet"
            className="inputL"
            ref={nameOfPet}
            required={true}
          />
          <button type="submit" className="buttonl">
            change password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
