import { useState } from "react";
import TextInput from "./General/TextInput";

function LeadsAddForm() {
  const [addLeads, setAddLeads] = useState({
    leadName: "",
    leadPhone: "",
    leadEmail: "",
    leadCourse: "",
    leadStatus: "",
    leadTitle: "",
    leadDesc: "",
    leadId: "",
    leadRefName: "",
    leadRefPhone: "",
  });

  const changeLead = (e) => {
    setAddLeads({ ...addLeads, [e.target.name]: e.target.value });
  };

  
  const changeLeadDesc = (e) => {
    setAddLeads({ ...addLeads, leadDesc: e.target.value });
  };

  return (
    <div className="bg-slate-100 p-5 lg:p-8 md:p-5 sm:p-5 w-full lg:w-9/12 md:w-full sm:w-full sm:p-4 rounded-md">
      <div className="">
        <form>
          <div className="md:grid md:place-items-center md:grid-cols-2 md:gap-4">
            <TextInput
              labelText="Lead Name"
              inputType="text"
              inputName="leadName"
              inputPlaceholder="Name here"
              changeEvent={changeLead}
              inputValue={addLeads.leadName}
              width="w-full"
            />

            <TextInput
              labelText="Lead Email"
              inputType="email"
              inputName="leadEmail"
              inputPlaceholder="Email here"
              changeEvent={changeLead}
              inputValue={addLeads.leadEmail}
              width="w-full"
            />
          </div>
          <div className="md:grid md:place-items-center md:grid-cols-2 md:gap-4">
            <TextInput
              labelText="Lead Phone no."
              inputType="tel"
              inputName="leadPhone"
              inputPlaceholder="Phone no. here"
              changeEvent={changeLead}
              inputValue={addLeads.leadPhone}
              width="w-full"
            />
            <div className="w-full">
              <label htmlFor="course">Lead Course</label>
              <select
                id="course"
                className="block w-full p-4 bg-slate-50 outline-none rounded-lg"
                value={addLeads.leadCourse}
                onChange={changeLead}
                name="leadCourse"
              >
                <option value="it expert">IT Expert</option>
                <option value="dca">DCA</option>
                <option value="ms office">MS Office</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block mb-4" htmlFor="leadStatus">
              Lead Status
            </label>
            <select
              id="status"
              className="block w-full p-4 bg-slate-50 outline-none mt-4 rounded-lg"
              value={addLeads.leadStatus}
              onChange={changeLead}
              name="leadStatus"
            >
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="md:grid md:place-items-center md:grid-cols-2 md:gap-4">
            <TextInput
              labelText="Reference name"
              inputType="text"
              inputName="leadRefName"
              inputPlaceholder="Reference name"
              changeEvent={changeLead}
              inputValue={addLeads.leadRefName}
              width="w-full"
            />

            <TextInput
              labelText="Reference phone no."
              inputType="text"
              inputName="leadRefPhone"
              inputPlaceholder="Reference phone no."
              changeEvent={changeLead}
              inputValue={addLeads.leadRefPhone}
              width="w-full"
            />
          </div>

          <TextInput
            labelText="Lead Title"
            inputType="text"
            inputName="leadTitle"
            inputPlaceholder="Title here"
            changeEvent={changeLead}
            inputValue={addLeads.leadTitle}
          />

          <div>
            <label className="block mb-4" htmlFor="leadDesc">
              Lead Description
            </label>
            <textarea
              id="leadDesc"
              placeholder="description here"
              onChange={changeLeadDesc}
              value={addLeads.leadDesc}
              className="bg-slate-50 min-h-[50px] w-full p-4 focus:outline-0 focus-within:bg-slate-100 rounded-lg"
            ></textarea>
          </div>
          <div className="mt-3">
            <input
              type="submit"
              value="Submit"
              className="bg-primary text-white w-full px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default LeadsAddForm;
