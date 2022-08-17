import React, {useEffect} from 'react'
import { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'

import InformationPanel from './components/InformationPanel';
import ControlPanel from './components/ControlPanel';
import NetworkAnimation from './components/NetworkAnimation';
import StatisticsPanel  from './components/StatisticsPanel';
import styles from './styles.module.css';

window.hoveredInformation = "This panel shows informations about hovered neurons";
export const VisualizationApp = ({ connectionAddress, bgColor, neuronColor, synapsisColor, impulseColor, relaxationColor }) => {
 
  const [darkMode, setDarkMode] = React.useState(true);
  const connAddress = connectionAddress==null?"localhost:8080":connectionAddress;
  const [information, setInformation] = React.useState("This panel shows informations about hovered elements")
  const [statistics, setStatistics] = React.useState(false)
  return (
    <div className={darkMode? styles.dark : styles.light}>
      <ControlPanel toggleDark={() => {
              setDarkMode(!darkMode);
            console.log(darkMode)}
              } showStatistics = {setStatistics} />
    <NetworkAnimation changeInfo={setInformation} connectionAddress={connAddress} bgColor={bgColor} 
    neuronColor = {neuronColor}
     synapsisColor={synapsisColor} 
     impulseColor ={impulseColor} 
     relaxationColor={relaxationColor}/>
    <InformationPanel informations={information} />

    <StatisticsPanel showStatistics={statistics} connectionAddress={connAddress}/>
    </div>
  )
}
