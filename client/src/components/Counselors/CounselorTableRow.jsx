
function CounselorTableRow({ item, index }) {

    return (
    <>
        <tr className={index % 2 === 0 ? `bg-slate-100` : `bg-white`}>  
            <td className="px-5 py-8 whitespace-nowrap text-sm">{index + 1}</td>
            <td className="px-5 py-8 whitespace-nowrap text-sm">{item.name}</td>
            <td className="px-5 py-8 whitespace-nowrap text-sm">{item.email}</td>
        </tr>
    </>
  )
}

export default CounselorTableRow