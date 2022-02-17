import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
function ProfilePage() {
  const user = useSelector((state: any) => state.user);
  console.log(user, 'user');
  const navigate = useNavigate();
  return (
    <div>
      ProfilePage
      {user && (
        <div>
          <p>{user.fullName}</p>
          <p>{user.email}</p>
          <p>{user.position}</p>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
