import React from 'react'

import { VisualizationApp } from 'apnn-visualization'
import 'apnn-visualization/dist/index.css'

const App = () => {
  return <VisualizationApp 
  connectionAddress = {"192.168.15.15:13001"} 
  bgColor = {"#E9DEE9"} 
  neuronColor = {"#F4D35E"}
  synapsisColor = {"#0D3B66"}
  impulseColor = {"#F95738"}
  relaxationColor ={"#B7D7F6"}
  />
}

export default App
