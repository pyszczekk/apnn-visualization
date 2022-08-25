import React, { useEffect } from "react";
import LinePlot from "./LinePlot";
import styles from '../styles.module.css';
import BarPlot from "./BarPlot";

export default class StatisticsPanel extends React.Component{
    constructor(...props){
        super(...props);
        this.state = {data: []}
        this.generateStatistics = this.generateStatistics.bind(this);
        this.generatePlots = this.generatePlots.bind(this);
        this.getPlots = this.getPlots.bind(this);
    }
    

generatePlots = (darkMode) =>{
    // if(data == null || data == undefined)
    //     return null;
    console.log("generating plots: "+this.state.data)

    var plots = this.state.data;
    if(plots==[] || plots == null || plots == undefined || plots == "") return <h2>No data or connection issue</h2>
    var linePlots, barPlots;
    linePlots = plots.filter(plot => plot.plot_type=="linePlot").map(plotData => (
        <LinePlot darkMode={darkMode} data={plotData}/>
    ))
    barPlots = plots.filter(plot => plot.plot_type=="boxPlot").map(plotData => (
        <BarPlot darkMode={darkMode} data={plotData}/>
    ))


    return <div>{linePlots}{barPlots}</div>
  
    
}    
getPlots = (darkMode) =>{
    console.log("calling server")
    const requestOptions = {
        method: 'GET'
    };
   
    fetch("https://"+this.props.connectionAddress+"/statistics", requestOptions)
    .then(response => response.json())
    .then(data => {
        this.setState({
            data: data.plots
        })
    })
    .catch((error) => {
      console.error('Error:', error);
      var plots = [{
        plot_type: "linePlot"
    },
    {
        plot_type: "linePlot"
    },
    {
        plot_type: "boxPlot"
    }];
    this.setState({
        data: plots
    })

    });

    return this.generatePlots(darkMode);
}

getDefaultView=()=>{
       return( 
       <div >
            <h1>Statistics</h1>
            <h2>To retrieve some data click 'statistics' button from menu</h2>
        </div>
       )
    }

 generateStatistics=(darkMode)=>{
    //generate statistics -> get statistics from server 
        return( 
        <div >
             <h1>Statistics</h1>
             {this.getPlots(darkMode)}
         </div>
        )
     }
    
    render(){
       
        let showStatistics = this.props.showStatistics;
        let darkMode = this.props.darkMode;
        return (
            <div className={styles.statisticsContainer}>
            {showStatistics ? this.generateStatistics(darkMode) : this.getDefaultView() }
        </div>
        )
    }
}