import React from 'react'

function LeadsTable({ data }) {
    console.log(data)

  return (
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
                </tr>
            </thead>
            <tbody>

                { data.map((item, index) => {
                    let days = [
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday"
                    ];
                    let date = new Date(item.date);
                    let dayNum = date.getDate();
                    let month = date.getMonth();
                    let year = date.getFullYear();
                    let day = date.getDay();
                    let hour = date.getHours();
                    let minute = date.getMinutes();
                    return (
                        <tr key={index} className={index % 2 === 0 ? `bg-slate-100` : `bg-white`}>
                            <td className='px-5 py-8 text-left whitespace-nowrap text-sm'>{index + 1}.</td>
                            <td className='px-5 py-8 text-left whitespace-nowrap text-sm'>{item.name}</td>
                            <td className='px-5 py-8 text-left whitespace-nowrap text-sm'>{item.email}</td>
                            <td className='px-5 py-8 text-left whitespace-nowrap text-sm'>{item.phone}</td>
                            <td className='px-5 py-8 text-left whitespace-nowrap text-sm'>
                                {days[day]}, {dayNum}-{(month + 1) < 10 ? `0${month}` : month + 1}-{year}<br />
                                {hour > 11 ? hour - 12 : hour}:{minute < 10 ? `0${minute}` : minute}
                                {hour > 11 ? ' PM' : ' AM'}
                            </td>
                            <td className='px-5 py-8 text-left whitespace-nowrap text-sm uppercase'>{item.course}</td>
                            <td className='px-5 py-8 text-left whitespace-nowrap text-xs font-medium uppercase'>
                                <span className={`px-4 text-xs py-2 rounded-sm text-white 
                                    ${item.status === "Pending" && `bg-yellow-600`}
                                    ${item.status === "Resolved" && `bg-emerald-600`}
                                    ${item.status === "Rejected" && `bg-rose-700`}
                                    `}>
                                    {item.status}
                                </span>
                            </td>
                            <td className='px-5 py-8 text-left whitespace-nowrap text-xs'>{item.title}</td>
                            <td className='px-5 py-8 text-left whitespace-nowrap text-xs'>{item.description}</td>
                            {
                                item.reference ? <td className='px-5 py-8 text-left whitespace-nowrap text-sm'>
                                    {item.reference.name}, {item.reference.phoneNo}
                                </td> : <td className='px-5 py-8 text-left whitespace-nowrap text-sm'>
                                    No One
                                </td>  
                            }
                        </tr>
                    )
                })}
            </tbody>
      </table>  
    </div>
  )
}

export default LeadsTable