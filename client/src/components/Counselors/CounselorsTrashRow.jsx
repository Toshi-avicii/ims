function CounselorsTrashRow({ item, index }) {

  return (
    <>
      <tr className={index % 2 === 0 ? `bg-slate-100` :  `bg-white`}>
        <td className="px-5 py-8 whitespace-nowrap text-sm">{1}</td>
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
        <td className="px-5 py-8 whitespace-nowrap text-md">
          <button className="bg-primary text-white px-6 py-2 rounded">
            Recover
          </button>
        </td>
        <td className="px-5 py-8 whitespace-nowrap text-md">
          <button className="bg-red-500 text-white px-6 py-2 rounded">
            Permanent Delete
          </button>
        </td>
      </tr>
    </>
  );
}

export default CounselorsTrashRow;
