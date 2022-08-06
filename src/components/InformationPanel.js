import React from "react";
import styles from '../styles.module.css';

export default class InformationPanel extends React.Component{
    constructor(){
        super();

    }
    render(){
        return (
        <div className={styles.infoContainer}>
            <h1>Info panel</h1>
        </div>
        )
    }
}