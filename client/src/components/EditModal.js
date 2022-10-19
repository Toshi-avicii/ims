import { useRef } from 'react';
import { createPortal } from 'react-dom';
// import TextInput from './General/TextInput';

function EditModal({ name, phone, email, course, status, title, desc, closeModal }) {

    const modalRef = useRef(null);
  return createPortal(
    <div className='fixed top-0 left-0 w-screen h-screen bg-gray-200 items-center z-10'>
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='bg-white rounded shadow w-2/4'>
                <div className='border-b-2 border-y-slate-500 p-3 flex justify-between items-center'>
                    <h2>Edit Lead</h2>
                    <button onClick={closeModal} className="bg-gray-300 px-2">x</button>
                </div>
                <div className='p-3'>
                    <form>
                        {/* <TextInput /> */}
                    </form>
                </div>
            </div>
        </div>
    </div>,
    document.getElementById('portal')
)
}

export default EditModal;