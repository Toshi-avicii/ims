import React, { useEffect, useState } from 'react';
import AdminNav from '../../components/AdminNav';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import Sidebar from '../../components/Sidebar';
import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';

function Profile() {
  const [sideBar, setSidebar] = useState('-left-64');
  const openSidebar = () => {
    setSidebar('-left-0');
  }

  const closeSidebar = () => {
    setSidebar('-left-64');
  }

  const token = useSelector(state => state.authReducer.adminToken);
  const decode = jwtDecode(token);
  console.log(decode)
  const userId = decode.id;
  console.log(userId);

  useEffect(() => {
    const fetchDataByLoginUserId = async () => {
      try {
        const req = await fetch(`http://localhost:5000/api/profile/${userId}`, {
          method: "GET"
        });
  
        console.log(req)
        const result = await req.json();
        console.log(result);
  
      } catch (err) {
        console.log(err.message);      
      }
    }
    fetchDataByLoginUserId();
  }, []);

  return (
    <>
      <div className=''>
      <Sidebar side={sideBar} closeSidebar={closeSidebar} />
      <AdminNav openSidebar={openSidebar} />
        <section className='ml-0 sm:ml-64 bg-white min-h-screen pt-24 sm:pt-4 px-4 sm:px-4'>
        <ProfileHeader />
        </section>
      </div>
    </>
  )
}

export default Profile