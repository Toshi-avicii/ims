import AdminNav from "../../components/AdminNav";
import Sidebar from "../../components/Sidebar";
import { useState } from 'react';

function Wrapper() {
  const [sideBar, setSidebar] = useState('-left-64');
  const openSidebar = () => {
    setSidebar('-left-0');
  }

  const closeSidebar = () => {
    setSidebar('-left-64');
  }

  return (
    <>
    <Sidebar side={sideBar} closeSidebar={closeSidebar} />
    <AdminNav openSidebar={openSidebar} />
    <section className="ml-0 sm:ml-64 bg-slate-200 min-h-screen px-4 pt-5">
      <div className="p-4 text-justify bg-white rounded-md">
        <h1 className="text-2xl font-thin mb-4">Sample Content</h1>
        <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
        and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
      </div>
    </section>
  </>
  )
}

export default Wrapper