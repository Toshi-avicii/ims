import { useEffect, useState } from 'react';
import { useGetAllLeadsQuery } from '../store/services/leadService';
import ExportReactCSV from './ExportReactCSV';
import Filters from './Filters';
import LeadTableRow from './LeadTableRow';
import { useSelector, useDispatch } from 'react-redux';
import { resetMonthFilter, resetCounselorFilter, resetStatusFilter } from '../store/reducers/globalReducer';
// import FilterBtn from './FilterBtn';

function LeadsTable({ data }) {
  const response = useGetAllLeadsQuery();
  const [allLeads, setAllLeads] = useState([]);
  const [dataCsv, setDataCsv] = useState([]);
  const filters = useSelector(state => state.appGlobalReducer.filters);
  const dispatch = useDispatch();
 
  useEffect(() => {
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];
    if(!response.isFetching) {
        setAllLeads(response.data.data);
    }

    const dataToDownload = allLeads.map((item) => {
        const creationDate = new Date(item.createdAt);
        let dayOfCreation = creationDate.toLocaleDateString(undefined, { day: "numeric" });
        dayOfCreation = Number(dayOfCreation) + 1;
        
        let restDate = creationDate.toString().slice(3, 15);
        let time = creationDate.toString().slice(16, 21);

        return {
            name: item.name,
            email: item.email,
            phone: item.phone,
            date: `${days[dayOfCreation]}, ${restDate}`,
            time: `${time}`,
            course: item.course,
            status: item.status,
            title: item.title,
            description: item.description,
            referenceName: item.reference.name,
            referencePhone: item.reference.phoneNo
        }
    });

    setDataCsv(dataToDownload);

  }, [response.isFetching, response.data, allLeads])

  const resetCounselor = (e) => {
    dispatch(resetCounselorFilter());
  }

  const resetMonth = (e) => {
    dispatch(resetMonthFilter());
  }

  const resetStatus = (e) => {
    dispatch(resetStatusFilter());
  }

  return (
    <div>
        <div className='flex items-center'>
            <p className='mr-4'>Applied Filters: </p>
            {
                filters.counselorFilter && <div className='py-2 px-4 bg-gray-800 rounded-full text-white shadow-sm mb-4'>
                    Counselor: {filters.counselorFilter}
                    <buttton onClick={resetCounselor} className="ml-2 cursor-pointer bg-white text-black p-2">x</buttton>
                </div>
            }
            {
                filters.monthFilter && <div className='py-2 px-4 bg-gray-800 rounded-full text-white shadow-sm mb-4 mx-4'>
                    Month: {filters.monthFilter}
                    <buttton onClick={resetMonth} className="ml-2 cursor-pointer bg-white text-black p-2">x</buttton>
                </div>
            }

            {
                filters.statusFilter && <div className='py-2 px-4 bg-gray-800 rounded-full text-white shadow-sm mb-4'>
                    Status: {filters.statusFilter}
                    <buttton onClick={resetStatus} className="ml-2 cursor-pointer bg-white text-black p-2">x</buttton>
                </div>
            }
        </div>
        
        <div className='mb-4 flex'>
            {/* add created-by field in the csv file */} 
            { allLeads.length > 0 &&
                <ExportReactCSV csvData={dataCsv} fileName={"generated-leads.csv"} />
            }
            
            <Filters />
        </div>

        <div className='bg-slate-100 shadow-md rounded-md overflow-x-scroll'>
        <table>
            <thead>
                <tr className='border-b border-b-gray-300 bg-white'>
                    <th className='p-5 font-semibold text-gray-700 text-sm uppercase text-left whitespace-nowrap'>S.no</th>
                    <th className='p-5 font-semibold text-gray-700 text-sm uppercase text-left whitespace-nowrap'>Name</th>
                    <th className='p-5 font-semibold text-gray-700 text-sm uppercase text-left whitespace-nowrap'>Email</th>
                    <th className='p-5 font-semibold text-gray-700 text-sm uppercase text-left whitespace-nowrap'>Phone</th>
                    <th className='p-5 font-semibold text-gray-700 text-sm uppercase text-left whitespace-nowrap'>Date</th>
                    <th className='p-5 font-semibold text-gray-700 text-sm uppercase text-left whitespace-nowrap'>Course Interested</th>
                    <th className='p-5 font-semibold text-gray-700 text-sm uppercase text-left whitespace-nowrap'>Status</th>
                    <th className='p-5 font-semibold text-gray-700 text-sm uppercase text-left whitespace-nowrap'>Lead Title</th>
                    <th className='p-5 font-semibold text-gray-700 text-sm uppercase text-left whitespace-nowrap'>Lead Description</th>
                    <th className='p-5 font-semibold text-gray-700 text-sm uppercase text-left whitespace-nowrap'>Lead Reference</th>
                    <th className='p-5 font-semibold text-gray-700 text-sm uppercase text-left whitespace-nowrap'>Created By</th>
                    <th className='p-5 font-semibold text-gray-700 text-sm uppercase text-left whitespace-nowrap'>Edit</th>
                    <th className='p-5 font-semibold text-gray-700 text-sm uppercase text-left whitespace-nowrap'>Delete</th>
                </tr>
            </thead>
            <tbody>

                { data.map((item, index) => {
                    let date = new Date(item.date);
                    let dayNum = date.getDate();
                    let month = date.getMonth();
                    let year = date.getFullYear();
                    let day = date.getDay();
                    let hour = date.getHours();
                    let minute = date.getMinutes();

                    return (
                        <LeadTableRow 
                            item={item} 
                            key={index} 
                            index={index}
                            day={day}
                            year={year}
                            month={month}
                            hour={hour}
                            minute={minute}
                            dayNum={dayNum}
                        />
                    )
                })}
            </tbody>
        </table> 
        </div>
    </div>
  )
}

export default LeadsTable