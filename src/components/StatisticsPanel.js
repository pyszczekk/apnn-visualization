import React from "react";
import styles from '../styles.module.css';

export default class StatisticsPanel extends React.Component{
    constructor(...props){
        super(...props);
    
    
    }
    

getDefaultView=()=>{
       return( 
       <div >
            <h1>Statistics</h1>
            <h2>statistics after clicking button</h2>
        </div>
       )
    }

 generateStatistics=()=>{
        return( 
        <div >
             <h1>generated view </h1>
             <h2>statistics after clicking button</h2>
         </div>
        )
     }
    
    render(){
        let showStatistics = this.props.showStatistics
        return (
            <div className={styles.statisticsContainer}>
            {showStatistics ? this.generateStatistics() : this.getDefaultView() }
        </div>
        )
    }
}