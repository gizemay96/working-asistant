import React, { useState, useEffect } from "react";

import { Line, Bar, Doughnut } from "react-chartjs-2";
import { getWorksCountWithDate } from '../services/works.service'

export default function BackgroundColorWrapper({ chartName = '' }) {

     const [totalWorks, setTotalWorks] = useState([]);
     const [developmentsChartData, setdevelopmentsData] = useState([]);
     const [bugsChartData, setbugsData] = useState([]);
     const [monthChartData, setmonthData] = useState([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          getData(chartName);
     }, [])

     const getData = async (dataName) => {
          const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
          const monthsHaflYear = [7, 8, 9, 10, 11, 12];
          const monthDataOptions = ['Bug', 'Development', 'onProd'];
          let params = {};
          switch (dataName) {
               case 'totalWorks':
                    const totalWorkData = await Promise.all(months.map(async (month, ind) => {
                         const ltDate = `${new Date(`${month}.30.${new Date().getFullYear()}`).toISOString()}`
                         const gtDate = `${new Date(`${month}.2.${new Date().getFullYear()}`).toISOString()}`
                         const resp = await getWorksCountWithDate(ltDate, gtDate);
                         return resp.data;
                    }));

                    setTotalWorks(totalWorkData);

               case 'developments':
                    const developmentsData = await Promise.all(monthsHaflYear.map(async (month, ind) => {
                         params = { type: 'Development' }
                         const ltDate = `${new Date(`${month}.30.${new Date().getFullYear()}`).toISOString()}`
                         const gtDate = `${new Date(`${month}.2.${new Date().getFullYear()}`).toISOString()}`
                         const resp = await getWorksCountWithDate(ltDate, gtDate, params);
                         return resp.data;
                    }));

                    setdevelopmentsData(developmentsData);

               case 'bugs':
                    const bugsData = await Promise.all(monthsHaflYear.map(async (month, ind) => {
                         params = { type: 'Bug' }
                         const ltDate = `${new Date(`${month}.30.${new Date().getFullYear()}`).toISOString()}`
                         const gtDate = `${new Date(`${month}.2.${new Date().getFullYear()}`).toISOString()}`
                         const resp = await getWorksCountWithDate(ltDate, gtDate, params);
                         return resp.data;
                    }));

                    setbugsData(bugsData);

               case 'month':
                    var date = new Date();
                    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
                    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString();


                    const monthData = await Promise.all(monthDataOptions.map(async (option, ind) => {
                         params = option !== 'onProd' ? { type: option } : { currentEnv: 5 };
                         const gtDate = `${firstDay}`
                         const ltDate = `${lastDay}`
                         const resp = await getWorksCountWithDate(ltDate, gtDate, params);
                         return resp.data;
                    }));

                    setmonthData(monthData);
               default:
                    break;
          }

          setLoading(false);
     }



     // chartExample1 and chartExample2 options
     let chart1_2_options = {
          maintainAspectRatio: false,
          legend: {
               display: false,
          },
          tooltips: {
               backgroundColor: "#f5f5f5",
               titleFontColor: "#333",
               bodyFontColor: "#666",
               bodySpacing: 4,
               xPadding: 12,
               mode: "nearest",
               intersect: 0,
               position: "nearest",
          },
          responsive: true,
          scales: {
               yAxes: [
                    {
                         barPercentage: 1.6,
                         gridLines: {
                              drawBorder: false,
                              color: "rgba(29,140,248,0.0)",
                              zeroLineColor: "transparent",
                         },
                         ticks: {
                              suggestedMin: 60,
                              suggestedMax: 125,
                              padding: 20,
                              fontColor: "#9a9a9a",
                         },
                    },
               ],
               xAxes: [
                    {
                         barPercentage: 1.6,
                         gridLines: {
                              drawBorder: false,
                              color: "rgba(29,140,248,0.1)",
                              zeroLineColor: "transparent",
                         },
                         ticks: {
                              padding: 20,
                              fontColor: "#9a9a9a",
                         },
                    },
               ],
          },
     };


     let totalWorksChart = {
          data1: (canvas) => {
               let ctx = canvas.getContext("2d");

               let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

               gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
               gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
               gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

               return {
                    labels: [
                         "JAN",
                         "FEB",
                         "MAR",
                         "APR",
                         "MAY",
                         "JUN",
                         "JUL",
                         "AUG",
                         "SEP",
                         "OCT",
                         "NOV",
                         "DEC",
                    ],
                    datasets: [
                         {
                              label: "My First dataset",
                              fill: true,
                              backgroundColor: gradientStroke,
                              borderColor: "#1f8ef1",
                              borderWidth: 2,
                              borderDash: [],
                              borderDashOffset: 0.0,
                              pointBackgroundColor: "#1f8ef1",
                              pointBorderColor: "rgba(255,255,255,0)",
                              pointHoverBackgroundColor: "#1f8ef1",
                              pointBorderWidth: 20,
                              pointHoverRadius: 4,
                              pointHoverBorderWidth: 15,
                              pointRadius: 4,
                              data: totalWorks,
                         },
                    ],
               };
          },
          options: chart1_2_options,
     };

     const developmentsChart = {
          data: (canvas) => {
               let ctx = canvas.getContext("2d");

               let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

               gradientStroke.addColorStop(1, "rgba(66,134,121,0.15)");
               gradientStroke.addColorStop(0.4, "rgba(66,134,121,0.0)"); //green colors
               gradientStroke.addColorStop(0, "rgba(66,134,121,0)"); //green colors

               return {
                    labels: ["JUL", "AUG", "SEP", "OCT", "NOV"],
                    datasets: [
                         {
                              label: "My First dataset",
                              fill: true,
                              backgroundColor: gradientStroke,
                              borderColor: "#00d6b4",
                              borderWidth: 2,
                              borderDash: [],
                              borderDashOffset: 0.0,
                              pointBackgroundColor: "#00d6b4",
                              pointBorderColor: "rgba(255,255,255,0)",
                              pointHoverBackgroundColor: "#00d6b4",
                              pointBorderWidth: 20,
                              pointHoverRadius: 4,
                              pointHoverBorderWidth: 15,
                              pointRadius: 4,
                              data: developmentsChartData,
                         },
                    ],
               };
          },
          options: {
               maintainAspectRatio: false,
               legend: {
                    display: false,
               },

               tooltips: {
                    backgroundColor: "#f5f5f5",
                    titleFontColor: "#333",
                    bodyFontColor: "#666",
                    bodySpacing: 4,
                    xPadding: 12,
                    mode: "nearest",
                    intersect: 0,
                    position: "nearest",
               },
               responsive: true,
               scales: {
                    yAxes: [
                         {
                              barPercentage: 1.6,
                              gridLines: {
                                   drawBorder: false,
                                   color: "rgba(29,140,248,0.0)",
                                   zeroLineColor: "transparent",
                              },
                              ticks: {
                                   suggestedMin: 50,
                                   suggestedMax: 125,
                                   padding: 20,
                                   fontColor: "#9e9e9e",
                              },
                         },
                    ],

                    xAxes: [
                         {
                              barPercentage: 1.6,
                              gridLines: {
                                   drawBorder: false,
                                   color: "rgba(0,242,195,0.1)",
                                   zeroLineColor: "transparent",
                              },
                              ticks: {
                                   padding: 20,
                                   fontColor: "#9e9e9e",
                              },
                         },
                    ],
               },
          },
     };


     let bugsChart = {
          data: (canvas) => {
               let ctx = canvas.getContext("2d");

               let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

               gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
               gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
               gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

               return {
                    labels: ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
                    datasets: [
                         {
                              label: "Countries",
                              fill: true,
                              backgroundColor: gradientStroke,
                              hoverBackgroundColor: gradientStroke,
                              borderColor: "rgba(208,46,83, 1)",
                              borderWidth: 2,
                              borderDash: [],
                              borderDashOffset: 0.0,
                              data: bugsChartData,
                         },
                    ],
               };
          },
          options: {
               maintainAspectRatio: false,
               legend: {
                    display: false,
               },
               tooltips: {
                    backgroundColor: "#f5f5f5",
                    titleFontColor: "#333",
                    bodyFontColor: "#666",
                    bodySpacing: 4,
                    xPadding: 12,
                    mode: "nearest",
                    intersect: 0,
                    position: "nearest",
               },
               responsive: true,
               scales: {
                    yAxes: [
                         {
                              gridLines: {
                                   drawBorder: false,
                                   color: "rgba(208,46,83,0.1)",
                                   zeroLineColor: "transparent",
                              },
                              ticks: {
                                   suggestedMin: 60,
                                   suggestedMax: 120,
                                   padding: 20,
                                   fontColor: "#9e9e9e",
                              },
                         },
                    ],
                    xAxes: [
                         {
                              gridLines: {
                                   drawBorder: false,
                                   color: "rgba(208,46,83,0.1)",
                                   zeroLineColor: "transparent",
                              },
                              ticks: {
                                   padding: 20,
                                   fontColor: "#9e9e9e",
                              },
                         },
                    ],
               },
          },
     };

     const monthChart = {
          labels: [
               'Bugs',
               'Developments',
               'Closed (On Prod)'
          ],
          datasets: [{
               label: 'My First Dataset',
               data: monthChartData,
               backgroundColor: [
                    'rgb(208, 46, 83 , 1)',
                    'rgb(39, 117, 247 , 1)',
                    'rgb(0, 214, 180 , 1)'
               ],
               hoverOffset: 4
          }]
     };


     return (
          <div className="chart-area">
               {
                    !loading && chartName === 'totalWorks' &&
                    <Line
                         data={totalWorksChart['data1']}
                         options={totalWorksChart.options}
                    />
               }

               {
                    !loading && chartName === 'developments' &&
                    <div className="chart-area">
                         <Line
                              data={developmentsChart.data}
                              options={developmentsChart.options}
                         />
                    </div>
               }

               {
                    !loading && chartName === 'bugs' &&
                    <div className="chart-area">
                         <Bar
                              data={bugsChart.data}
                              options={bugsChart.options}
                         />
                    </div>
               }

               {
                    !loading && chartName === 'month' &&
                    <Doughnut
                         type="doughnut"
                         data={monthChart}
                         width={"30%"}
                         options={{ maintainAspectRatio: false }}
                    />
               }

               {
                    loading && <p>Loading</p>
               }

          </div>
     );
}