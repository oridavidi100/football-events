import React, { useEffect, useRef, useState } from 'react';
import { changePos } from '../reducer/actions/action';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const axios = require('axios');

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const newPos = useRef<string | any>('');

  useEffect(() => {
    if (!document.cookie || !user) {
      navigate('/');
    }
  });

  const changePosition = async () => {
    try {
      const res = await axios.put(
        'http://localhost:5000/getUser/changposition',
        {
          newPosition: newPos.current.value,
          email: user.email,
        }
      );
      dispatch(changePos(newPos.current.value));
      newPos.current.value = '';
      console.log(user);
    } catch (err: any) {
      console.log(err.response.data.error);
    }
  };
  return (
    <div>
      ProfilePage
      {user && (
        <div>
          <p>{user.fullName}</p>
          <p>{user.email}</p>
          <p>{user.position}</p>
          <input
            ref={newPos}
            type="text"
            required={true}
            placeholder="new position "
          />
          <button type="button" onClick={changePosition}>
            change position
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
