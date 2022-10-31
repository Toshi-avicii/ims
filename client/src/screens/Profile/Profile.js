import React, { useEffect, useState } from 'react';
import AdminNav from '../../components/AdminNav';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import Sidebar from '../../components/Sidebar';
import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { useGetUserProfileQuery } from '../../store/services/authService'

function Profile() {
  const [sideBar, setSidebar] = useState('-left-64');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    photo: '',
    role: '',
  });

  const openSidebar = () => {
    setSidebar('-left-0');
  }

  const closeSidebar = () => {
    setSidebar('-left-64');
  }

  const token = useSelector(state => state.authReducer.adminToken);
  const decode = jwtDecode(token);
  const userId = decode.id;

  const { data, isFetching } = useGetUserProfileQuery(userId);
  console.log(data)
  useEffect(() => {
    if(!isFetching) {
      setUserData({
        name: data.data.name,
        email: data.data.email,
        photo: data.data.photo,
        role: data.data.role
      });
    }
  },[data, isFetching])
  
  // useEffect(() => {
  //   const fetchDataByLoginUserId = async () => {
  //     try {
  //       const req = await fetch(`http://localhost:5000/api/profile/${userId}`, {
  //         method: "GET"
  //       });
  
  //       const result = await req.json();
  //       setUserData(result.data);
  
  //     } catch (err) {
  //       console.log(err.message);      
  //     }
  //   }
  //   fetchDataByLoginUserId();
  // }, [userId]);


  return (
    <>
      <div className=''>
      <Sidebar side={sideBar} closeSidebar={closeSidebar} />
      <AdminNav openSidebar={openSidebar} />
        <section className='ml-0 sm:ml-64 bg-white min-h-screen pt-24 sm:pt-4 px-4 sm:px-4'>
        <ProfileHeader userData={userData} />
        </section>
      </div>
    </>
  )
}

export default Profile