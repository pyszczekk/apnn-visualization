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
            <div>{info.split('\n').map((line, idx) => <p key={idx}>{line}</p>)}</div>
        </div>
        )
    }
}