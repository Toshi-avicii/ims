import React, { useEffect, useState } from 'react';
import BarChart from '../../components/Charts/BarChart';
import { useSelector } from 'react-redux';
// import LineChart from '../../components/Charts/LineChart';
import PieChart from '../../components/Charts/PieChart';
import { useGetCounselorsQuery } from '../../store/services/counselorService';

function ChartSection() {

    const [chartData, setChartData] = useState({
        labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ],

        datasets: [
            {
                label: 'No. of leads generated per month',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 0,
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
        ]
    });

    const [totalLeadsLength, setTotalLeadsLength] = useState(0);

    const { data = [], isFetching, isSuccess } = useGetCounselorsQuery();

    // const [leadData, setLeadData] = useState({
    //     labels: [
    //         'January',
    //         'February',
    //         'March',
    //         'April',
    //         'May',
    //         'June',
    //         'July',
    //         'August',
    //         'September',
    //         'October',
    //         'November',
    //         'December'
    //     ],

    //     datasets: [
    //         {
    //             label: 'No. of leads generated by B',
    //             backgroundColor: 'rgba(75,192,192,1)',
    //             borderColor: 'rgba(0,0,0,1)',
    //             borderWidth: 2,
    //             data: [6, 1, 2, 4, 5, 6, 7, 10, 10, 11, 13, 11]
    //         },

    //         {
    //             label: 'No. of leads generated by A',
    //             backgroundColor: 'rgba(45, 138, 210, 1)',
    //             borderColor: 'rgba(0,0,0,1)',
    //             borderWidth: 2,
    //             data: [6, 1, 5, 4, 5, 6, 7, 10, 3, 9, 13, 11]
    //         }
    //     ]
    // });

    const [doughnutData, setDoughnutData] = useState({
        labels: ['Red', 'Green', 'Yellow', 'Blue'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1,
          },
        ],
    });
    const adminToken = useSelector(state => state.authReducer.adminToken);

    useEffect(() => {
        const fetchLeadData = async (returnData = false) => {
            try {
                const req = await fetch('http://localhost:5000/api/leads/', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer: ' + adminToken
                    }
                });

                const result = await req.json();
                const currentYear = new Date().getFullYear();

                if (returnData) {
                    return result.data;
                }

                const monthData = (month, year) => {
                    const monthMatch = result.data.filter(lead => {
                        let leadMonth = new Date(lead.date).toLocaleString('default', { month: "long" });
                        let leadYear = Number(new Date(lead.date).toLocaleString('default', { year: "numeric" }));

                        if (leadMonth === month && leadYear === year) {
                            return leadMonth;
                        } else {
                            return null;
                        }
                    });

                    return monthMatch;
                }

                setChartData({
                    labels: [
                        'January',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                        'August',
                        'September',
                        'October',
                        'November',
                        'December'
                    ],

                    datasets: [
                        {
                            label: 'Leads',
                            backgroundColor: '#1890ff',
                            borderColor: 'rgba(0,0,0,1)',
                            borderWidth: 0,
                            borderRadius: 5,
                            barThickness: 23,
                            data: [
                                monthData('January', currentYear).length,
                                monthData('February', currentYear).length,
                                monthData('March', currentYear).length,
                                monthData('April', currentYear).length,
                                monthData('May', currentYear).length,
                                monthData('June', currentYear).length,
                                monthData('July', currentYear).length,
                                monthData('August', currentYear).length,
                                monthData('September', currentYear).length,
                                monthData("October", currentYear).length,
                                monthData("November", currentYear).length,
                                monthData('December', currentYear).length,
                            ]
                        }
                    ]
                });
            } catch (err) {
                console.log(err.message);
            }
        }

        fetchLeadData();

        const fetchLeadsByCounselorId = async (counselorId) => {
            try {
                const req = await fetch(`http://localhost:5000/api/leads/counselors/${counselorId}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer: ' + adminToken
                    }
                });

                const result = await req.json();
                return result;
            } catch (err) {
                console.log(err.message);
            }
        }

        const fetchLeadsByCounselors = async () => {
            try {
                // const leadsData = await fetchLeadData(true);
                const req = await fetch('http://localhost:5000/api/counselors/', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer: ' + adminToken
                    }
                });

                const result = await req.json();
                const counselors = result.counselors;

                // const currentYear = new Date().getFullYear();

                const cid = counselors.map(item => { 
                    return {
                        name: item.name, 
                        id: item._id
                    } 
                });

                cid.forEach((item, index) => {
                    // console.log(item);
                        let coun = fetchLeadsByCounselorId(item.id);
                        coun.then(res => {
                            // console.log(res);
                            // const monthData = (month, year, counselorId) => {
                                      
                            //     const monthMatch = leadsData.filter(lead => {
                            //         let leadMonth = new Date(lead.date).toLocaleString('default', { month: "long" });
                            //         let leadYear = Number(new Date(lead.date).toLocaleString('default', { year: "numeric" }));
                            //         if (leadMonth === month && leadYear === year && lead.counselor === counselorId) {
                            //             return leadMonth;
                            //         } else {
                            //             return null
                            //         }
                            //     });
                            //     return monthMatch;
                            // }
                            // console.log(monthData('October', currentYear, "633a863bfc6e50810c44b661"));
                            // console.log(monthData('September', currentYear, "633a863bfc6e50810c44b661"));
                            
                        }).catch(err => {
                            console.log(err.message);
                        })
                    })

            } catch (err) {
                console.log(err.message);
            }
        }

        fetchLeadsByCounselors();

        if(!isFetching && isSuccess) {
            const names = data?.counselors.map(item => {
                return item.name;
            });

            const genLeads = () => {
                const dataLed = data?.counselors.map((item, index) => {
                    return fetchLeadsByCounselorId(item._id);
                });

                const result = Promise.all(dataLed).then((res) => {
                    let dump = res.map((item, index) => {
                        return item.data.length;
                    });

                    return dump;
                });
                return result;
            } 

            fetchLeadData(true).then(res => {
                setTotalLeadsLength(res.length);
            });

            genLeads().then((res) => {
                let totalCounselorLeads = 0;
                for(let i = 0; i < res.length; i++) {
                    totalCounselorLeads += res[i];
                }
                setDoughnutData({
                    labels: [...names, 'Not Available Counselors'],
                    datasets: [
                      {
                        label: '# of Votes',
                        data: [...res, (totalLeadsLength - totalCounselorLeads)],
                        backgroundColor: [
                          'rgb(255, 99, 132)',
                          'rgb(54, 162, 235)',
                          'rgb(255, 206, 86)',
                          'rgb(75, 192, 192)',
                          '#2E282A'
                        ],
                        borderColor: 'transparent'
                      },
                    ],
                });
               
            })
        }

    }, [adminToken, data, isFetching, isSuccess, totalLeadsLength]);

    return (
        <div className='grid grid-cols-2 lg:mx-2 gap-4'>
            <BarChart chartData={chartData} />
            {/* <LineChart chartData={leadData} /> */}
            <PieChart chartData={doughnutData} />
        </div>
    )
}

export default ChartSection;