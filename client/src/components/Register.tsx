import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Register() {
  const navigate = useNavigate();
  const email = useRef<string | any>('');
  const position = useRef<string | any>('');
  const password = useRef<string | any>('');
  const nameOfPet = useRef<string | any>('');
  const fullName = useRef<string | any>('');
  const [error, setError] = useState<string | any>('');
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<any> => {
    try {
      e.preventDefault();
      const res = await axios.post('http://localhost:5000/register', {
        email: email.current.value,
        position: position.current.value,
        password: password.current.value,
        nameOfPet: nameOfPet.current.value,
        fullName: fullName.current.value,
      });
      console.log(res.data);
      navigate('/');
    } catch (err: any) {
      setError(err.response.data.error);
    }
  };
  return (
    <div className="loginDiv">
      <form onSubmit={e => handleSubmit(e)}>
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
        <input
          className="inputL"
          type="text"
          placeholder="position"
          ref={position}
          required={true}
        />
        <input
          className="inputL"
          type="text"
          placeholder="fullName"
          ref={fullName}
          required={true}
        />
        <input
          className="inputL"
          type="password"
          placeholder="password"
          ref={password}
          required={true}
        />
        <button type="submit" className="buttonl">
          register{' '}
        </button>
      </form>
      <div className="errmessage">{error}</div>
      <button type="button" onClick={() => navigate('/')} className="buttonl">
        login
      </button>
    </div>
  );
}

export default Register;
