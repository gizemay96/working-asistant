import React, { useState, useEffect } from "react";
import workItemData from '../../assets/json/works.json'
import { Line, Bar } from "react-chartjs-2";

export default function BackgroundColorWrapper({chartName  = ''}) {
     const [workItems] = useState(workItemData);

     const getData = (dataName) => {
          const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
          let data = [];
          console.log(dataName)
          let itemKey;
          switch (dataName) {
               case 'release':
                    months.forEach((month , ind) => {
                              data[ind] = workItems.filter(item => new Date(item.created).getDate() === month).length
                         })
                         return data;
                    case 'totalWorks':
                    months.forEach((month , ind) => {
                              data[ind] = workItems.filter(item => new Date(item.created).getDate() === month).length
                         })
                         return data;
                         case 'developments':
                              months.forEach((month , ind) => {
                                        data[ind] = workItems.filter(item => item.type === 'development' && new Date(item.created).getDate() === month).length
                                   })
                                   return data;
                         case 'bugs':
                              months.forEach((month , ind) => {
                                        data[ind] = workItems.filter(item => item.type === 'bug' && new Date(item.created).getDate() === month).length
                                   })
                                   return data;
          
               default:
                    break;
          }
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


     let chartExample1 = {
          data1: (canvas) => {
               console.log(getData())
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
                              data: getData(chartName),
                         },
                    ],
               };
          },
          data2: (canvas) => {
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
                              data: [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
                         },
                    ],
               };
          },
          data3: (canvas) => {
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
                              data: [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130],
                         },
                    ],
               };
          },
          options: chart1_2_options,
     };




     return (
          <div className="chart-area">
               <Line
                    data={chartExample1['data1']}
                    options={chartExample1.options}
               />
          </div>
     );
}