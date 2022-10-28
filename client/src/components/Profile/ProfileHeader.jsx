import profileImg from '../../Pictures/person-circle.svg';
import ProfileStats from './ProfileStats';

function ProfileHeader() {
  return (
    <div className="bg-slate-200">
      <div className="bg-black sm:h-50 h-[180px] rounded-t-md"></div>
      <div className="flex -mt-[180px] relative justify-between items-center md:items-end flex-col sm:flex-col md:flex-row w-full px-5 sm:px-10 py-8 sm:py-10">
        <div className="flex items-center flex-col md:flex-row  p-1">
          <div className="">
            <div className=''> 
            <img
              src={profileImg}
              alt="profileImage"
              className="block rounded-sm bg-white p-2"
            />
            </div>
            <button className="w-full py-2 mt-4 mb-2 text-black border-2 border-black rounded-sm">
              EDIT PROFILE
            </button>
          </div>

          <div className="text-center lg:text-start md:absolute md:top-[80px] md:right-10 lg:static">
            <h2 className="text-md text-black md:text-white ml-2 mb-3 w-max">
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
