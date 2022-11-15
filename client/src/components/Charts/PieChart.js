import { Pie } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';

function PieChart({ chartData }) {
  const currentYear = new Date().getFullYear();
  return (
    <div className='col-span-2 lg:col-span-1 mt-4 bg-slate-50 lg:p-6 rounded-md shadow-sm min-h-[370px] flex justify-center items-center'>
        <Pie
            data={chartData}
            height="200px"
            width="200px"
            options={
                {
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: `No. of leads generated by counselors this year (${currentYear})`
                        },
                        legend: {
                            display: true,
                            position: 'bottom'
                        }
                    },
                   
                }
            }
        />
    </div>
  )
}

export default PieChart;