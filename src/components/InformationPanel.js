import React from "react";
import styles from '../styles.module.css';

export default class InformationPanel extends React.Component{
    constructor(...props){
        super(...props);
    
    }
    
    render(){
        let info = this.props.informations
        return (
        <div className={styles.infoContainer}>
            <h1>Informations</h1>
            <h2>{info}</h2>
        </div>
        )
    }
}