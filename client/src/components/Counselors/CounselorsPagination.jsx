import { Link } from "react-router-dom";

function CounselorsPagination({ page, perPage, count }) {
    const totalLinks = Math.ceil(count / perPage);
    let startLoop = page;
    let diff = totalLinks - page;
    
    if(diff <= 3) {
        startLoop = totalLinks - 1;  
    }

    let endLoop = startLoop + 1;

    const links = () => {
        const allLinks = [];
        for(let i = startLoop; i <= endLoop; i++) {
            allLinks.push(
                <li key={i} className="bg-primary px-3 py-1 text-white mr-4 rounded-sm">
                    <Link to={`/dashboard/counselors/pages/${i}`}>{i}</Link>
                </li>
            )
        }
        return allLinks;
    }

    const next = () => {
        if(page < totalLinks) {
            return <li className="bg-primary px-2 py-1 text-white rounded-sm">
                <Link to={`/dashboard/counselors/pages/${page + 1}`}>
                    <i className="bi bi-caret-right-fill"></i>
                </Link>
            </li>
        }
    }

    const prev = () => {
        if(page > 1) {
            return <li className="bg-primary px-2 py-1 text-white mr-4 rounded-sm">
                    <Link to={`/dashboard/counselors/pages/${page - 1}`}>
                        <i className="bi bi-caret-left-fill"></i>
                    </Link>
                </li>
        }
    }

  return (
    <ul className="flex w-2/4 m-auto mt-9 justify-center">
        {prev()}
        {links()}
        {next()}
    </ul>
  )
}

export default CounselorsPagination