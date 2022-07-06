import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Notyf } from 'notyf';
import ballPic from '../photos/ball.png';
import { postions } from '../service/servicesfunc';

import 'notyf/notyf.min.css';
function Register() {
  const navigate = useNavigate();
  const baseUrl = useSelector((state: any) => state.baseUrl);
  const email = useRef<string | any>('');
  const position = useRef<string | any>('');
  const password = useRef<string | any>('');
  const nameOfPet = useRef<string | any>('');
  const fullName = useRef<string | any>('');
  const notyf = new Notyf();
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<any> => {
    try {
      e.preventDefault();
      const res = await axios.post(`${baseUrl}/api/register`, {
        email: email.current.value,
        position: position.current.value,
        password: password.current.value,
        nameOfPet: nameOfPet.current.value,
        fullName: fullName.current.value,
      });
      navigate('/');
    } catch (err: any) {
      notyf.error(err.response.data.error);
      console.log(err.response.data.error);
    }
  };
  return (
    <div className="loginDiv">
      <div className="webIntro">
        <div className="webIntroDiv">Ori's football app</div>
        <div>
          <img className="imgIntro" src={ballPic} alt="ssss" />
        </div>
      </div>
      <div className="login">
        <p className="loginIntro">Sign up</p>
        <form onSubmit={e => handleSubmit(e)}>
          <input
            className="inputL"
            type="text"
            placeholder="full name"
            ref={fullName}
            required={true}
          />
          <input
            type="text"
            placeholder="email "
            ref={email}
            required={true}
            className="inputL"
          />
          <input
            type="text"
            placeholder="name of your pet"
            ref={nameOfPet}
            required={true}
            className="inputL"
          />
          <span
            style={{
              color: 'white',
            }}
          >
            {' '}
            position :
          </span>
          <select ref={position}>
            {postions.map((position: string) => {
              return <option value={position}>{position}</option>;
            })}
          </select>
          <input
            className="inputL"
            type="password"
            placeholder="password"
            ref={password}
            required={true}
          />
          <button type="submit" className="buttonl" id="signUpBtn">
            Sign up
          </button>
        </form>
        <p>
          <span className="hasAccount">Already have an account ?</span>
          <button
            style={{
              marginTop: '0em',
              marginLeft: '1em',
              display: 'inline',
            }}
            className="buttonl"
            type="button"
            onClick={() => navigate('/')}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
