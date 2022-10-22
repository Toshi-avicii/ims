import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminNav from '../../components/AdminNav';
import LeadsTable from '../../components/LeadsTable';
import Sidebar from '../../components/Sidebar';
import Pagination from '../../components/Pagination';
import { useGetLeadsByPageQuery } from '../../store/services/leadService';

function ShowLeads() {
  const [sideBar, setSidebar] = useState('-left-64');
  const [leads, setLeads] = useState([]);
  const [paginationData, setPaginationData] = useState({
    perPage: 0,
    count: 0
  });
  let { page } = useParams();
  const { data = [], isFetching } = useGetLeadsByPageQuery(page ? page: 1);

  if(!page) {
    page = 1;
  }

  const openSidebar = () => {
    setSidebar('-left-0');
  }
  
  const closeSidebar = () => {
      setSidebar('-left-64');
  }

  useEffect(() => {
    if(!isFetching) {
      // console.log(data)
        const leadData = data?.data;
        setLeads(leadData); 
        setPaginationData({
          perPage: data.perPage,
          count: data.count
        });
    }
  }, [data, isFetching]);


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
            leads && leads.length > 0 && 
            <div>
              <LeadsTable data={leads} />
              <Pagination page={parseInt(page)} perPage={paginationData.perPage} count={paginationData.count}  />
            </div>
          }

          {
            !leads && <div>
              <p className=''>No leads Found</p>
            </div>
          }
        </div>
      </section>
    </>
  )
}

export default ShowLeads