import React from "react";
import styles from '../styles.module.css';
import { ToggleSlider }  from "react-toggle-slider";
import { FaMoon, FaSun } from "react-icons/fa";


class ControlPanel extends React.Component{
    constructor(...props){
        super(...props);
        this.loadData = this.loadData.bind(this);
        this.startTraining = this.startTraining.bind(this);
        this.stopTraining = this.stopTraining.bind(this);
        this.state = {title: ""}

    }
    startTraining = () =>{
        this.props.showVisualization(true);
        const requestOptions = {
            method: 'POST'
        };
       
         fetch("https://"+this.props.connectionAddress+"/neural-network", requestOptions)
        .then(response => {
            if(response.status === 200){
                console.log("Started training")   
                this.setState({
                    title: response.json().title
                }) 
                this.props.showVisualization(true);           
            }else {
                console.log("SOMETHING WENT WRONG")
            }
        }).catch((error) => {
            console.error('Error:', error);
      
          });

    }

    stopTraining = () => {
        this.props.showVisualization(false);
        const requestOptions = {
            method: 'PUT'
        };
       
         fetch("https://"+this.props.connectionAddress+"/neural-network", requestOptions)
        .then(response => {
            if(response.status === 200){
                console.log("Stopped training") 
                this.props.showVisualization(false);              
            }else {
                console.log("SOMETHING WENT WRONG")
            }
        }).catch((error) => {
            console.error('Error:', error);
      
          });
    }
    
    loadData = (e)=>{
        console.log(e);
        var files = e.target.files;
        console.log(files);
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        const requestOptions = {
                method: 'POST',
                body: formData
            };
           
             fetch("https://"+this.props.connectionAddress+"/dataset", requestOptions)
            .then(response => {
                if(response.status === 200){
                    console.log("Data loaded")    
                }else {
                    console.log("SOMETHING WENT WRONG")
                }
            }).catch((error) => {
                console.error('Error:', error);
            });
    }
    
    render(){
        return (
        <nav className={styles.controlPanel}>
            <div>
                <FaMoon style={{margin:"10px", transform:"scale(1.3)"}} />
                    <ToggleSlider onToggle={() => {
                    this.props.toggleDark();}}
                    barBackgroundColor={"#1798DE"}
                    barBackgroundColorActive={"#2E3440"}
                    />
                <FaSun style={{margin:"10px", transform:"scale(1.3)"}}/>
            </div>
            
            <label className={styles.navButton}>
                <input type="file" onChange={this.loadData} />
               Load Data
            </label>
          
            <button 
                className={styles.navButton} onClick={this.startTraining}>
                    Start training
            </button>
            <button 
                className={styles.navButton} onClick={this.stopTraining}>
                    Stop training
            </button>
            <button 
                className={styles.navButton} 
                onClick={()=>{this.props.showStatistics()}}>
                    Statistics
            </button>
            <div className="navInfo">{this.state.title}</div>
        </nav>
        )
    }
}
export default React.memo(ControlPanel);