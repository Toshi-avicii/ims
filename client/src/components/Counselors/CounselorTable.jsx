import CounselorTableRow from "./CounselorTableRow"

function CounselorTable({ data }) {

  return (
    <>
        <div className="bg-slate-100 shadow-md rounded-md overflow-hidden text-center">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-b-gray-300 bg-white text-center">
                        <th className="p-4 font-semibold text-gray-700 text-sm uppercase whitespace-nowrap">S.no</th>
                        <th className="p-4 font-semibold text-gray-700 text-sm uppercase whitespace-nowrap">Name</th>
                        <th className="p-4 font-semibold text-gray-700 text-sm uppercase whitespace-nowrap">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length > 0 && data.map((item, index) => {
                            return (
                                <CounselorTableRow item={item} key={index} index={index} />      
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    </>
  )
}

export default CounselorTable