import { useEffect, useState } from "react";
import InfoCard from "../../components/InfoCard";
import { useGetAllLeadsQuery } from '../../store/services/leadService';
const InfoSection = () => {

  const { data, isFetching } = useGetAllLeadsQuery();
  // console.log(data.data);
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    if(!isFetching) {
      const dataArr = data.data;
      const leadDates = dataArr.filter((item) => {
        let leadDate = new Date(item.date);
        let leadMonth = leadDate.getMonth();
        // let newDate = new Date('10-10-2022');
        // console.log(newDate);
        const currentMonth = new Date().getMonth();

        return leadMonth === currentMonth;
      });

      setLeads(leadDates);
    }
  }, [isFetching, data]);
  // console.log(arrIterate)

  return (
    <div className="lg:flex lg:justify-between">
        <InfoCard headingText="Leads Generated This Month" stat={leads.length} iconClass="bi bi-person-lines-fill" />
        <InfoCard headingText="Pending Leads" stat={0} iconClass="bi bi-stopwatch" />
        <InfoCard headingText="New Leads Added Today" stat={0} iconClass="bi bi-person-plus-fill" />
        <InfoCard headingText="No. of counselors" stat={0} iconClass="bi bi-people-fill" />
    </div>
  )
}

export default InfoSection