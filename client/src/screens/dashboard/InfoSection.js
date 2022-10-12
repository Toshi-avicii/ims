import InfoCard from "../../components/InfoCard";
import { useGetAllLeadsQuery } from '../../store/services/leadService';
const InfoSection = () => {

  const { data, isFetching } = useGetAllLeadsQuery();

  return (
    <div className="lg:flex lg:justify-between">
        <InfoCard headingText="Leads Generated This Month" stat={isFetching ? 'N/A' : data.data.length} iconClass="bi bi-person-lines-fill" />
        <InfoCard headingText="Pending Leads" stat={0} iconClass="bi bi-stopwatch" />
        <InfoCard headingText="New Leads Added Today" stat={0} iconClass="bi bi-person-plus-fill" />
        <InfoCard headingText="No. of counselors" stat={0} iconClass="bi bi-people-fill" />
    </div>
  )
}

export default InfoSection