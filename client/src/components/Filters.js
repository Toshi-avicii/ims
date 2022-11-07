import { useState, useEffect } from 'react'
import { useGetCounselorsQuery } from '../store/services/counselorService';
// import { CalendarDaysIcon } from '@heroicons/react/20/solid';
import { changeFilters, resetFilters } from '../store/reducers/globalReducer';
import { useDispatch } from 'react-redux';

function Filters() {
    const response = useGetCounselorsQuery();
    const [counselors, setCounselors] = useState([]);
    const [appliedFilters, setAppliedFilters] = useState([]);
    const dispatch = useDispatch();

    const [filterData, setFilterData] = useState({
        month: '',
        status: '',
        year: '',
        course: '',
        counselor: ''
    });

    const changeEvent = (e) => {
        setFilterData({ ...filterData, [e.target.name]: e.target.value });
    }

    const filterHandler = (e) => {
        e.preventDefault();

        dispatch(changeFilters({
            month: filterData.month,
            status: filterData.status,
            counselor: filterData.counselor
        }));
    }

    const resetFiltersHandler = (e) => {
        dispatch(resetFilters());
    }

    useEffect(() => {
        if(!response.isFetching && response.status === "fulfilled") {
            setCounselors(response.data.counselors);
        }

        if(!response.isFetching && response.status === "rejected") {
            console.log(response.data);
        }

        
        let arr = [];
        for(const [key, value] of Object.entries(filterData)) {
            if(value !== '') {
                arr.push({ [key]: value });
                setAppliedFilters(arr);
            } else {
                continue;
            }
        }
    }, [response, filterData]);

  return (
    <div>
        <form className='flex' onSubmit={filterHandler}>
            <div className='bg-slate-100 p-0 rounded shadow-sm flex justify-center items-center ml-2'>
                <div className='p-0'>
                    <input type="month" className='px-4 py-2 bg-transparent' name="month" value={filterData.month} onChange={changeEvent} />
                </div>
            </div>

            <div className='bg-slate-100 p-0 rounded shadow-sm flex justify-center items-center ml-2'>
                <div className='p-0 flex'>
                    <select
                        id="status"
                        className="block w-full px-6 py-2 outline-none rounded-lg bg-transparent"
                        name="status"
                        value={filterData.status}
                        onChange={changeEvent}
                    >
                        <option value="" disabled>Status</option>
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="resolved">Resolved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            </div>

            <div className='bg-slate-100 p-0 rounded shadow-sm flex justify-center items-center ml-2'>
                <div className='p-0 flex'>
                    <select
                        id="counselor"
                        className="block w-full px-6 py-2 outline-none rounded-lg bg-transparent"
                        name="counselor"
                        value={filterData.counselor}
                        onChange={changeEvent}
                    >
                        <option value="">Counselor</option>
                        <option value="all">All</option>
                        {counselors.map((item, index) => {
                            return (
                                <option value={item.name} key={index}>{item.name}</option>
                            )
                        })}
                    </select>
                </div>
            </div>

            <div className='bg-slate-100 p-0 rounded-sm shadow-sm flex justify-center items-center ml-2'>
                <div className='p-0 h-full'>
                    <input type="submit" className='px-4 py-2 cursor-pointer bg-orange-400 text-white text-sm h-full' value="Apply filters" />
                </div>
            </div>
            <div className='bg-slate-100 p-0 rounded-sm shadow-sm flex justify-center items-center ml-2'>
                <button type="button" className='px-4 py-2 cursor-pointer bg-purple-400 text-white text-sm h-full' onClick={resetFiltersHandler}>Reset Filters</button>
            </div>
        </form>
        
    </div>
  )
}

export default Filters