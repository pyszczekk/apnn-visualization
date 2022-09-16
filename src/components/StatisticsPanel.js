import React from "react";
import LinePlot from "./LinePlot";
import styles from '../styles.module.css';
import BarPlot from "./BarPlot";

export default class StatisticsPanel extends React.Component{
    constructor(...props){
        super(...props);
        this.state = {data: 
            [{
                title: "Test",
                plot_type: "linePlot",
                labelX: "epoch no",
                labelY: "accuracy value",
                dataX: ["epoch 1","epoch 10", "epoch 20", "epoch 30", "epoch 40", "epoch 50", "epoch 100"],
                dataY: [16, 45, 67, 58, 75, 82, 94] 
            },
            {
                title: "Test 2",
                plot_type: "linePlot",
                labelX: "epoch no",
                labelY: "accuracy value",
                dataX: ["epoch 1","epoch 10", "epoch 20", "epoch 30", "epoch 40", "epoch 50", "epoch 100"],
                dataY: [5, 20, 33, 48, 42, 68, 72] 
            },
            {
                title: "Test 2",
                plot_type: "boxPlot",
                labelX: "epoch no",
                labelY: "accuracy value",
                dataX: ["epoch 1","epoch 10", "epoch 20", "epoch 30", "epoch 40", "epoch 50", "epoch 100"],
                dataY: [5, 20, 33, 48, 42, 68, 72] 
            
            }]}
        this.generateStatistics = this.generateStatistics.bind(this);
        this.generatePlots = this.generatePlots.bind(this);
        this.getPlots = this.getPlots.bind(this);
    }
    

generatePlots = (darkMode) =>{

    var plots = this.state.data;
    if(plots==[] || plots == null || plots == undefined || plots == "") return <h2>No data or connection issue</h2>
    var linePlots, barPlots;
    linePlots = plots.filter(plot => plot.plot_type=="linePlot").map((plotData, index) => (
        <LinePlot key={index} darkMode={darkMode} data={plotData}/>
    ))
    barPlots = plots.filter(plot => plot.plot_type=="boxPlot").map((plotData, index) => (
        <BarPlot key={index} darkMode={darkMode} data={plotData}/>
    ))


    return <div>{linePlots}{barPlots}</div>
  
    
}    
getPlots = (darkMode) =>{
    const requestOptions = {
        method: 'GET'
    };
   
    fetch("http://"+this.props.connectionAddress+"/statistics", requestOptions)
    .then(response => response.json())
    .then(data => {
        this.setState({
            data: data.plots
        })
    })
    .catch((error) => {
      console.error('Error:', error);
    
    this.setState({
        data: []
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