import React from "react";
import styles from '../styles.module.css';
import { ToggleSlider }  from "react-toggle-slider";
import { FaMoon, FaSun } from "react-icons/fa";
class ControlPanel extends React.Component{
    constructor(...props){
        super(...props);
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
            <button className={styles.navButton}>Load data</button>
            <button className={styles.navButton}>Start training</button>
            <button className={styles.navButton}>Stop training</button>
            <button className={styles.navButton}>Statistics</button>
            <div className="navInfo"> some informations</div>
        </nav>
        )
    }
}
export default React.memo(ControlPanel);