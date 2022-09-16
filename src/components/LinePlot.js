import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


export default class LinePlot extends React.Component{
    constructor(...props){
        super(...props);
        this.state ={
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
              labels:{
                color: '#ECEFF4'
              }
            },
            title: {
              display: true,
              text: this.props.data.title,
              color: "#ECEFF4",
            }
      
          },
          scales: {
            yAxes:{
                grid: {
                    drawBorder: true,
                    color: '#C0C0C0',
                },
                ticks:{
                  color:'#ECEFF4'
                }
            },
            xAxes: {
                grid: {
                    drawBorder: true,
                    color: '#C0C0C0',
                },
                ticks:{
                  color:'#ECEFF4'
                }
          
            }
          }
        },
        options_light: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
              labels:{
                color: '#1F232B'
              }
            },
            title: {
              display: true,
              text: this.props.data.title,
              color: "#1F232B",
            }
      
          },
          scales: {
            yAxes:{
                grid: {
                    drawBorder: true,
                    color: '#808080',
                },
                ticks:{
                  color:'#1F232B'
                }
            },
            xAxes: {
                grid: {
                    drawBorder: true,
                    color: '#808080',
                },
                ticks:{
                  color:'#1F232B'
                }
          
            }
          }
        },
        
      data: {
          labels: this.props.data.dataX,
          datasets: [
            {
              label: this.props.data.labelY,
              data: this.props.data.dataY,
              borderColor: 'rgb(23, 152, 222)',
              backgroundColor: 'rgba(23, 152, 222,0.5)',
            },
      
          ],
        }
      }
    }

    
    
    render(){
        let darkMode = this.props.darkMode
        return (
             <Line options={ darkMode ? this.state.options: this.state.options_light} data={this.state.data} />
        )
    }
}