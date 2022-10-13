
import { useEffect, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfoCard from "../../components/InfoCard";
import { useGetAllLeadsQuery } from '../../store/services/leadService';
import { fetchLeadsData } from "../../store/reducers/leadReducer"; 
import { useGetCounselorsQuery } from "../../store/services/counselorService";
import { fetchCounselorData } from "../../store/reducers/counselorReducer";

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
=======
  const response = useGetCounselorsQuery();
  const dispatch = useDispatch();
  let leadsThisMonth = useSelector(state => state.leadReducer.leadsThisMonth);
  let pendingLeads = useSelector(state => state.leadReducer.pendingLeads);
  let newLeadsToday = useSelector(state => state.leadReducer.newLeadsToday);
  let counselorCount = useSelector(state => state.counselorReducer.counselorCount);

  useEffect(() => {
    if(!response.isFetching) {
      dispatch(fetchCounselorData({counselorCount: response?.data?.counselors.length}));
    }
    if(!isFetching) {
      const pendingLeadsCount = data.data.filter(lead => {
          return lead.status === "Pending";
      });

      const leadsToday = data.data.filter(lead => {
        let date = new Date();
        let leadDate = new Date(lead.date).getDate();
        let leadMonth = new Date(lead.date).getMonth();
        let leadYear = new Date(lead.date).getFullYear();
        let today = date.getDate();
        let currentMonth = date.getMonth();
        let currentYear = date.getFullYear();

        return (leadDate === today) && (leadMonth === currentMonth) && (leadYear === currentYear);
      });

      dispatch(fetchLeadsData({ 
        leadsCount: data.data.length,
        pendingLeads:  pendingLeadsCount.length,
        newLeads: leadsToday.length
      }));
    }

  }, [dispatch, data, isFetching, response]);

  return (
    <div className="lg:flex lg:justify-between">
        <InfoCard headingText="Leads Generated This Month" stat={leadsThisMonth} iconClass="bi bi-person-lines-fill" />
        <InfoCard headingText="Pending Leads" stat={pendingLeads} iconClass="bi bi-stopwatch" />
        <InfoCard headingText="New Leads Added Today" stat={newLeadsToday} iconClass="bi bi-person-plus-fill" />
        <InfoCard headingText="No. of counselors" stat={counselorCount} iconClass="bi bi-people-fill" />
    </div>
  )
}

export default InfoSection