import { useState, useEffect } from 'react';
import AdminNav from '../../components/AdminNav';
import LeadsTable from '../../components/LeadsTable';
import Sidebar from '../../components/Sidebar';
import { useGetAllLeadsQuery } from '../../store/services/leadService';

function ShowLeads() {
  const [sideBar, setSidebar] = useState('-left-64');
  const [leads, setLeads] = useState([]);
  const response = useGetAllLeadsQuery();

  const openSidebar = () => {
    setSidebar('-left-0');
  }
  
  const closeSidebar = () => {
      setSidebar('-left-64');
  }

  useEffect(() => {
    if(!response.isFetching) {
        const data = response?.data?.data;
        setLeads(data);   
    }
  }, [response]);


  return (
    <>
        <Sidebar side={sideBar} closeSidebar={closeSidebar} />
        <AdminNav openSidebar={openSidebar} />

        <section className="ml-0 sm:ml-64 bg-slate-200 min-h-screen pt-28 px-4">
        <div className="text-justify rounded-md">
          <div className='mb-4'>
                <h1 className='text-2xl font-medium text-gray-600'>All Leads</h1>
          </div>
          {
              leads.length > 0 && <LeadsTable data={leads} />
          }
        </div>
      </section>
    </>
  )
}

export default ShowLeads