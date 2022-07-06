import { useEffect, useRef } from 'react';
import { changePos } from '../reducer/actions/action';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { postions } from '../service/servicesfunc';
import positionsPhoto from '../photos/positions.jpg';

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const baseUrl = useSelector((state: any) => state.baseUrl);
  const user = useSelector((state: any) => state.user);

  const newPos = useRef<string | any>('');

  useEffect((): any => {
    newPos.current.value = user.position;
  }, []);
  useEffect(() => {
    if (!document.cookie || !user) {
      navigate('/');
    }
  });

  const changePosition = async () => {
    try {
      await axios.put(`${baseUrl}/api/getUser/changposition`, {
        newPosition: newPos.current.value,
        email: user.email,
      });
      dispatch(changePos(newPos.current.value));
    } catch (err: any) {
      console.log(err.response.data.error);
    }
  };
  return (
    <div className="profile">
      {user && (
        <div className="details">
          <p> Name : {user.fullName}</p>
          <p> Email : {user.email}</p>
          <p>
            Position :{' '}
            <select ref={newPos} onChange={changePosition}>
              {postions.map((position: string) => {
                return <option value={position}>{position}</option>;
              })}
            </select>
          </p>
          <div className="">
            <img src={positionsPhoto} alt="postions" style={{ width: '20%' }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
