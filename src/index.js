import React, {useEffect} from 'react'

import InformationPanel from './components/InformationPanel';
import ControlPanel from './components/ControlPanel';
import NetworkAnimation from './components/NetworkAnimation';
import StatisticsPanel  from './components/StatisticsPanel';
import styles from './styles.module.css';

export const VisualizationApp = ({ connectionAddress, bgColor, neuronColor, synapsisColor, impulseColor, refractionColor, relaxingColor }) => {
 
  const [darkMode, setDarkMode] = React.useState(true);
  const connAddress = connectionAddress==null?"localhost:8080":connectionAddress;
  const [information, setInformation] = React.useState("This panel shows informations about hovered element from visualization")
  const [statistics, setStatistics] = React.useState(false)
  const [training, setTraining] = React.useState(false);
  const [network, setNetwork] = React.useState(null);

 
  const getModelSchema = async()=>{
    const requestOptions = {
        method: 'GET'
    };
    await fetch("http://"+connAddress+"/model", requestOptions)
    .then(response => response.json())
    .then(data => {
      setNetwork(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    
   }

   useEffect(
    () => {
      let timer = null;
      if(training){
      timer = setTimeout(()=>{
        getModelSchema();
      },300);
      }
      return () => clearTimeout(timer);
    },
    [training, network]
  );
  return (
    <div className={darkMode? styles.dark : styles.light}>
      <ControlPanel 
            toggleDark={() => {
              setDarkMode(!darkMode);
              }
              } 
            showStatistics = {()=>{
                setStatistics(!statistics)
              }} 
            connectionAddress = {connAddress}
            showVisualization = {setTraining}/>
    <NetworkAnimation 
      changeInfo={setInformation} 
      bgColor={bgColor} 
      neuronColor = {neuronColor}
      synapsisColor={synapsisColor} 
      impulseColor ={impulseColor} 
      refractionColor={refractionColor}
      relaxingColor={relaxingColor}
      training={training}
      network={network}
     />
    <InformationPanel informations={information} />

    <StatisticsPanel  darkMode={darkMode} 
                      showStatistics={statistics} 
                      connectionAddress={connAddress} />
    </div>
  )
}
