import React from "react";
import styles from '../styles.module.css';
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
  
  export const options = {
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
        text: 'Accuracy statistics - example',
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
  };
  export const options_light = {
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
        text: 'Accuracy statistics - example',
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
  };
  
  const labels = ['epoch 1', 'epoch 10', 'epoch 20', 'epoch 30', 'epoch 40', 'epoch 50 ', 'epoch 100'];
  
  export const data = {
    labels,
    datasets: [
      {
        label: 'Accuracy',
        data: [53,64,70,60,77,82,95],
        borderColor: 'rgb(23, 152, 222)',
        backgroundColor: 'rgba(23, 152, 222,0.5)',
      },

    ],
  };

export default class LinePlot extends React.Component{
    constructor(...props){
        super(...props);
    }

    render(){
        let darkMode = this.props.darkMode
        return (
             <Line options={ darkMode ? options: options_light} data={data} />
        )
    }
}