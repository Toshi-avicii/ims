import { useState } from "react";
import EditModal from "./EditModal";

function LeadTableRow({ item, index, day, year, month, hour, minute, dayNum }) {
  let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
  ];

  const [openEditModal, setOpenEditModal] = useState(false);
  
  const updateHandler = (e) => {
    setOpenEditModal(true);
  } 

  const closeModal = (e) => {
    setOpenEditModal(false);
  }

  const deleteHandler = (e) => {
    console.log(e)
  }

  return (
    <>
    <tr className={index % 2 === 0 ? `bg-slate-100` : `bg-white`}>
      <td className="px-5 py-8 text-left whitespace-nowrap text-sm">
        {index + 1}.
      </td>
      <td className="px-5 py-8 text-left whitespace-nowrap text-sm">
        {item.name}
      </td>
      <td className="px-5 py-8 text-left whitespace-nowrap text-sm">
        {item.email}
      </td>
      <td className="px-5 py-8 text-left whitespace-nowrap text-sm">
        {item.phone}
      </td>
      <td className="px-5 py-8 text-left whitespace-nowrap text-sm">
        {days[day]}, {dayNum}-{month + 1 < 10 ? `0${month}` : month + 1}-{year}
        <br />
        {hour > 11 ? hour - 12 : hour}:{minute < 10 ? `0${minute}` : minute}
        {hour > 11 ? " PM" : " AM"}
      </td>
      <td className="px-5 py-8 text-left whitespace-nowrap text-sm uppercase">
        {item.course}
      </td>
      <td className="px-5 py-8 text-left whitespace-nowrap text-xs font-medium uppercase">
        <span
          className={`px-4 text-xs py-2 rounded-sm text-white 
            ${
                item.status === "Pending" &&
                `bg-yellow-600`
            }
            ${
                item.status === "Resolved" &&
                `bg-emerald-600`
            }
            ${
                item.status === "Rejected" &&
                `bg-rose-700`
            }
            `}
        >
          {item.status}
        </span>
      </td>
      <td className="px-5 py-8 text-left text-sm">{item.title}</td>
      <td className="px-5 py-8 text-left text-sm">{item.description}</td>
      {item.reference ? (
        <td className="px-5 py-8 text-left whitespace-nowrap text-sm">
          {item.reference.name}, <br />
          {item.reference.phoneNo}
        </td>
      ) : (
        <td className="px-5 py-8 text-left whitespace-nowrap text-sm">
          No One
        </td>
      )}

      <td className="px-5 py-8 text-left whitespace-nowrap text-sm">
        <button
          className="bg-primary text-white px-6 py-2 rounded"
          onClick={updateHandler}
        >
          Edit
        </button>
      </td>
      <td className="px-5 py-8 text-left whitespace-nowrap text-sm">
        <button
          className="bg-red-500 text-white px-6 py-2 rounded"
          onClick={deleteHandler}
        >
          Delete
        </button>
      </td>
    </tr>
    {
        openEditModal && 
            <EditModal  
                name={item.name}
                phone={item.phone}
                email={item.email}
                course={item.course}
                status={item.status}
                title={item.title}
                desc={item.description}
                closeModal={closeModal}
            />
        }
    </>
  );
}

export default LeadTableRow;