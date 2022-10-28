import { useState, useEffect } from "react";
import TextInput from "./General/TextInput";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useAddCounselorMutation } from '../store/services/counselorService';

function CounselorsAddForm() {
  const [addCounselor, setAddCounselor] = useState({
    name: "",
    email: "",
    password: "",
    photo: ""
  });

  const [postCounselor, response] = useAddCounselorMutation()

  const changeCounselor = (e) => {
    setAddCounselor({ ...addCounselor, [e.target.name]: e.target.value });
  }

  const handlePhoto = (e) => {
    setAddCounselor({ ...addCounselor, photo: e.target.files[0] })
  }

  const addCounselorHandler = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('name', addCounselor.name);
    formData.append('email', addCounselor.email);
    formData.append('password', addCounselor.password);
    formData.append('photo', addCounselor.photo);
    postCounselor(formData);
  }
  
  useEffect(() => {
    if(response.isLoading && response.status === "pending") {
      toast.loading('Result Pending', {
        theme: 'colored',
        toastId: 'Add-Lead',
        autoClose: 3000
      });
    }
    if(response.isSuccess) {
      toast.update('Add-Lead', {
        render: "Counselor Added Successfully",
        type: 'success',
        isLoading: false,
        autoClose: 3000,
        theme: 'colored'
      });
    }
    if(response.isError) {
      toast.update("Add-Lead", {
        render: "Error Occurred",
        type: 'error',
        isLoading: false,
        autoClose: 3000,
        theme: 'colored'
      });
    }
  }, [response.isSuccess, response.isError, response.isLoading, response.status])

  return (
    <div className="bg-slate-100 p-5 lg:p-8 md:p-5 sm:p-5 w-full lg:w-9/12 md:w-full sm:w-full rounded-md">
      <div className="">
        <form onSubmit={addCounselorHandler} encType="multipart/form-data">
          <div className="md:grid md:place-items-center md:grid-cols-2 md:gap-4">
            <TextInput
              labelText="Counselor Name"
              inputType="text"
              inputName="name"
              inputPlaceholder="Name here"
              changeEvent={changeCounselor}
              inputValue={addCounselor.name}
              width="w-full"
            />

            <TextInput
              labelText="Counselor Email"
              inputType="email"
              inputName="email"
              inputPlaceholder="Email here"
              changeEvent={changeCounselor}
              inputValue={addCounselor.email}
              width="w-full"
            />
          </div>
          
            <TextInput
              labelText="Counselor Password"
              inputType="password"
              inputName="password"
              inputPlaceholder="Password"
              changeEvent={changeCounselor}
              inputValue={addCounselor.password}
              width="w-full"
            />


          <div className="md:grid md:place-items-center md:grid-cols-2 md:gap-4">
            <TextInput
              labelText="Counselor Photo"
              inputType="file"
              inputName="photo"
              changeEvent={handlePhoto}
              width="w-full"
            />
          </div>
          <div className="mt-3">
            <input
              type="submit"
              value="Submit"
              className="bg-primary text-white w-full px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
            />
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default CounselorsAddForm;