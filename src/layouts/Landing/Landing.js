import { UserAndRecordsContext } from 'contexts/UserAndRecordsContext';
import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import './landing.css';

export default function Landing() {
  const history = useHistory();
  const baseURL = process.env.REACT_APP_BASE_URL;

  const createUser = (name, role) => {
    const postURL = `${baseURL}users`;
    axios
      .post(postURL, {
        name,
        role,
        credit: 5000000,
      })
      .then((res) => {
        if (res.status === 201) {
          localStorage.setItem('currentUser', res.data.id);
          history.push('/admin');
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const handleRouting = (fullName, userType) => {
    createUser(fullName, userType);
  };
  return (
    <UserAndRecordsContext.Consumer>
      {({ changeUser }) => (
        <div className='whoIsWatching'>
          <div className='logo-section'>
            <h1 style={{ color: '#fff' }}>ARDHILETU</h1>
          </div>

          <div className='main-div'>
            <h2 style={{ color: '#fff' }}>Who's logging in?</h2>
            <div className='memberDiv'>
              <div className='user-btn'>
                <button
                  className='btn'
                  onClick={() => handleRouting('Anthony Kimani', 'admin')}
                ></button>
                <span>Admin</span>
              </div>
              <div className='user-btn'>
                <button
                  className='btn btn-2'
                  onClick={() => handleRouting('Linton Wambua', 'buyer')}
                ></button>
                <span>Buyer</span>
              </div>
              <div className='user-btn'>
                <button
                  className='btn btn-3'
                  onClick={() => handleRouting('Mary Waithaka', 'seller')}
                ></button>
                <span>Seller</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </UserAndRecordsContext.Consumer>
  );
}
