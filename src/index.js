import React, {useEffect} from 'react'
import { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'

import InformationPanel from './components/InformationPanel';
import ControlPanel from './components/ControlPanel';
import NetworkAnimation from './components/NetworkAnimation';
import StatisticsPanel  from './components/StatisticsPanel';
import styles from './styles.module.css';
import { StaticCopyUsage } from 'three';

window.hoveredInformation = "This panel shows informations about hovered neurons";
export const VisualizationApp = ({ connectionAddress, bgColor, neuronColor, synapsisColor, impulseColor, refractionColor, relaxingColor }) => {
 
  const [darkMode, setDarkMode] = React.useState(true);
  const connAddress = connectionAddress==null?"localhost:8080":connectionAddress;
  const [information, setInformation] = React.useState("This panel shows informations about hovered element from visualization")
  const [statistics, setStatistics] = React.useState(false)
  const [training, setTraining] = React.useState(false);

  return (
    <div className={darkMode? styles.dark : styles.light}>
      <ControlPanel 
            toggleDark={() => {
              setDarkMode(!darkMode);
            console.log(darkMode)}
              } 
              showStatistics = {()=>{
                setStatistics(!statistics)
              }} 
              connectionAddress = {connAddress}
              showVisualization = {setTraining}/>
    <NetworkAnimation 
      changeInfo={setInformation} 
      connectionAddress={connAddress} 
      bgColor={bgColor} 
      neuronColor = {neuronColor}
      synapsisColor={synapsisColor} 
      impulseColor ={impulseColor} 
      refractionColor={refractionColor}
      relaxingColor={relaxingColor}
      training={training}
     />
    <InformationPanel informations={information} />

    <StatisticsPanel darkMode={darkMode} showStatistics={statistics} connectionAddress={connAddress}/>
    </div>
  )
}
