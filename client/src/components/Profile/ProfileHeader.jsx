import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import profileImg from '../../Pictures/person-circle.svg';
import ProfileStats from './ProfileStats';

function ProfileHeader({ userData }) {
  const userImg = useSelector(state => state.profileReducer.photo);
  return (
    <div className="bg-slate-200">
      <div className="bg-black sm:h-50 h-[180px] rounded-t-md"></div>
      <div className="flex -mt-[180px] relative justify-between items-center md:items-end flex-col sm:flex-col md:flex-row w-full px-5 sm:px-10 py-8 sm:py-10">
        <div className="flex items-center flex-col md:flex-row p-1">
          <div className="w-[180px] h-[230px] border-t-2 border-l-2 border-r-2 border-white rounded-md flex flex-col justify-between">
            <div className='w-full'>
            <img
            // userData.photo ? `http://localhost:5000/${userData.photo}` : 
              src={userImg ? userImg : profileImg}
              alt="profileImage"
              className="block w-full bg-white p-1"
            />
            </div>
            <button className="w-full py-2 text-black border-2 border-black rounded-sm">
              <Link to='/dashboard/profile/edit-profile'>EDIT PROFILE</Link>
            </button>
          </div>

          <div className="text-center lg:text-start md:absolute md:top-[80px] md:right-11 lg:static">
            <h2 className="text-lg text-black md:text-white lg:w-min ml-2 mb-2">
              {userData.name}
            </h2>
          </div>
        </div>

        <div className="bg-primary p-2 rounded-md">
          <ProfileStats 
          stat={`Email: ${userData.email}`}
          name={''}
          />
          <ProfileStats 
          stat={`Role: ${userData.role}`}
          name={''}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
