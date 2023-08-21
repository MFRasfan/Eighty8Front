import React,{useState, useEffect} from "react";
import { Pie } from "react-chartjs-2";
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";
import { COLORS } from "../../utils/color";



// function PieChart({ Data }) {
//     const [chartData, setChartData] = useState({
//         labels: Data.map((data) => data.year), 
//         datasets: [
//           {
//             label: "Users Gained ",
//             data: Data.map((data) => data.userGain),
//             backgroundColor: [
//               COLORS.primary,
//               COLORS.gray1,
//               COLORS.primaryLight06,
//               COLORS.primaryDark01,
//               COLORS.primaryLight03,
//             ],
//             borderColor: "black",
//             borderWidth: 2
//           }
//         ]
//       });
//   return (
//     <div className="chart-container">
//       <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
//       {console.log(chartData)}
//       <Pie
//         data={chartData}
//         options={{
//           plugins: {
//             title: {
//               display: true,
//               text: "Users Gained between 2016-2020"
//             }
//           }
//         }}
//       />
//     </div>
//   );
// }
// export default PieChart;
function PieChart({ Data }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Users Gained",
        data: [],
        backgroundColor: [
          COLORS.primary,
          COLORS.gray1,
          COLORS.primaryLight06,
          COLORS.primaryDark01,
          COLORS.primaryLight03,
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  // update chart data when props change
  useEffect(() => {
    const labels = Data.map((data) => data.month);
    const data = Data.map((data) => data.count);
    setChartData((prevState) => ({
      ...prevState,
      labels,
      datasets: [
        {
          ...prevState.datasets[0],
          data,
        },
      ],
    }));
  }, [Data]);

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: `Users Gained Each Month this Year ${new Date().getFullYear()}`,
            },
          },
          elements: {
            arc: {
              borderWidth: 0,
            },
          },
        }}
      />
    </div>
  );
}
export default PieChart;