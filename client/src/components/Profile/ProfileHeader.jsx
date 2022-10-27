import profileImg from '../../Pictures/person-circle.svg';
import ProfileStats from './ProfileStats';

function ProfileHeader() {
  return (
    <div className="bg-slate-200 relative pb-[260px]">
      <div className="bg-black sm:h-60 h-[150px]"></div>
      <div className="flex justify-between w-full items-center sm:items-end flex-col sm:flex-row px-5 sm:px-10 py-6 absolute top-2 sm:top-16">
        <div className="flex items-center flex-col sm:flex-row">
          <div className="p-1">
            <div className=''> 
            <img
              src={profileImg}
              alt="profileImage"
              className="block rounded-sm bg-white p-2"
            />
            </div>
            <button className="w-full py-2 mt-4 mb-2 text-black bg-pink-400 border-2 border-black rounded-sm">
              EDIT PROFILE
            </button>
          </div>

          <div className="sm:text-start text-center">
            <h2 className="text-md text-black sm:text-white ml-2 mb-3">
              Admin Profile
              <span className="block">Delhi</span>
            </h2>
          </div>
        </div>

        <div className="flex">
          <ProfileStats 
          stat={254}
          name='Counselors'
          />
          <ProfileStats 
          stat={254}
          name='Leads'
          />
          <ProfileStats 
          stat={254}
          name='Pending Leads'
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
