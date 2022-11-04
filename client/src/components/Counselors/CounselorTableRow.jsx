import { useState } from "react";
import { useSendToTrashMutation } from "../../store/services/counselorService";
import CounselorsEditModal from "./CounselorsEditModal";

function CounselorTableRow({ item, index }) {

  const  [openEditModal, setOpenEditModal] = useState(false);
  const [deleteOneCounselor] = useSendToTrashMutation();

  const deleteHandler = (e) => {
    deleteOneCounselor(item._id);
  }

  const updateHandler = (e) => {
    setOpenEditModal(true);
  }

  const closeModal = (e) => {
    setOpenEditModal(false);
  }
  
  return (
    <>
      <tr className={index % 2 === 0 ? `bg-slate-100` : `bg-white`}>
        <td className="px-5 py-8 whitespace-nowrap text-sm">{index + 1}</td>
        {item.photo && (
          <td className="flex justify-center items-center h-full px-5 py-8">
            <img
              src={`http://localhost:5000/${item.photo}`}
              alt="user_image"
              width={50}
              height={50}
            />
          </td>
        )}
        <td className="px-5 py-8 whitespace-nowrap text-sm">{item.name}</td>
        <td className="px-5 py-8 whitespace-nowrap text-sm">{item.email}</td>
        <td className="px-5 py-8 whitespace-nowrap text-sm">
          <button className="bg-primary text-white px-6 py-2 rounded" onClick={updateHandler}>Edit</button>
        </td>
        <td className="px-5 py-8 whitespace-nowrap text-sm">
          <button className="bg-red-500 text-white px-6 py-2 rounded" onClick={deleteHandler}>Move To Trash</button>
        </td>
      </tr>
      {
          openEditModal &&  
          <CounselorsEditModal 
          closeModal={closeModal}
          name={item.name}
          email={item.email}
          photo={item.photo}
          id={item._id}
          />
      }
    </>
  );
}

export default CounselorTableRow;
