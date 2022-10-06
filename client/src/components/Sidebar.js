import React from 'react'
// import Logo from '../../public/logo192.png'
import { Link } from 'react-router-dom';

function Sidebar({ side, closeSidebar }) {

  
  return (
    <div className={`fixed top-0 ${side} sm:left-0 w-64 h-screen bg-slate-100 p-6 font-primary z-10 transition-all`}>
        <i className="bi bi-x-lg absolute top-4 right-4 font-semibold sm:hidden block cursor-pointer text-lg" onClick={closeSidebar}></i>
        <div className='p-4 flex justify-center items-center flex-col'>
            <img src="/logo192.png" alt="Company Logo" className='block w-16 mb-2' />
            <p>React Dashboard</p>
        </div>

        <ul>
            <li className='p-3 text-md font-medium cursor-pointer bg-white rounded-md mb-5'>
                <i className="bi bi-card-list mr-3 px-2 py-1 bg-primary text-xl text-white rounded"></i>
                <Link to="/dashboard/products">Products</Link>
            </li>

            <li className='p-3 text-md font-medium cursor-pointer bg-white rounded-md mb-5'>
                <i className="bi bi-bag-check-fill mr-3 px-2 py-1 bg-primary text-xl text-white rounded"></i>
                <Link to="/dashboard/products">Orders</Link>
            </li>

            <li className='p-3 text-md font-medium cursor-pointer bg-white rounded-md mb-5'>
                <i className="bi bi-people-fill mr-3 px-2 py-1 bg-primary text-xl text-white rounded"></i>
                <Link to="/dashboard/products">Customers</Link>
            </li>
        </ul>
    </div>
  )
}

export default Sidebar;